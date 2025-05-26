import express from "express";
import buffaloController from "../controller/buffaloController.js";
import Auth from "../middleware/Auth.js";

const buffaloRoutes = express.Router();

//Endpoint: Listar todos os Bufalos
buffaloRoutes.get("/buffalos", Auth.Authorization, buffaloController.getAllBuffalos);

//Endpoint: Cadastrar novo Bufalo
buffaloRoutes.post("/buffalo", Auth.Authorization, buffaloController.createBuffalo);

//Endpoint: Deletar um Bufalo
buffaloRoutes.delete("/buffalo/:id", Auth.Authorization, buffaloController.deleteBuffalo);

//Endpoint: Atualizar um Bufalo
buffaloRoutes.put("/buffalo/:id", Auth.Authorization, buffaloController.updateBuffalo);

//Endpoint: Listar um Bufalo especifico
buffaloRoutes.get("/buffalo/:id", Auth.Authorization, buffaloController.getOneBuffalo);

buffaloRoutes.get("/buffalo/tag/:tag", Auth.Authorization, buffaloController.getOneBuffaloTag);


export default buffaloRoutes