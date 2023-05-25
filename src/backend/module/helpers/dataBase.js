require('dotenv').config();
const dbPath = process.env.DB_PATH;
const sqlite3 = require('sqlite3').verbose();
const successAction = 1;

class dataBaseService {
  // Abre conexao com o banco
  async OpenDBConnect() {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
    return db;
  }

  // Retorna todos os usuários cadastrados no banco de dados
  async getData(table = '', fields = ['*'], filter = ['']) {
    const dbConnection = await this.OpenDBConnect();
    const sql = `SELECT ${fields.join(',')} FROM ${table} WHERE ${filter.join(' AND ')}`;
    return new Promise((resolve, reject) => {
      dbConnection.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });    
  }

  // Insere um novo usuário no banco de dados
  async insertData(table = '', fields = [''], values = ['']) {
    const dbConnection = await this.OpenDBConnect();
    const sql = `INSERT INTO ${table} (${fields.join()}) VALUES (${values.join()})`;
    const err = await dbConnection.run(sql);
    dbConnection.close();
    return err ? err : successAction;
  }

  // Atualiza os dados de um usuário no banco de dados
  async updateData(table = '', fieldsWithvalues = [''], filter = ['']) {
    const dbConnection = this.OpenDBConnect();
    const sql = `UPDATE ${table} SET ${fieldsWithvalues.join()} WHERE ${filter.join(' AND ')}`;
    const err = await dbConnection.run(sql);
    dbConnection.close();
    return err ? err : successAction;
  }

  // Exclui um usuário do banco de dados
  async deleteData(table = '', filter = ['']) {
    const dbConnection = await this.OpenDBConnect();
    const sql = `DELETE FROM ${table} WHERE ${filter.join(' AND ')}`;
    const err = await dbConnection.run(sql);
    dbConnection.close();
    return err ? err : successAction;
  }
}

module.exports = dataBaseService;