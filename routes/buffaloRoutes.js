import express from "express";
import buffaloController from "../controller/buffaloController.js";

const buffaloRoutes = express.Router();

//Endpoint: Listar todos os Bufalos
buffaloRoutes.get("/buffalos", buffaloController.getAllBuffalos);

//Endpoint: Cadastrar novo Bufalo
buffaloRoutes.post("/buffalo", buffaloController.createBuffalo);

//Endpoint: Deletar um Bufalo
buffaloRoutes.delete("/buffalo/:id", buffaloController.deleteBuffalo);

//Endpoint: Atualizar um Bufalo
buffaloRoutes.put("/buffalo/:id", buffaloController.updateBuffalo);

//Endpoint: Listar um Bufalo especifico
buffaloRoutes.get("/buffalo/:id", buffaloController.getOneBuffalo);

export default buffaloRoutes