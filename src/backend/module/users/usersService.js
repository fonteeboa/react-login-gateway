const DataBaseService = require('@helpersBackend/dataBase');
const dataBaseService = new DataBaseService();
const AuthBaseService = require('@helpersBackend/auth');
const authBaseService = new AuthBaseService();

class UsersService {
  async getUsers() {
    // busca todos os usuários
    return await dataBaseService.getData('Users', ['id, name, email'])
  }

  async deleteUsers(reqData, res) {
    const id = reqData['userId'] ? reqData['userId'] : '';
    const adminId = reqData['adminId'] ? reqData['adminId'] : '';
    //verifica se id foi passado corretamente
    if (id === '') return { error: 2 };
    // remove usuário do banco
    const resp = await dataBaseService.deleteData('Users',  [ 'id = "' + id + '"']);
    // auditoria
    await dataBaseService.insertData(
      'audit_log', ['user_id', 'event_type', 'token', 'error_log'], 
      [ adminId, '"delete.user"', id, resp === 1 ? '"common.no.error"' : resp ]
    )
    // retorna sucesso ou erro
    return resp === 1 ? { success: 1 } : { error: resp }
  }

  async addEditUsers(reqData, res) {
      // separando dados da requisicao
      let resp = '';
      let audit_log_action = '';
      let id = reqData['userId'] ? reqData['userId'] : '';
      const adminId = reqData['adminId'] ? reqData['adminId'] : '';
      const name = reqData['userName'];
      const modalEdit = reqData['modalEdit'];
      const email = await authBaseService.sanitaze(reqData['userEmail']);
      let password = modalEdit ? '' :  await authBaseService.sanitaze(reqData['userPassword']);
      // verificando se o usuario passado existe no banco
      let hasUser = await dataBaseService.getData('Users', ['id'], [" email='"+ email + "'"])
      if (Object.keys(hasUser).length !== 0 && id == '') return { error: 2 };
      // gerando hash criptografada da senha
      if (password !== '') {
        password = await authBaseService.generateHashPassword(password);
      }
      // verificando se possui id para optar entre insert ou update.
      if (id) {
        let updateArray = ['name = "' + name + '"', 'email = "' + email + '"']
        // verifica se a senha foi alterada
        if (password !== '') {
          updateArray.push('password = "' + password + '"')
        }
        //realiza update
        resp = await dataBaseService.updateData('Users' , updateArray , [ 'id = "' + id + '"']);
        audit_log_action = 'edit';
      } else {
        //realiza insert
        resp = await dataBaseService.insertData('Users' , ['name, email, password'], [ '"' + name + '"', '"' + email + '"', '"' + password + '"' ]);
        audit_log_action = 'add';
      }
      // busca novo id do usuario
      if (resp === 1 && id === '') {
        let hasUser = await dataBaseService.getData('Users', ['id'], [" email='"+ email + "'"])
        console.log(hasUser);
        id = hasUser[0]['id'];
      }
      // auditoria
      await dataBaseService.insertData(
        'audit_log', ['user_id', 'event_type', 'error_log'], 
        [ adminId, '"' + audit_log_action + '.user"', resp === 1 ? '"common.no.error"' : resp ]
      )
      // retorna sucesso ou erro
      return resp === 1 ? { success: id } : { error: resp };
  }
}

module.exports = UsersService;
