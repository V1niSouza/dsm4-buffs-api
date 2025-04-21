import express from "express";
import mongoose from "./config/database.js"; 
import userRoutes from "./routes/UserRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import lotRoutes from "./routes/lotRoutes.js";
import buffaloRoutes from "./routes/buffaloRoutes.js";
import feedingRoutes from "./routes/feedingRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

//Configuração da Framework(express)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rotas
app.use("/", userRoutes);    // Rota Usuário
app.use("/", propertyRoutes);// Rota Propriedade
app.use("/", lotRoutes);     // Rota Lote
app.use("/", buffaloRoutes); // Rota Bufalo
app.use("/", feedingRoutes); // Rota Alimentação

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
