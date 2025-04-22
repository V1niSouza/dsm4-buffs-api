import lotService from "../services/lotService.js";
import { ObjectId } from "mongodb";

// Lista todos os Lotes
const getAllLots = async (req, res) => {
    try {
      const lots = await lotService.getAll();
      return res.status(200).json({ lots: lots });    // Cod. 200 (OK)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor. "}); // Cod. 500 (Internal Server Error)
    }
  };

// Criar um novo Lote
const createLot = async (req, res) => {
    try{
        const {nomeLote, tamanhoArea, unidadeMedida, qtdComporta, status, fazenda} = req.body;
        await lotService.Create(nomeLote, tamanhoArea, unidadeMedida, qtdComporta, status, fazenda);
        res.sendStatus(201); // Cod. 201 (Created)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Erro interno do servidor."}) // Cod. 500 (Internal Server Error)
    }
};

// Deletar um Lote
const deleteLot = async (req, res) => {
        try{
            if(ObjectId.isValid(req.params.id)){
                const id = req.params.id
                await lotService.Delete(id)
                res.sendStatus(204) // Cod. 204 (No Content)
            } else {
                res. sendStatus(400) // Cod. 400 (Bad Request)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor.' }) // Cod. 500 (Internal Server Error)
        }
};

// Atualizar um Lote
const updateLot = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id;
            const {nomeLote, tamanhoArea, unidadeMedida, qtdComporta, status, fazenda} = req.body;
            const lot = await lotService.Update(id, nomeLote, tamanhoArea, unidadeMedida, qtdComporta, status, fazenda);
            res.status(200).json({ lot }); // Cod. 200 (OK)
        } else {
            res.sendStatus(400); // Cod. 400 (Bad request)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Cod. 500 (Internal Sever Error)
    }
};

// Listar um unico Lote
const getOneLot = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)) {
            const id = req.params.id
            const lot = await lotService.getOne(id)
            if (!lot){
                res.sendStatus(404); // Cod. 404 (Not Found)
            } else {
                res.status(200).json({ lot }) // Cod. 200 (OK)
            }
        } else {
            res.sendStatus(400); // Cod. 400 (Bad Request)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Cod. 500 (Internal Server Error)
    }
};

export default { getAllLots, createLot, deleteLot, updateLot, getOneLot };