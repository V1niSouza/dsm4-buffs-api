import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerOptions from "./Config/swagger.js";
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

const swaggerDocs = swaggerJsDoc(swaggerOptions);

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Rota documentação

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
