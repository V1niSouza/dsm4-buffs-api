import express from "express";
import propertyController from "../controller/propertyController.js";

const propertyRoutes = express.Router();

//Endpoint: Listar todos os Propriedades
propertyRoutes.get("/propertys", propertyController.getAllPropertys);

//Endpoint: Cadastrar novo Propriedade
propertyRoutes.post("/property", propertyController.createProperty);

//Endpoint: Deletar um Propriedade
propertyRoutes.delete("/property/:id", propertyController.deleteProperty);

//Endpoint: Atualizar um Propriedade
propertyRoutes.put("/property/:id", propertyController.updateProperty);

//Endpoint: Listar um Propriedade especifico
propertyRoutes.get("/property/:id", propertyController.getOneProperty);

export default propertyRoutes