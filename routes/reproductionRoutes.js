import express from "express";
import reproductionController from "../controller/reproductionController.js";
import Auth from "../middleware/Auth.js";

const reproductionRoutes = express.Router();

//Endpoint: Listar todos as Reproduções
reproductionRoutes.get("/reproductions", Auth.Authorization, reproductionController.getAllReproductions);

//Endpoint: Cadastrar nova Reprodução
reproductionRoutes.post("/reproduction", Auth.Authorization, reproductionController.createReproduction);

//Endpoint: Deletar uma Reprodução
reproductionRoutes.delete("/reproduction/:id", Auth.Authorization, reproductionController.deleteReproduction);

//Endpoint: Atualizar uma Reprodução
reproductionRoutes.put("/reproduction/:id", Auth.Authorization, reproductionController.updateReproduction);

//Endpoint: Listar uma Reprodução especifica
reproductionRoutes.get("/reproduction/:id", Auth.Authorization, reproductionController.getOneReproduction);

export default reproductionRoutes