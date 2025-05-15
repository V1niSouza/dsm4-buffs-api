import express from "express";
import lotController from "../controller/lotController.js";
import Auth from "../middleware/Auth.js";

const lotRoutes = express.Router();

//Endpoint: Listar todos os Lotes
lotRoutes.get("/lots", Auth.Authorization, lotController.getAllLots);

//Endpoint: Cadastrar novo Lote
lotRoutes.post("/lot", Auth.Authorization, lotController.createLot);

//Endpoint: Deletar um Lote
lotRoutes.delete("/lot/:id", Auth.Authorization, lotController.deleteLot);

//Endpoint: Atualizar um Lote
lotRoutes.put("/lot/:id", Auth.Authorization, lotController.updateLot);

//Endpoint: Listar um Lote especifico
lotRoutes.get("/lot/:id", Auth.Authorization, lotController.getOneLot);

export default lotRoutes