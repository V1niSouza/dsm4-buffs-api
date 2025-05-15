import { createUserSchema, updateUserSchema } from "../dtos/user.dto.js";
import userService from "../services/UserService.js";
import { ObjectId } from "mongodb";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const JWTSecret = 'apigamessecret'

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
    if (ObjectId.isValid(req.params.email)) {
      const email = req.params.email;
      const user = await userService.getOne(email);
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

// Função para Login do Usuário
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        // E-mail válido
        if(email != undefined){
            const user = await userService.getOne(email)
                // Usuário encontrado
                if(user != undefined){
                    // Senha correta
                    const isPasswordValid = await bcrypt.compare(password, user.password);
                    if(isPasswordValid){
                        jwt.sign({id: user._id, email: user.email}, JWTSecret, {expiresIn:'48h'}, (err, token) => {
                            if(err){
                                res.status(400) // Bad request
                                res.json({err: "Falha interna"})
                            }else{
                                res.status(200) // OK
                                res.json({token: token})
                            }
                        })
                    // Senha incorreta
                    }else{
                        res.status(401) // Unauthorized
                        res.json({err: "Credenciais inválidas!"})
                    }
                // Usuário não encontrado
                }else{
                    res.status(404) // Not Found
                    res.json({err: "O e-mail enviado não foi encontrado."})
                }
        // E-mail inválido
        }else{
            res.status(400) // Bad request
            res.json({err: "O e-mail enviado é inválido."})
        }  
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Internal Server Error
    }
}

export default { getAllUsers, createUser, deleteUser, updateUser, getOneUser, loginUser, JWTSecret };
