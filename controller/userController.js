import { createUserSchema, updateUserSchema } from "../dtos/user.dto.js";
import userService from "../services/UserService.js";
import { ObjectId } from "mongodb";

// Lista todos os Usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();
    return res.status(200).json({ users: users }); // Cod. 200 (OK)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor. " }); // Cod. 500 (Internal Server Error)
  }
};

// Criar um novo Usuário
const createUser = async (req, res) => {
  try {
    // Validando os dados recebidos
    const parsedData = createUserSchema.parse(req.body);
    // Se passou na validação, prossegue com o processo de criação
    await userService.Create(parsedData);
    res.sendStatus(201); // Cod. 201 (Created)
  } catch (error) {
    console.log(error);
    if (error.errors) {
      // Se o erro for de validação, retorne com status 400 e os erros
      return res.status(400).json({ error: error.errors });
    }
    // Caso contrário, erro genérico do servidor
    res.status(500).json({ error: "Erro interno do servidor." }); // Cod. 500 (Internal Server Error)
  }
};

// Deletar um Usuário
const deleteUser = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await userService.Delete(id);
      res.sendStatus(204); // Cod. 204 (No Content)
    } else {
      res.sendStatus(400); // Cod. 400 (Bad Request)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Cod. 500 (Internal Server Error)
  }
};

// Atualizar um Usuário
const updateUser = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const parsedData = updateUserSchema.parse(req.body);
      const user = await userService.Update(id, parsedData);
      res.status(200).json({ user }); // Cod. 200 (OK)
    } else {
      res.sendStatus(400); // Cod. 400 (Bad request)
    }
  } catch (error) {
    if (error.errors) {
      // Se o erro for de validação
      return res.status(400).json({ error: error.errors });
    }
    res.sendStatus(500); // Cod. 500 (Internal Server Error)
  }
};

// Listar um único User
const getOneUser = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const user = await userService.getOne(id);
      if (!user) {
        res.sendStatus(404); // Cod. 404 (Not Found)
      } else {
        res.status(200).json({ user }); // Cod. 200 (OK)
      }
    } else {
      res.sendStatus(400); // Cod. 400 (Bad Request)
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Cod. 500 (Internal Server Error)
  }
};

export default { getAllUsers, createUser, deleteUser, updateUser, getOneUser };
