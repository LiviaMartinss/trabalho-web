const express = require('express');
const app = express();
const usersRouter = require('./api/users');


app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à API');
});


app.use('/api', usersRouter);

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
