import productionService from "../services/productionService.js";
import { ObjectId } from "mongodb";

// Lista todas ass Produções
const getAllProductions = async (req, res) => {
    try {
        const productions = await productionService.getAll();
        return res.status(200).json({ productions : productions });    // Cod. 200 (OK)
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor. "}); // Cod. 500 (Internal Server Error)
      }
    };
  
  // Criar uma nova Produção
  const createProduction = async (req, res) => {
      try{
          const {totalProduzido, totalRejeitado, totalRetirado, taxaAprovacao, taxaRejeicao, dataAtualizacao, coletas, producao} = req.body;
          await productionService.Create(totalProduzido, totalRejeitado, totalRetirado, taxaAprovacao, taxaRejeicao, dataAtualizacao, coletas, producao);
          res.sendStatus(201); // Cod. 201 (Created)
      } catch (error) {
          console.log(error);
          res.status(500).json({error:"Erro interno do servidor."}) // Cod. 500 (Internal Server Error)
      }
  };
  
  // Deletar uma Produção
  const deleteProduction = async (req, res) => {
          try{
              if(ObjectId.isValid(req.params.id)){
                  const id = req.params.id
                  await productionService.Delete(id)
                  res.sendStatus(204) // Cod. 204 (No Content)
              } else {
                  res. sendStatus(400) // Cod. 400 (Bad Request)
              }
          } catch (error) {
              console.log(error)
              res.status(500).json({ error: 'Erro interno do servidor.' }) // Cod. 500 (Internal Server Error)
          }
  };
  
  // Atualizar uma Produção
  const updateProduction = async (req, res) => {
      try{
          if(ObjectId.isValid(req.params.id)){
              const id = req.params.id;
              const {totalProduzido, totalRejeitado, totalRetirado, taxaAprovacao, taxaRejeicao, dataAtualizacao, coletas, producao} = req.body;
              const production = await productionService.Update(id, totalProduzido, totalRejeitado, totalRetirado, taxaAprovacao, taxaRejeicao, dataAtualizacao, coletas, producao);
              res.status(200).json({ production }); // Cod. 200 (OK)
          } else {
              res.sendStatus(400); // Cod. 400 (Bad request)
          }
      } catch (error) {
          console.log(error);
          res.sendStatus(500); // Cod. 500 (Internal Sever Error)
      }
  };
  
  // Listar uma única Produção
  const getOneProduction = async (req, res) => {
      try{
          if(ObjectId.isValid(req.params.id)) {
              const id = req.params.id
              const production = await productionService.getOne(id)
              if (!production){
                  res.sendStatus(404); // Cod. 404 (Not Found)
              } else {
                  res.status(200).json({ production }) // Cod. 200 (OK)
              }
          } else {
              res.sendStatus(400); // Cod. 400 (Bad Request)
          }
      } catch (error) {
          console.log(error)
          res.sendStatus(500) // Cod. 500 (Internal Server Error)
      }
  };
  
  export default { getAllProductions, createProduction, deleteProduction, updateProduction, getOneProduction };