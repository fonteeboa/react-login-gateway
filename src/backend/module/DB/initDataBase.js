require('dotenv').config();
const dbPath = process.env.DB_PATH;
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

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

// Cria a tabela "users" no banco de dados, se ela não existir
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );`, function(err) {
  if (err) {
    console.error(err.message);
  } else {
    // Verifica se a tabela "users" está vazia
    db.get("SELECT COUNT(*) as count FROM users", [], (err, row) => {
      if (err) {
        console.error(err.message);
      } else if (row.count === 0) {
        // Se a tabela está vazia, adiciona um usuário de exemplo
        const password = "$argon2d$v=19$m=65536,t=3,p=4$uy3vyqCqxe6ilKFPRFGumQ$1dRGizsFfNe5cPV4sqS4WHCDiBJOb+HpWQaNMbrVqnmL/l9fhXyuf138JINxwT6nZIO57ToOnOayZQTGPpduDQ";
        db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", ["System Admin", "system@admin.com", password], (err) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log('Usuário adicionado com sucesso!');
          }
        });
      }
    });
  }
});

// Cria a tabela "audit_log" no banco de dados, se ela não existir
db.run(`
  CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INT,
    event_type VARCHAR(50),
    event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    token VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`, function(err) {
  if (err) {
    console.error(err.message);
  }
});

// Cria a tabela "audit_log" no banco de dados, se ela não existir
db.run(`
  CREATE TABLE IF NOT EXISTS auth_users (
    user_id INT,
    token VARCHAR(255)
  );
`, function(err) {
  if (err) {
    console.error(err.message);
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