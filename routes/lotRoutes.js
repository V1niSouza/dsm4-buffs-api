import express from "express";
import lotController from "../controller/lotController.js";

const lotRoutes = express.Router();

//Endpoint: Listar todos os Lotes
lotRoutes.get("/lots", lotController.getAllLots);

//Endpoint: Cadastrar novo Lote
lotRoutes.post("/lot", lotController.createLot);

//Endpoint: Deletar um Lote
lotRoutes.delete("/lot/:id", lotController.deleteLot);

//Endpoint: Atualizar um Lote
lotRoutes.put("/lot/:id", lotController.updateLot);

//Endpoint: Listar um Lote especifico
lotRoutes.get("/lot/:id", lotController.getOneLot);

export default lotRoutes