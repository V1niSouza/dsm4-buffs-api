import { createUserSchema, updateUserSchema } from "../dtos/user.dto.js";
import User from "../models/Users.js";
import bcrypt from "bcrypt";

class userService {
  // Método para consultar todos os Usuários da API
  async getAll() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para criar um novo Usuários da API
  async Create(data) {
    try {
      // Valida dados recebidos (DTO)
      const validatedData = createUserSchema.parse(data);
      // Gera o hash da senha
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      // Substitui a senha pelo hash
      validatedData.password = hashedPassword;
      const newUser = new User(validatedData);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw error; // Deixa assim para o erro chegar no controller
    }
  }

  // Método para Deletar um Usuário da API
  async Delete(id) {
    try {
      const usuario = await User.findByIdAndDelete(id);
      if (!usuario) {
        console.log(`Nenhum usuário com o ID: ${id} foi encontrado.`);
        return;
      }
      console.log(`Usuário ${usuario.nome} com o ID: ${id} foi deletado.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para Atualizar um Usuário da API
  async Update(id, data) {
    try {
      const validatedData = updateUserSchema.parse(data);
      // Se o update tiver password, criptografa ela antes de atualizar
      if (validatedData.password) {
        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        validatedData.password = hashedPassword;
      }

      // Busca o usuário especificado
      const updateUser = await User.findByIdAndUpdate(id, validatedData, {
        new: true,
      });
      // Verifica se o item foi encontrado
      if (!updateUser) {
        console.log(
          `Nenhum usuário com o ID: ${id} foi encontrado para atualização.`
        );
        return null;
      }
      // Mensagem de sucesso
      console.log(
        `Dados do usáruio ${updateUser.nome} (ID: ${id}) foram atualizados com sucesso!`
      );
      return updateUser;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na atualização da alimentação: " + error.message); // Retorna o erro se falhar na atualização
    }
  }

  //Método para Listar um Usuário Especifico
  async getOne(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new userService();
