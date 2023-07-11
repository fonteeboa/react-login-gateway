require('./alias');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

// Auth service file
const AuthBaseService = require('@helpersBackend/auth');
const authBaseService = new AuthBaseService();

// login service file
const LoginService = require('@loginBackend/loginService.js');
const loginService = new LoginService();

// users service file
const UsersService = require('@usersBackend/usersService.js');
const usersService = new UsersService();

// users service file
const AuditService = require('@auditBackend/auditService.js');
const auditService = new AuditService();

// Middleware para validar o token JWT no header Authorization Bearer
const validateAuthToken = async (req, res, next) => {
  switch (req.path) {
    case '/login': 
      return next();
    case '/logout':
      let respLogout = await authBaseService.logoutAuthToken(req);
      return respLogout ? next() : res.status(401).json({ error: '4' });
    default:
      let respAuth = await authBaseService.verifyAuthToken(req);
      respAuth ? next() : res.status(401).json({ error: '4' });
  }
};

// Configura o header
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  } else {
    return next();
  }
});

// Limite de tentativas de login por IP em um determinado período de tempo
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutos
  max: 5, // Limite de tentativas
  message: { error: '5' },
});

// Habilita o CORS para todas as rotas
app.use(cors());

// Configura o body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Adiciona o middleware de validação de autenticação em todas as rotas
app.use(validateAuthToken);

// rota de login
app.post('/login', limiter, cors(), async (req, res) => {
  const loginResult = await loginService.validateLogin(req.body, res);
  res.json(loginResult);
});

// rota de initAuth
app.post('/initAuth', cors(), async (req, res) => {
  res.json({ok : 1});
});

// rota de logout
app.post('/logout', cors(), async (req, res) => {
  res.json({success : 1});
});

// rota de users
app.get('/users', cors(), async (req, res) => {
  const usersData = await usersService.getUsers(req.body, res);
  res.json(usersData);
});

// rota de addUser
app.post('/addUser', cors(), async (req, res) => {
  const usersData = await usersService.addEditUsers(req.body, res);
  res.json(usersData);
});

// rota de deleteUser
app.post('/deleteUser', cors(), async (req, res) => {
  const usersData = await usersService.deleteUsers(req.body, res);
  res.json(usersData);
});

// rota de audit
app.get('/audit', cors(), async (req, res) => {
  const auditData = await auditService.getAudit(req.body, res);
  res.json(auditData);
});

// porta do backend
const port = process.env.PORT_BACKEND || 3001;

// retorno ao subir o mini server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// middleware para tratar rotas não mapeadas
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});
