const sqlite3 = require('sqlite3').verbose();

// Abre uma conexão com o banco de dados SQLite
const db = new sqlite3.Database('../DB/dataBase.sqlite');

// Exporta um objeto que contém os métodos para manipulação do banco de dados
module.exports = {
  // Retorna todos os usuários cadastrados no banco de dados
  getData: function(fields = ['*'], filter = [''], table = '', callback) {
    const sql = `SELECT ${fields.join()} FROM ${table} WHERE ${filter}`;
    db.all(sql, (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },

  // Insere um novo usuário no banco de dados
  insertData: function(fields = [''], values = [''], table = '', callback) {
    const sql = `INSERT INTO ${table} (${fields.join()}) VALUES (${values.join()})`;
    db.all(sql, (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },

  // Atualiza os dados de um usuário no banco de dados
  updateData: function(fieldsWithvalues = [''], table = '', callback) {
    const sql = `UPDATE ${table} SET ${fieldsWithvalues.join()} WHERE id = ${id}`;
    db.run(sql, [usuario.nome, usuario.email, usuario.senha, usuario.id], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this.changes);
      }
    });
  },

  // Exclui um usuário do banco de dados
  deleteData: function(id, callback) {
    db.run(`DELETE FROM ${table} WHERE id = ${id}`, function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, this.changes);
      }
    });
  }
  
};
