const express = require('express');
const router = express.Router();


router.get('/users', (req, res) => {

  res.send('Listagem de usuários');
});


router.post('/users', (req, res) => {

  res.send('Novo usuário criado');
});


router.put('/users/:id', (req, res) => {

  res.send(`Usuário ${req.params.id} atualizado`);
});


router.delete('/users/:id', (req, res) => {

  res.send(`Usuário ${req.params.id} excluído`);
});

module.exports = router;
