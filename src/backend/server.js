const express = require('express');
const cors = require('cors');
const app = express();

// Habilita o CORS para todas as rotas
app.use(cors());

// login service file
const LoginService = require('./module/login/loginService');
const loginService = new LoginService();

// rota de login para retornar 4 tipos de valores randomicos que simulariam erros
app.post('/login', cors(), (req, res) => {
  const loginResult = loginService.validateLogin();
  res.json(loginResult);
});

// porta do backend
const port = process.env.PORT || 3001;

// retorno ao subir o mini server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// middleware para tratar rotas não mapeadas
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});