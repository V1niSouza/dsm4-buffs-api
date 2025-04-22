import express from "express";
import lactationContoller from "../controller/lactationController.js";

const lactationRoutes = express.Router();

//Endpoint: Listar todoas as Lactações
lactationRoutes.get("/lactations", lactationContoller.getAllLactation);

//Endpoint: Cadastrar nova Lactação
lactationRoutes.post("/lactation", lactationContoller.createLactation);

//Endpoint: Deletar uma Lactação
lactationRoutes.delete("/lactation/:id", lactationContoller.deleteLactation);

//Endpoint: Atualizar uma Lactação
lactationRoutes.put("/lactation/:id", lactationContoller.updateLactation);

//Endpoint: Listar uma Lactação especifica
lactationRoutes.get("/lactation/:id", lactationContoller.getOneLactation);

export default lactationRoutes