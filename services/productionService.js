import Production from "../models/Production.js";
import Lactation from "../models/Lactation.js";

import { createProductionSchema, updateProductionSchema } from "../dtos/production.dto.js";

class productionService {
  // Método para consultar todas as Produções da API
  async getAll() {
    try {
      const productions = await Production.find();
      for (const producao of productions) {
        await this.calcularProducao(producao._id);
      }

      // Retorna a lista já atualizada
      const updatedProductions = await Production.find();
      return updatedProductions;
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

// Método para Atualizar uma Produção da API - Versão Corrigida
async Update(id, data) {
  try {
    const validatedData = updateProductionSchema.parse(data);
    const { coletas, producao, ...dadosComuns } = validatedData;
    const updateOps = {};

    if (Object.keys(dadosComuns).length > 0) {
      updateOps.$set = dadosComuns;
    }
    
    if (coletas) {
      updateOps.$push = {
        ...(updateOps.$push || {}),
        coletas: { $each: coletas } // Usando $each para múltiplas coletas
      };
    }
    
    if (producao) {
      updateOps.$push = {
        ...(updateOps.$push || {}),
        producao: { $each: producao }
      };
    }

    const updateProduction = await Production.findByIdAndUpdate(
      id,
      updateOps,
      { new: true }
    );

    if (!updateProduction) {
      throw new Error(`Nenhuma Produção com o ID: ${id} encontrada.`);
    }

    // Recalcula automaticamente após inserir coleta
    if (coletas) {
      await this.calcularProducao(id); // Passando o ID para garantir que atualiza o correto
    }

    return updateProduction;
  } catch (error) {
    console.error("Erro detalhado:", error);
    throw new Error("Erro na atualização da produção: " + error.message);
  }
}

async calcularProducao(productionId) {
  try {
    const lactacoes = await Lactation.find();
    const producao = await Production.findById(productionId);

    if (!producao) {
      throw new Error("Produção não encontrada.");
    }

    let quantidadeTotal = 0;
    const producaoPorData = {};

    // Agrupando produção por data
    lactacoes.forEach(lactacao => {
      lactacao.metrica?.forEach(metrica => {
        const quantidade = parseFloat(metrica.quantidade) || 0;
        quantidadeTotal += quantidade;

        const data = new Date(metrica.dataMedida).toISOString().split('T')[0];
        producaoPorData[data] = (producaoPorData[data] || 0) + quantidade;
      });
    });

    const datasOrdenadas = Object.keys(producaoPorData).sort();

    // Atualiza o array de produção por data
    producao.producao = datasOrdenadas.map(data => ({
      quantidadeAdicao: producaoPorData[data],
      dataAtualizacao: new Date(data),
    }));

    // Cálculo do total retirado
    let quantidadeRetirada = 0;

    producao.coletas?.forEach(coleta => {
      const quantidade = parseFloat(coleta.quantidadeColetada) || 0;
      quantidadeRetirada += quantidade;
    });

    // Encontra a última data de coleta aprovada
    let ultimaDataColeta = null;

    const coletasAprovadas = producao.coletas?.filter(c => c.resultado === "Aprovado") || [];

    if (coletasAprovadas.length > 0) {
      ultimaDataColeta = coletasAprovadas.reduce((max, coleta) => {
        const data = new Date(coleta.dataColeta).toISOString().split('T')[0];
        return data > max ? data : max;
      }, "0000-00-00");
    }

    // Calcula estoque atual
    let estoqueAtual = 0;

    if (ultimaDataColeta) {
      datasOrdenadas.forEach(data => {
        if (data >= ultimaDataColeta) {
          estoqueAtual += producaoPorData[data];
        }
      });
    } else {
      estoqueAtual = quantidadeTotal;
    }

    // Soma produção até a última coleta aprovada
    let producaoAteUltimaColeta = 0;
    if (ultimaDataColeta) {
      datasOrdenadas.forEach(data => {
        if (data <= ultimaDataColeta) {
          producaoAteUltimaColeta += producaoPorData[data];
        }
      });
    }

    // Aplica as regras:
    // - Estoque reduz apenas pelas coletas Aprovadas
    const totalRetirado = producao.coletas?.reduce((acc, coleta) => {
      return acc + (parseFloat(coleta.quantidadeColetada) || 0);
    }, 0) || 0;

    const totalAprovado = coletasAprovadas.reduce((acc, coleta) => {
      return acc + (parseFloat(coleta.quantidadeColetada) || 0);
    }, 0);

    const totalRejeitado = totalRetirado - totalAprovado;

    // Atualiza os campos principais
    producao.totalProduzido = quantidadeTotal;
    producao.totalRetirado = totalRetirado;
    producao.estoqueAtual = estoqueAtual;
    producao.totalRejeitado = totalRejeitado;
    producao.dataAtualizacao = new Date();

    await producao.save();
    console.log("Produção recalculada com sucesso.");
    return producao;
  } catch (error) {
    console.error("Erro no cálculo:", error);
    throw new Error("Erro ao calcular produção: " + error.message);
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
