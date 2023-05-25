const DataBaseService = require('@helpersBackend/dataBase');
const dataBaseService = new DataBaseService();
const AuthBaseService = require('@helpersBackend/auth');
const authBaseService = new AuthBaseService();

class LoginService {
  async validateLogin(reqData, res) {
    // separando dados da requisicao
    //const reqData = reqBody['data'];
    const login = await authBaseService.sanitaze(reqData['email']);
    const password = await authBaseService.sanitaze(reqData['password']);
    // gerando hash criptografada da senha
    //const hashPassword = await authBaseService.generateHashPassword(password);
    if (password === '') return { error: 3 };
    // verificando se o usuario passado existe no banco
    const hasUser = await dataBaseService.getData('users', ['id', 'password'], [" email='"+ login + "'"])
    if (Object.keys(hasUser).length === 0) return { error: 2 };
    // verificando se o usuario e senha estao corretos
    const passwordInDb = hasUser[0]['password'];
    const validUserAndPassword = await authBaseService.verifyPassword(password, passwordInDb);
    if (!validUserAndPassword) return { error : 1};
    // caso tudo esta ok, gera e seta o token no cookie da requisicao
    let token = await authBaseService.setToken(res, login);
    // auditoria
    await dataBaseService.insertData(
      'audit_log', ['user_id', 'event_type', 'token'], 
      [ hasUser[0]['id'], '"login"' , '"' + token + '"']
    )    
    // retorna sucesso
    return { success: token };
  }
}

module.exports = LoginService;
