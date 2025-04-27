import { createUserSchema, updateUserSchema } from "../dtos/user.dto.js";
import User from "../models/Users.js";

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
      const validatedData = createUserSchema.parse(data);
      const newUser = new User(validatedData);
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na criação de Usuário: " + error.message);
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
  async getOne(id) {
    try {
      const user = await User.findOne({ _id: id });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new userService();
