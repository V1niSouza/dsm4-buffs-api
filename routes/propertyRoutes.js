import express from "express";
import propertyController from "../controller/propertyController.js";
import Auth from "../middleware/Auth.js";

const propertyRoutes = express.Router();

//Endpoint: Listar todos os Propriedades
propertyRoutes.get("/propertys", Auth.Authorization, propertyController.getAllPropertys);

//Endpoint: Cadastrar novo Propriedade
propertyRoutes.post("/property", Auth.Authorization, propertyController.createProperty);

//Endpoint: Deletar um Propriedade
propertyRoutes.delete("/property/:id", Auth.Authorization, propertyController.deleteProperty);

//Endpoint: Atualizar um Propriedade
propertyRoutes.put("/property/:id", Auth.Authorization, propertyController.updateProperty);

//Endpoint: Listar um Propriedade especifico
propertyRoutes.get("/property/:id", Auth.Authorization, propertyController.getOneProperty);

export default propertyRoutes