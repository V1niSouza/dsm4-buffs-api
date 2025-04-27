import { createLotSchema, updateLotSchema } from "../dtos/lot.dto.js";
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
        // Validando os dados recebidos
        const parsedData = createLotSchema.parse(req.body);
        // Se passou na validação, prossegue com o processo de criação
        await lotService.Create(parsedData);
        res.sendStatus(201); // Cod. 201 (Created)
    } catch (error) {
        console.log(error);
        if (error.errors) {
            // Se o erro for de validação, retorne com status 400 e os erros
            return res.status(400).json({ error: error.errors });
        }
        // Caso contrário, erro genmérico do servidor
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
            const parsedData = updateLotSchema.parse(req.body);
            const lot = await lotService.Update(id, parsedData);
            res.status(200).json({ lot }); // Cod. 200 (OK)
        } else {
            res.sendStatus(400); // Cod. 400 (Bad request)
        }
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ error:error.errors })
        }
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