import { createReproductionSchema, updateReproductionSchema } from "../dtos/reproduction.dto.js";
import Rerpoduction from "../models/Reproduction.js";

class reproductionService {
  // Método para Consultar todas as Reproduções
  async getAll() {
    try {
      const reproductions = await Rerpoduction.find();
      return reproductions;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para Cria uma nova Reprodução
  async Create(data) {
    try {
      const validatedData = createReproductionSchema.parse(data);
      const newRerpoduction = new Rerpoduction(validatedData);
      await newRerpoduction.save();
      return newRerpoduction;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na criação do búfalo: " + error.message);
    }
  }

  // Método para Deletar uma Reprodução
  async Delete(id) {
    try {
      const reproducao = await Rerpoduction.findByIdAndDelete(id);
      if (!reproducao) {
        console.log(`Nenhuma reprodução com o ID: ${id} foi encontrada.`);
        return;
      }
      console.log(`Reprodução com o ID: ${id} foi deletada.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para Atualizar uma Reprodução
  async Update(id, data) {
    try {
      const validatedData = updateReproductionSchema.parse(data);
      // Executa a atualização
      const updateReproduction = await Rerpoduction.findByIdAndUpdate(
        id,
        validatedData,
        { new: true }
      );

      if (!updateReproduction) {
        console.log(
          `Nenhuma Reprodução com o ID: ${id} foi encontrado para atualização.`
        );
        return;
      }

      console.log(
        `Dados da reprodução do ID: ${id}, foram alterados com sucesso!`
      );
      return updateReproduction;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na atualização do búfalo: " + error.message);
    }
  }

  // Método para Listar uma Reprodução Especifica
  async getOne(id) {
    try {
      const reproduction = await Rerpoduction.findOne({ _id: id });
      return reproduction;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new reproductionService();
