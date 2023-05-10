const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, '..', 'DB', 'dataBase.sqlite');

// Verifica se o arquivo do banco de dados existe
if (!fs.existsSync(dbPath)) {
  // Se o arquivo não existir, cria o arquivo
  fs.writeFileSync(dbPath, '');
  console.log('Arquivo de banco criado.');
}

// Cria uma conexão com o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Conexão com o banco de dados estabelecida.');
    }
  });

// Cria a tabela "usuarios" no banco de dados, se ela não existir
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

// Verifica se a tabela "users" está vazia
db.get("SELECT COUNT(*) as count FROM users", [], (err, row) => {
  if (err) {
    console.error(err.message);
  } else if (row.count === 0) {
    // Se a tabela está vazia, adiciona um usuário de exemplo
    db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ["System Admin", "system@admin", "eae889ceda1452b34555b2b52b9f05d28a1e8ed8d5dc8c62362b90ee49746af1b99bf53cb3e58323d29c1dcc5b1203e45f824d10d87b1a63b9d6eec59a2f6740"], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Usuário adicionado com sucesso!");
      }
    });
  }
});

// Fecha a conexão com o banco de dados
db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Conexão com o banco de dados fechada.');
    }
});