const sqlite3 = require('sqlite3').verbose();

class dataBaseService {
  constructor() {
    this.db = new sqlite3.Database('../DB/dataBase.sqlite');
  }

  // Retorna todos os usuários cadastrados no banco de dados
  getData(fields = ['*'], filter = [''], table = '', callback) {
    const sql = `SELECT ${fields.join()} FROM ${table} WHERE ${filter}`;
    this.db.all(sql, (err, rows) => {
      if (err) {
      callback(err, null);
      } else {
      callback(null, rows);
      }
    });
  }

  // Insere um novo usuário no banco de dados
  insertData(fields = [''], values = [''], table = '', callback) {
    const sql = `INSERT INTO ${table} (${fields.join()}) VALUES (${values.join()})`;
    this.db.all(sql, (err, rows) => {
      if (err) {
      callback(err, null);
      } else {
      callback(null, rows);
      }
    });
  }

  // Atualiza os dados de um usuário no banco de dados
  updateData(fieldsWithvalues = [''], table = '', id, callback) {
  const sql = `UPDATE ${table} SET ${fieldsWithvalues.join()} WHERE id = ${id}`;
  this.db.run(sql, function(err) {
    if (err) {
    callback(err, null);
    } else {
    callback(null, this.changes);
    }
  });
  }

  // Exclui um usuário do banco de dados
  deleteData(id, table = '', callback) {
    this.db.run(`DELETE FROM ${table} WHERE id = ${id}`, function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this.changes);
      }
    });
  }
}
// Exporta um objeto que contém os métodos para manipulação do banco de dados
module.exports = dataBaseService;