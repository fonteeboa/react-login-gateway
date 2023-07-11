require('dotenv').config();
const dbPath = process.env.DB_PATH;
const sqlite3 = require('sqlite3').verbose();
const successAction = 1;

class dataBaseService {

  /**
   * Opens a connection to the database.
   *
   * @return {object} The database connection object.
   */
  async OpenDBConnect() {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
    return db;
  }

  /**
   * Retrieves data from the specified table based on the given filter and fields.
   *
   * @param {string} table - The name of the table to retrieve data from.
   * @param {Array} fields - An array of fields to select from the table. Defaults to all fields.
   * @param {Array} filter - An array of filter conditions to apply to the query. Defaults to an empty array.
   * @return {Promise<Array>} A promise that resolves to an array of rows from the table.
   */
  async getData(table = '', fields = ['*'], filter = ['']) {
    const dbConnection = await this.OpenDBConnect();
    const sql = `SELECT ${fields.join(',')} FROM ${table} ${ filter.length > 0 && filter[0] != '' ? `WHERE ${filter.join(' AND ')} ` : ''}`;
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

  /**
   * Inserts data into a specified table by executing an SQL INSERT statement.
   *
   * @param {string} table - The name of the table to insert data into.
   * @param {Array} fields - An array of strings representing the fields to insert into.
   * @param {Array} values - An array of values to insert into the specified fields.
   * @return {Promise} A promise that resolves to an error message, if any, or a success action.
   */
  async insertData(table = '', fields = [''], values = ['']) {
    const dbConnection = await this.OpenDBConnect();
    const sql = `INSERT INTO ${table} (${fields.join()}) VALUES (${values.join()})`;
    return new Promise((resolve, reject) => {
      dbConnection.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(successAction);
        }
      });
    });
  }
  /**
   * Updates data in the specified table based on the given fields and filter.
   *
   * @param {string} table - The name of the table to update.
   * @param {Array<string>} fieldsWithvalues - An array of field-value pairs to update.
   * @param {Array<string>} filter - An array of filter conditions to determine which records to update.
   * @return {Promise<any>} A promise that resolves to an error message or a success action.
   */
  async updateData(table = '', fieldsWithvalues = [''], filter = ['']) {
    const dbConnection = await this.OpenDBConnect();
    const sql = `UPDATE ${table} SET ${fieldsWithvalues.join()} WHERE ${filter.join(' AND ')}`;    
    return new Promise((resolve, reject) => {
      dbConnection.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(successAction);
        }
      });
    });
  }
  /**
   * Delete data from a table based on a filter.
   *
   * @param {string} table - The name of the table to delete from.
   * @param {Array<string>} filter - An array of filter conditions.
   * @return {Promise<string|successAction>} A promise that resolves to an error string or the success action.
   */
  async deleteData(table = '', filter = ['']) {
    const dbConnection = await this.OpenDBConnect();
    const sql = `DELETE FROM ${table} WHERE ${filter.join(' AND ')}`;
    return new Promise((resolve, reject) => {
      dbConnection.all(sql, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(successAction);
        }
      });
    });
  }

  /**
   * Retrieves data from a database using the provided SQL query.
   *
   * @param {string} sql - The SQL query to execute.
   * @return {Promise} A promise that resolves with the retrieved data.
   */
  async getDataWithCustomQuery(sql) {
    const dbConnection = await this.OpenDBConnect();
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
}

module.exports = dataBaseService;