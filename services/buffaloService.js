import Buffalo from "../models/Buffalo.js";
import { createBuffaloSchema, updateBuffaloSchema } from "../dtos/buffalos.dto.js";

class buffaloService {
  // Método para Consultar todos os Bufalos
  async getAll() {
    try {
      const buffalos = await Buffalo.find();
      return buffalos;
    } catch (error) {
      console.log(error);
    }
  }

  // Método para Cria um novo Bufalo
  async Create(data) {
    try {
      const validatedData = createBuffaloSchema.parse(data);
      const newBuffalo = new Buffalo(validatedData);
      await newBuffalo.save();
      return newBuffalo;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na criação do búfalo: " + error.message);
    }
  }

  // Método para Deletar um Bufalo
  async Delete(id) {
    try {
      const bufalo = await Buffalo.findByIdAndDelete(id);
      if (!bufalo) {
        console.log(`Nenhum Bufalo com o ID: ${id} foi encontrada.`);
        return;
      }
      console.log(`Bufalo ${bufalo.nome} com o ID: ${id} foi deletada.`);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para Atualizar um Bufalo
  async Update(id, data) {
    try {
      const validatedData = updateBuffaloSchema.parse(data);
      // Separar o que é histórico e o que é dado comum
      const { zootecnico, sanitario, ...dadosComuns } = validatedData;
      const updateOps = {};
      // Atualiza dados "comuns" diretamente
      if (Object.keys(dadosComuns).length > 0) {
        updateOps.$set = dadosComuns;
      }
      // Atualiza históricos com $push
      if (zootecnico) {
        updateOps.$push = {
          ...(updateOps.$push || {}),
          zootecnico: zootecnico, // Já deve ser um objeto, tipo { peso: 100, condicaoCorporal: 'Boa', etc }
        };
      }
      if (sanitario) {
        updateOps.$push = {
          ...(updateOps.$push || {}),
          sanitario: sanitario, // idem
        };
      }
      // Executa a atualização
      const updatedBuffalo = await Buffalo.findByIdAndUpdate(id, updateOps, {
        new: true,
      });

      if (!updatedBuffalo) {
        console.log(
          `Nenhum Bufalo com o ID: ${id} foi encontrado para atualização.`
        );
        return;
      }

      console.log(
        `Dados do Bufalo ${updatedBuffalo.nome} do ID: ${id}, foram alterados com sucesso!`
      );
      return updatedBuffalo;
    } catch (error) {
      console.log(error);
      throw new Error("Erro na atualização do búfalo: " + error.message);
    }
  }

  // Método para Listar uma Bufalo Especifica
  async getOne(id) {
    try {
      const buffalo = await Buffalo.findOne({ _id: id });
      return buffalo;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new buffaloService();
