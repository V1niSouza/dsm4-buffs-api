import lactationService from "../services/lactationService.js";
import { createLactationSchema, updateLactationSchema } from "../dtos/lactation.dto.js"
import { ObjectId } from "mongodb";

// Lista todos as Lactações
const getAllLactation = async (req, res) => {
    try {
      const lactations = await lactationService.getAll();
      return res.status(200).json({ lactations : lactations });    // Cod. 200 (OK)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor. "}); // Cod. 500 (Internal Server Error)
    }
  };

// Criar um nova Lactação
const createLactation = async (req, res) => {
    try{
        // Validando os dados recebidos
        const parsedData = createLactationSchema.parse(req.body);
        // Se passou na validação, prossegue com o processo de criação
        await lactationService.Create(parsedData);
        res.sendStatus(201); // Cod. 201 (Created)
    } catch (error) {
        console.log(error);
        if (error.errors) {
            // Se o erro for de validação, retorne com status 400 e os erros
            return res.status(400).json({ error: error.errors });
        }
        // Caso contrário, erro genérico do servidor
        res.status(500).json({error:"Erro interno do servidor."}) // Cod. 500 (Internal Server Error)
    }
};

// Deletar uma Lactação
const deleteLactation = async (req, res) => {
        try{
            if(ObjectId.isValid(req.params.id)){
                const id = req.params.id
                await lactationService.Delete(id)
                res.sendStatus(204) // Cod. 204 (No Content)
            } else {
                res. sendStatus(400) // Cod. 400 (Bad Request)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor.' }) // Cod. 500 (Internal Server Error)
        }
};

// Atualizar uma Lactação
const updateLactation = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id;
            const parsedData = updateLactationSchema.parse(req.body);
            const lactation = await lactationService.Update(id, parsedData);
            res.status(200).json({ lactation }); // Cod. 200 (OK)
        } else {
            res.sendStatus(400); // Cod. 400 (Bad request)
        }
    } catch (error) {
        if (error.errors) {
            // Se o erro for de validação
            return res.status(400).json({ error: error.errors});
        }
        res.sendStatus(500); // Cod. 500 (Internal Sever Error)
    }
};

// Listar uma única Lactação
const getOneLactation = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)) {
            const id = req.params.id
            const lactation = await lactationService.getOne(id)
            if (!lactation){
                res.sendStatus(404); // Cod. 404 (Not Found)
            } else {
                res.status(200).json({ lactation }) // Cod. 200 (OK)
            }
        } else {
            res.sendStatus(400); // Cod. 400 (Bad Request)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Cod. 500 (Internal Server Error)
    }
};

export default { getAllLactation, createLactation, deleteLactation, updateLactation, getOneLactation };