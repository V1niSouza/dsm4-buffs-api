import Production from "../models/Production.js";
import { createProductionSchema, updateProductionSchema } from "../dtos/production.dto.js";

class productionService {
  // Método para consultar todas as Produções da API
  async getAll() {
    try {
      const productions = await Production.find();
      return productions;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para criar uma nova Produção da API
  async Create(data) {
    try {
      const validatedData = createProductionSchema.parse(data);
      const newProduction = new Production(validatedData);
      await newProduction.save();
      return newProduction;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na criação do búfalo: " + error.message);
    }
  }

  // Método para Deletar uma Produção da API
  async Delete(id) {
    try {
      const producao = await Production.findByIdAndDelete(id);
      if (!producao) {
        console.log(`Nenhuma Produção com o ID: ${id} foi encontrado.`);
        return;
      }
      console.log(`Produção com o ID: ${id} foi deletado.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para Atualizar uma Produção da API
  async Update(id, data) {
    try {
      const validatedData = updateProductionSchema.parse(data);
      // Separar o que é historico e o que é dado comum
      const { coletas, producao, ...dadosComuns } = validatedData;
      const updateOps = {};
      // Atualiza dados "comuns" diretamente
      if (Object.keys(dadosComuns).length > 0) {
        updateOps.$set = dadosComuns;
      }
      // Atualiza históricos com $push
      if (coletas) {
        updateOps.$push = {
          ...(updateOps.$push || {}),
          coletas: coletas,
        };
      }
      if (producao) {
        updateOps.$push = {
          ...(updateOps.$push || {}),
          producao: producao,
        };
      }
      // Busca o usuário especificado
      const updateProduction = await Production.findByIdAndUpdate(
        id,
        updateOps,
        {
          new: true,
        }
      );

      if (!updateProduction) {
        console.log(
          `Nenhuma Produção com o ID: ${id} foi encontrado para atualizção`
        );
        return;
      }
      console.log(
        `Dados da Produção do ID ${updateProduction.id}, foram alterados com sucesso!`
      );
      return updateProduction;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na atualização do búfalo: " + error.message);
    }
  }

  //Método para Listar uma Produção Especifico
  async getOne(id) {
    try {
      const production = await Production.findOne({ _id: id });
      return production;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new productionService();
