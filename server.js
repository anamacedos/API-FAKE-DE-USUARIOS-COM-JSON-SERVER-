
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser); 

// endpoint de login
server.post('/login', (req, res) => {
  const { cpf, senha } = req.body;


<<<<<<< HEAD
  console.log(req.body);
=======
>>>>>>> b4d5ac698a921c1fc26c7917bf7b92d50b50dc24
  if (!cpf || !senha) {
    return res.status(400).json({ error: 'CPF e senha são obrigatórios' });

  }


  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(cpf)) {
    return res.status(400).json({ error: 'CPF deve conter exatamente 11 dígitos' });
  }

  const db = router.db; 
  const usuario = db.get('usuarios').find({ cpf, senha }).value();

  if (usuario) {
    return res.json(usuario); 
  } else {
    return res.status(401).json({ error: 'Usuário ou senha incorretos' });
  }
});


server.use(router);

// mudabdo a porta
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`JSON Server rodando na porta ${PORT}`);
});
