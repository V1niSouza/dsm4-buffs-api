import Production from "../models/Production.js";
import Lactation from "../models/Lactation.js";

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

async calcularProducao() {
  try {
    const lactacoes = await Lactation.find();

    if (lactacoes.length === 0) {
      return console.log("Nenhuma lactação encontrada.");
    }

    let quantidadeTotal = 0; // soma total de todas as ordenhas (historicamente)
    const producaoPorData = {};

    // Agrupa produção por data (YYYY-MM-DD)
    lactacoes.forEach(lactacao => {
      lactacao.metrica?.forEach(metrica => {
        quantidadeTotal += metrica.quantidade;

        const data = new Date(metrica.dataMedida).toISOString().split('T')[0];
        if (!producaoPorData[data]) {
          producaoPorData[data] = 0;
        }
        producaoPorData[data] += metrica.quantidade;
      });
    });

    // Ordena as datas para facilitar os cálculos
    const datasOrdenadas = Object.keys(producaoPorData).sort();

    // Converte para array do formato esperado
    const novasAdicoes = datasOrdenadas.map(data => ({
      quantidadeAdicao: producaoPorData[data],
      dataAtualizacao: new Date(data),
    }));

    // Busca produção atual
    const producao = await Production.findOne();

    if (!producao) {
      return console.log("Nenhuma produção encontrada para atualizar.");
    }

    // Soma total de coletas (total retirado)
    let quantidadeRetirada = 0;
    producao.coletas?.forEach(coleta => {
      quantidadeRetirada += coleta.quantidade;
    });

    // Calcula estoqueAtual: produção desde a última coleta até hoje
    // Pega a última data de coleta (formato YYYY-MM-DD)
    let ultimaDataColeta = null;
    if (producao.coletas && producao.coletas.length > 0) {
      ultimaDataColeta = producao.coletas.reduce((max, coleta) => {
        const dataColeta = new Date(coleta.dataAtualizacao).toISOString().split('T')[0];
        return dataColeta > max ? dataColeta : max;
      }, "0000-00-00");
    }

    // Soma produção desde última coleta até hoje
    let estoqueAtual = 0;
    if (ultimaDataColeta) {
      // percorre datas ordenadas, soma só as datas posteriores ou iguais à última coleta
      datasOrdenadas.forEach(data => {
        if (data >= ultimaDataColeta) {
          estoqueAtual += producaoPorData[data];
        }
      });
    } else {
      // Se não tem coleta, estoqueAtual = total produzido
      estoqueAtual = quantidadeTotal;
    }

    // Calcula totalRejeitado = produção até última coleta - total retirado
    // Se negativo, considera zero
    let producaoAteUltimaColeta = 0;
    if (ultimaDataColeta) {
      datasOrdenadas.forEach(data => {
        if (data <= ultimaDataColeta) {
          producaoAteUltimaColeta += producaoPorData[data];
        }
      });
    }
    const totalRejeitado = Math.max(producaoAteUltimaColeta - quantidadeRetirada, 0);

    // Atualiza os campos no documento de produção
    producao.totalProduzido = quantidadeTotal;
    producao.totalRetirado = quantidadeRetirada;
    producao.estoqueAtual = estoqueAtual;
    producao.totalRejeitado = totalRejeitado;
    producao.producao = novasAdicoes;

    await producao.save();

    console.log("Produção atualizada com os cálculos estendidos.");

  } catch (error) {
    console.error("Erro ao calcular produção:", error);
  }
}


}

export default new productionService();
