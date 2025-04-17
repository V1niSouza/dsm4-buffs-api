import userService from "../services/UserService.js";
import { ObjectId } from "mongodb";

// Lista todos os Usuários
const getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAll();
      return res.status(200).json({ users: users });    // Cod. 200 (OK)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor. "}); // Cod. 500 (Internal Server Error)
    }
  };

// Criar um novo Usuário
const createUser = async (req, res) => {
    try{
        const {nome, email, telefone, dataNascimento, cargo, endereco} = req.body;
        await userService.Create(nome, email, telefone, dataNascimento, cargo, endereco);
        res.sendStatus(201); // Cod. 201 (Created)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Erro interno do servidor."}) // Cod. 500 (Internal Server Error)
    }
};

// Deletar um Usuário
const deleteUser = async (req, res) => {
        try{
            if(ObjectId.isValid(req.params.id)){
                const id = req.params.id
                await userService.Delete(id)
                res.sendStatus(204) // Cod. 204 (No Content)
            } else {
                res. sendStatus(400) // Cod. 400 (Bad Request)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor.' }) // Cod. 500 (Internal Server Error)
        }
};

// Atualizar um Usuário
const updateUser = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id;
            const {nome, email, telefone, dataNascimento, cargo, endereco} = req.body;
            const user = await userService.Update(id, nome, email, telefone, dataNascimento, cargo, endereco);
            res.status(200).json({ user }); // Cod. 200 (OK)
        } else {
            res.sendStatus(400); // Cod. 400 (Bad request)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Cod. 500 (Internal Sever Error)
    }
};

// Listar um único User
const getOneUser = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)) {
            const id = req.params.id
            const user = await userService.getOne(id)
            if (!user){
                res.sendStatus(404); // Cod. 404 (Not Found)
            } else {
                res.status(200).json({ user }) // Cod. 200 (OK)
            }
        } else {
            res.sendStatus(400); // Cod. 400 (Bad Request)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Cod. 500 (Internal Server Error)
    }
};

export default { getAllUsers, createUser, deleteUser, updateUser, getOneUser };