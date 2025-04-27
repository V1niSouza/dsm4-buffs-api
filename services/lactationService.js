import Lactation from "../models/Lactation.js";
import { createLactationSchema, updateLactationSchema } from "../dtos/lactation.dto.js";

class lactationService {
  // Método para consultar todos as Lactações da API
  async getAll() {
    try {
      const lactations = await Lactation.find();
      return lactations;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para criar uma nova Lactação da API
  async Create(data) {
    try {
      const validatedData = createLactationSchema.parse(data);
      const newLactation = new Lactation(validatedData);
      await newLactation.save();
      return newLactation;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na criação da Lactação: " + error.message);
    }
  }

  // Método para Deletar uma Lactação da API
  async Delete(id) {
    try {
      const lactacao = await Lactation.findByIdAndDelete(id);
      if (!lactacao) {
        console.log(`Nenhuma lactação com o ID: ${id} foi encontrado.`);
        return;
      }
      console.log(`Lactação com o ID: ${id} foi deletado.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para Atualizar uma Lactação da API
  async Update(id, data) {
    try {
      const validatedData = updateLactationSchema.parse(data);
      // Separar o que é historico e o que é dado comum
      const { metrica, ...dadosComuns } = validatedData;
      const updateOps = {};
      // Atualiza dados "comuns" diretamente
      if (Object.keys(dadosComuns).length > 0) {
        updateOps.$set = dadosComuns;
      }
      // Atualiza historicos com $push
      if (metrica) {
        updateOps.$push = {
          ...(updateOps.$push || {}),
          metrica: metrica, // Já deve ser um objeto, tipo
        };
      }
      // Executa a atualização
      const updatedLactation = await Lactation.findByIdAndUpdate(id, updateOps, {
        new: true,
      });
      if (!updatedLactation) {
          console.log(
            `Nenhuma Lactação do ID: ${id}, foi encontrada para atualização.`
          );
          return;
      }
      console.log(
        `Dados da Lactação com o ID: ${id}, foram alterados com sucesso!`
      );
      return updatedLactation;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na atualiação da Lactação: " + error.message);
    }
  }

  //Método para Listar uma Lactação Especifica
  async getOne(id) {
    try {
      const lactation = await Lactation.findOne({ _id: id });
      return lactation;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new lactationService();
