import express from "express";
import mongoose from "./config/database.js"; //importação Mongoose
import userRoutes from "./routes/UserRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

//Configuração da Framework(express)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
