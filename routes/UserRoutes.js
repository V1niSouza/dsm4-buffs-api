import express from "express";
import userController from "../controller/userController.js";

const userRoutes = express.Router();

//Endpoint: Listar todos os Usuários
userRoutes.get("/users", userController.getAllUsers);

//Endpoint: Cadastrar novo usuário
userRoutes.post("/user", userController.createUser);

//Endpoint: Deletar um Usuário
userRoutes.delete("/user/:id", userController.deleteUser);

//Endpoint: Atualizar um Usuário
userRoutes.put("/user/:id", userController.updateUser);

//Endpoint: Listar um Usuário especifico
userRoutes.get("/user/:id", userController.getOneUser);

export default userRoutes