import express from "express";
import feedingController from "../controller/feedingController.js";

const feedingRoutes = express.Router();

//Endpoint: Listar todos os Propriedades
feedingRoutes.get("/feedings", feedingController.getAllFeeding);

//Endpoint: Cadastrar novo Propriedade
feedingRoutes.post("/feeding", feedingController.createFeeding);

//Endpoint: Deletar um Propriedade
feedingRoutes.delete("/feeding/:id", feedingController.deleteFeeding);

//Endpoint: Atualizar um Propriedade
feedingRoutes.put("/feeding/:id", feedingController.updateFeeding);

//Endpoint: Listar um Propriedade especifico
feedingRoutes.get("/feeding/:id", feedingController.getOneFeeding);

export default feedingRoutes