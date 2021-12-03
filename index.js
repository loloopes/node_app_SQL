require('dotenv').config();
const express = require('express');
const error = require('./middleware/error');
const Cep = require('./controller/Cep')

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  res.status(200).json({message: 'pong!'})
});
app.get('/cep/:cep', Cep.findAddressByCep);
app.post('/cep', Cep.create);

app.use(error);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Running on ${PORT}!!!`)});