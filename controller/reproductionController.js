import { createReproductionSchema, updateReproductionSchema } from "../dtos/reproduction.dto.js";
import reproductionService from "../services/reproductionService.js";
import { ObjectId } from "mongodb";

// Lista todas Reproduções
const getAllReproductions = async (req, res) => {
    try {
      const reproductions = await reproductionService.getAll();
      return res.status(200).json({ reproductions: reproductions });    // Cod. 200 (OK)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor. "}); // Cod. 500 (Internal Server Error)
    }
  };

// Criar uma nova Reprodução
const createReproduction = async (req, res) => {
    try{
        // Validando os dados recebidos
        const parsedData = createReproductionSchema.parse(req.body);
        await reproductionService.Create(parsedData);
        res.sendStatus(201); // Cod. 201 (Created)
    } catch (error) {
        console.log(error);     
        if (error.errors) {
            // Se o erro for de validação, retorne com status 400 e os erros
            return res.status(400).json({ error: error.errors });
        }    
        // Caso contrário, erro genérico do servidor
        res.status(500).json({ error: "Erro interno do servidor." }); // Cod. 500 (Internal Server Error)
    }
};

// Deletar uma Reprodução
const deleteReproduction = async (req, res) => {
        try{
            if(ObjectId.isValid(req.params.id)){
                const id = req.params.id
                await reproductionService.Delete(id)
                res.sendStatus(204) // Cod. 204 (No Content)
            } else {
                res. sendStatus(400) // Cod. 400 (Bad Request)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor.' }) // Cod. 500 (Internal Server Error)
        }
};

// Atualizar uma Reprodução
const updateReproduction = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id;
            const parsedData = updateReproductionSchema.parse(req.body);
            const reproduction = await reproductionService.Update(id, parsedData);
            res.status(200).json({ reproduction }); // Cod. 200 (OK)
        } else {
            res.sendStatus(400); // Cod. 400 (Bad request)
        }
    } catch (error) {
        if (error.errors) {
            // Se o erro for de validação
            return res.status(400).json({ error: error.errors });
        }
        res.sendStatus(500); // Cod. 500 (Internal Server Error)
    }
};

// Listar uma uníca Reprodução
const getOneReproduction = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)) {
            const id = req.params.id
            const reproduction = await reproductionService.getOne(id)
            if (!reproduction){
                res.sendStatus(404); // Cod. 404 (Not Found)
            } else {
                res.status(200).json({ reproduction }) // Cod. 200 (OK)
            }
        } else {
            res.sendStatus(400); // Cod. 400 (Bad Request)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Cod. 500 (Internal Server Error)
    }
};

export default { getAllReproductions, createReproduction, deleteReproduction, updateReproduction, getOneReproduction };