import express from "express";
import lactationContoller from "../controller/lactationController.js";
import Auth from "../middleware/Auth.js";

const lactationRoutes = express.Router();

//Endpoint: Listar todoas as Lactações
lactationRoutes.get("/lactations", Auth.Authorization, lactationContoller.getAllLactation);

//Endpoint: Cadastrar nova Lactação
lactationRoutes.post("/lactation", Auth.Authorization, lactationContoller.createLactation);

//Endpoint: Deletar uma Lactação
lactationRoutes.delete("/lactation/:id", Auth.Authorization, lactationContoller.deleteLactation);

//Endpoint: Atualizar uma Lactação
lactationRoutes.put("/lactation/:id", Auth.Authorization, lactationContoller.updateLactation);

//Endpoint: Listar uma Lactação especifica
lactationRoutes.get("/lactation/:id", Auth.Authorization, lactationContoller.getOneLactation);

export default lactationRoutes