require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB Atlas'))
  .catch((error) => console.error('Erro ao conectar ao MongoDB Atlas:', error));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);


const app = express();
app.use(express.json());


app.post('/api/auth', (req, res) => {
  const { email, password } = req.body;


  if (email === 'example@example.com' && password === 'password') {
    res.status(200).json({ message: 'Autenticação bem-sucedida' });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});


app.post('/api/users', (req, res) => {
  const { name, email, password } = req.body;

  const user = new User({ name, email, password });
  user.save()
    .then(() => res.status(201).json({ message: 'Usuário criado com sucesso' }))
    .catch((error) => res.status(500).json({ error: error.message }));
});


app.get('/api/admin/users', (req, res) => {

  User.find()
    .then((users) => res.json(users))
    .catch((error) => res.status(500).json({ error: error.message }));
});


app.put('/api/admin/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  User.findByIdAndUpdate(id, { name, email, password })
    .then(() => res.json({ message: 'Usuário atualizado com sucesso' }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.delete('/api/admin/users/:id', (req, res) => {
  const { id } = req.params;

  User.findByIdAndRemove(id)
    .then(() => res.json({ message: 'Usuário removido com sucesso' }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
