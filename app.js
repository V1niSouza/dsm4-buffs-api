const express = require('express');
const connectDatabase = require('./Config/database');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Conexão com banco
connectDatabase();

// Rotas (exemplo futuro)
// const userRoutes = require('./routes/user.routes');
// app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API Buffs rodando 🎯');
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
