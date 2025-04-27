import express from "express";
import productionController from "../controller/productionController.js";

const productionRoutes = express.Router();

//Endpoint: Listar todas as Produções
productionRoutes.get("/productions", productionController.getAllProductions);

//Endpoint: Cadastrar uma nova Produção
productionRoutes.post("/production", productionController.createProduction);

//Endpoint: Deletar uma Produção
productionRoutes.delete("/production/:id", productionController.deleteProduction);

//Endpoint: Atualizar uma Produção
productionRoutes.put("/production/:id", productionController.updateProduction);

//Endpoint: Listar uma Produção especifica
productionRoutes.get("/production/:id", productionController.getOneProduction);

export default productionRoutes