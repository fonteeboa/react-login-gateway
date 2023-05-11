require('./alias');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware para validar o cookie de autenticação
const validateAuth = (req, res, next) => {
  // Verifica se a rota atual é diferente da rota de autenticação
  if (req.path !== '/login') {
    // Verifica se o cookie de autenticação existe
    const authToken = req.cookies.authToken;
    if (!authToken) {
      return res.status(401).json({ error: '4' });
    }
    
    /*
    if (req.cookies.token) {
      // faça algo com o valor do cookie, por exemplo, decodifique o token e armazene-o na requisição:
      //const token = req.cookies.token;
      const decoded = jwt.verify(authToken, 'seu_secret_key');
      req.user = decoded;
    }
    */
    // Faz a validação do token de autenticação
    const decoded = jwt.verify(authToken, 'seu_secret_key');
    req.user = decoded;
  }
  next();
};

// Limite de tentativas de login por IP em um determinado período de tempo
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutos
  max: 5, // Limite de tentativas
  message: { error: '5' },
});

// Habilita o CORS para todas as rotas
app.use(cors());

// Adiciona o middleware de validação de autenticação em todas as rotas
app.use(validateAuth);

// Configura o body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// login service file
const LoginService = require('@loginBackend/loginService.js');
const loginService = new LoginService();

// rota de login para retornar 4 tipos de valores randomicos que simulariam erros
app.post('/login', limiter, cors(), async (req, res) => {
  const loginResult = await loginService.validateLogin(req.body, res);
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
