import express from "express";
import reproductionController from "../controller/reproductionController.js";

const reproductionRoutes = express.Router();

//Endpoint: Listar todos as Reproduções
reproductionRoutes.get("/reproductions", reproductionController.getAllReproductions);

//Endpoint: Cadastrar nova Reprodução
reproductionRoutes.post("/reproduction", reproductionController.createReproduction);

//Endpoint: Deletar uma Reprodução
reproductionRoutes.delete("/reproduction/:id", reproductionController.deleteReproduction);

//Endpoint: Atualizar uma Reprodução
reproductionRoutes.put("/reproduction/:id", reproductionController.updateReproduction);

//Endpoint: Listar uma Reprodução especifica
reproductionRoutes.get("/reproduction/:id", reproductionController.getOneReproduction);

export default reproductionRoutes