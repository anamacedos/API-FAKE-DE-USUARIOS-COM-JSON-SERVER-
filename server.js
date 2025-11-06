// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser); // Para ler req.body

// Endpoint de login
server.post('/login', (req, res) => {
  const { cpf, senha } = req.body;


  console.log(req.body);
  if (!cpf || !senha) {
    return res.status(400).json({ error: 'CPF e senha são obrigatórios' });

  }

  const db = router.db; // Acessa o banco
  const usuario = db.get('usuarios').find({ cpf, senha }).value();

  if (usuario) {
    return res.json(usuario); // Retorna usuário
  } else {
    return res.status(401).json({ error: 'Usuário ou senha incorretos' });
  }
});

// Usa o router padrão para o resto da API
server.use(router);

// Escolha a porta que quiser
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`JSON Server rodando na porta ${PORT}`);
});
``