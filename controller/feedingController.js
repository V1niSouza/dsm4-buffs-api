import feedingService from "../services/feedingService.js";
import { ObjectId } from "mongodb";

// Lista todas Alimentações
const getAllFeeding = async (req, res) => {
    try {
      const feedings = await feedingService.getAll();
      return res.status(200).json({ feedings: feedings });    // Cod. 200 (OK)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor. "}); // Cod. 500 (Internal Server Error)
    }
  };

// Criar uma nova Alimentação
const createFeeding = async (req, res) => {
    try{
        const {nome, tpAlimentacao, quantidade, unidadeMedida, grupoDestinado, frequencia, desc} = req.body;
        await feedingService.Create(nome, tpAlimentacao, quantidade, unidadeMedida, grupoDestinado, frequencia, desc);
        res.sendStatus(201); // Cod. 201 (Created)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Erro interno do servidor."}) // Cod. 500 (Internal Server Error)
    }
};

// Deletar uma Alimentação
const deleteFeeding = async (req, res) => {
        try{
            if(ObjectId.isValid(req.params.id)){
                const id = req.params.id
                await feedingService.Delete(id)
                res.sendStatus(204) // Cod. 204 (No Content)
            } else {
                res. sendStatus(400) // Cod. 400 (Bad Request)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor.' }) // Cod. 500 (Internal Server Error)
        }
};

// Atualizar uma Alimentação
const updateFeeding = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id;
            const {nome, tpAlimentacao, quantidade, unidadeMedida, grupoDestinado, frequencia, desc} = req.body;
            const feeding = await feedingService.Update(id, nome, tpAlimentacao, quantidade, unidadeMedida, grupoDestinado, frequencia, desc);
            res.status(200).json({ feeding }); // Cod. 200 (OK)
        } else {
            res.sendStatus(400); // Cod. 400 (Bad request)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Cod. 500 (Internal Sever Error)
    }
};

// Listar uma uníca Alimentação
const getOneFeeding = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)) {
            const id = req.params.id
            const feeding = await feedingService.getOne(id)
            if (!feeding){
                res.sendStatus(404); // Cod. 404 (Not Found)
            } else {
                res.status(200).json({ feeding }) // Cod. 200 (OK)
            }
        } else {
            res.sendStatus(400); // Cod. 400 (Bad Request)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Cod. 500 (Internal Server Error)
    }
};

export default { getAllFeeding, createFeeding, deleteFeeding, updateFeeding, getOneFeeding };