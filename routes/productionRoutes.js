import express from "express";
import productionController from "../controller/productionController.js";
import Auth from "../middleware/Auth.js";

const productionRoutes = express.Router();

//Endpoint: Listar todas as Produções
productionRoutes.get("/productions", Auth.Authorization, productionController.getAllProductions);

//Endpoint: Cadastrar uma nova Produção
productionRoutes.post("/production", Auth.Authorization, productionController.createProduction);

//Endpoint: Deletar uma Produção
productionRoutes.delete("/production/:id", Auth.Authorization, productionController.deleteProduction);

//Endpoint: Atualizar uma Produção
productionRoutes.put("/production/:id", Auth.Authorization, productionController.updateProduction);

//Endpoint: Listar uma Produção especifica
productionRoutes.get("/production/:id", Auth.Authorization, productionController.getOneProduction);

export default productionRoutes