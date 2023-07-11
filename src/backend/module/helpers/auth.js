require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const argon2 = require('argon2');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const DataBaseService = require('@helpersBackend/dataBase');
const dataBaseService = new DataBaseService();

const hashOptions = {
  type: argon2.argon2d,
  hashLength: 64,
  secret: Buffer.from(secretKey)
};

class AuthBaseService {
  async sanitaze(stringData) {
    return await stringData.replace(/[^a-zA-Z0-9@.]/g, '');
  }

  // Use o argon2 para criar o hash da senha
  async generateHashPassword(password) {
    return await argon2.hash(password, hashOptions);
  }

  // Verifique se a senha fornecida corresponde ao hash armazenado
  async verifyPassword(password, hash) {
    return await argon2.verify(hash, password, hashOptions);
  }

  async generateAuthToken (login) {
    //const payload = { id: 123, email: 'usuario@email.com' };
    const payload = { email: login };
    const options = { };
    return await jwt.sign(payload, secretKey, options);
  }

  //setar authtoken em cookie
  async setToken(res, login) {
    // Define o cookie com a flag httponly
    const options = { 
      httpOnly: true 
    };
    const token = await this.generateAuthToken(login);
    const cookieStr = cookie.serialize('token', token, options);
    // Define o cookie na resposta HTTP
    res.setHeader('Set-Cookie', cookieStr);
    return token;
  }

  async verifyAuthToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;
    // Faz a validação do token de autenticação
    const token = authHeader.split(' ')[1];
    try {
      const decoded = await jwt.verify(token, secretKey);
      req.user = decoded;
      // Verifica se o usuário já fez logout na tabela auth_users
      return await this.checkUserLogout(decoded.email, token, req);
    } catch (err) {
      return false;
    }
  }
  
  async checkUserLogout(userEmail,authHeader, req) {
    // busca id do usuario
    const userData = await dataBaseService.getData(
      'users', 
      ['id'], 
      ['email = "' + userEmail + '"']
    );
    req.body.adminId = userData[0]['id'];
    //verifica se possui logo de saida deste token
    const hasUser = await dataBaseService.getData(
      'auth_users', 
      ['user_id'], 
      ['user_id = ' + userData[0]['id'], "token = '" + authHeader + "'"]
    );
    return (Object.keys(hasUser).length === 0) ? true : false;
  }

  async logoutAuthToken (req) {
    try {
      const userToken = req.headers.authorization;
      // Faz a validação do token de autenticação
      const token = userToken.split(' ')[1];
      const decoded = await jwt.verify(token, secretKey);
      // Busca id do usuario
      const hasUser = await dataBaseService.getData('users', ['id'], [" email='"+  decoded.email + "'"])
      await dataBaseService.deleteData(
        'auth_users', 
        ['user_id = ' + hasUser[0]['id'], "token = '" + token + "'"]
      )
      // insere evento de saida
      await dataBaseService.insertData(
        'audit_log', ['user_id', 'event_type', 'token'], 
        [ hasUser[0]['id'], '"logout"' , '"' + token + '"' , "error_log = " + '"common.no.error"']
      )
      return true;
    } catch (err) {
      return false;
    }
  };
}

module.exports = AuthBaseService;