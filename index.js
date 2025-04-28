import express from "express";
import cors from "cors";
import dotenv from 'dotenv';

import mongoose from "./Config/database.js"; 
import userRoutes from "./routes/UserRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import lotRoutes from "./routes/lotRoutes.js";
import buffaloRoutes from "./routes/buffaloRoutes.js";
import feedingRoutes from "./routes/feedingRoutes.js";
import reproductionRoutes from "./routes/reproductionRoutes.js";
import lactationRoutes from "./routes/lactationRoutes.js";
import productionRoutes from "./routes/productionRoutes.js";

const app = express();
dotenv.config();

// Configurações do Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Rotas
app.use("/", userRoutes);    // Rota Usuário
app.use("/", propertyRoutes);// Rota Propriedade
app.use("/", lotRoutes);     // Rota Lote
app.use("/", buffaloRoutes); // Rota Bufalo
app.use("/", feedingRoutes); // Rota Alimentação
app.use("/", reproductionRoutes); // Rota Reprodução
app.use("/", lactationRoutes); // Rota Lactação
app.use("/", productionRoutes); // Rota Produção

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
