require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
const argon2 = require('argon2');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');

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

  verifyAuthToken(req) {    
    const authHeader = req.headers.authorization;
    if (!authHeader) return false;
    // Faz a validação do token de autenticação
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

}

module.exports = AuthBaseService;