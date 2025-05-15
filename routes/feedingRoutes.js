import express from "express";
import feedingController from "../controller/feedingController.js";
import Auth from "../middleware/Auth.js";

const feedingRoutes = express.Router();

//Endpoint: Listar todos os Propriedades
feedingRoutes.get("/feedings", Auth.Authorization, feedingController.getAllFeeding);

//Endpoint: Cadastrar novo Propriedade
feedingRoutes.post("/feeding", Auth.Authorization, feedingController.createFeeding);

//Endpoint: Deletar um Propriedade
feedingRoutes.delete("/feeding/:id", Auth.Authorization, feedingController.deleteFeeding);

//Endpoint: Atualizar um Propriedade
feedingRoutes.put("/feeding/:id", Auth.Authorization, feedingController.updateFeeding);

//Endpoint: Listar um Propriedade especifico
feedingRoutes.get("/feeding/:id", Auth.Authorization, feedingController.getOneFeeding);

export default feedingRoutes