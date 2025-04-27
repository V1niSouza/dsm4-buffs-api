import buffaloService from "../services/buffaloService.js";
import { createBuffaloSchema, updateBuffaloSchema } from "../dtos/buffalos.dto.js"; // Supondo que seu Zod schema esteja neste arquivo
import { ObjectId } from "mongodb";

// Lista todas Bufalos
const getAllBuffalos = async (req, res) => {
    try {
      const buffalos = await buffaloService.getAll();
      return res.status(200).json({ buffalos: buffalos });    // Cod. 200 (OK)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor. "}); // Cod. 500 (Internal Server Error)
    }
  };

// Criar uma nova Bufalo
const createBuffalo = async (req, res) => {
    try {
        // Validando os dados recebidos
        const parsedData = createBuffaloSchema.parse(req.body);
        // Se passou na validação, prossegue com o processo de criação
        await buffaloService.Create(parsedData);
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

// Deletar uma Bufalo
const deleteBuffalo = async (req, res) => {
        try{
            if(ObjectId.isValid(req.params.id)){
                const id = req.params.id
                await buffaloService.Delete(id)
                res.sendStatus(204) // Cod. 204 (No Content)
            } else {
                res. sendStatus(400) // Cod. 400 (Bad Request)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor.' }) // Cod. 500 (Internal Server Error)
        }
};

// Atualizar uma Bufalo
const updateBuffalo = async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const id = req.params.id;
            const parsedData = updateBuffaloSchema.parse(req.body);      
            const buffalo = await buffaloService.Update(id, parsedData);      
            res.status(200).json({ buffalo }); // Cod. 200 (OK)
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

// Listar uma uníca Bufalo
const getOneBuffalo = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)) {
            const id = req.params.id
            const buffalo = await buffaloService.getOne(id)
            if (!buffalo){
                res.sendStatus(404); // Cod. 404 (Not Found)
            } else {
                res.status(200).json({ buffalo }) // Cod. 200 (OK)
            }
        } else {
            res.sendStatus(400); // Cod. 400 (Bad Request)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Cod. 500 (Internal Server Error)
    }
};

export default { getAllBuffalos, createBuffalo, deleteBuffalo, updateBuffalo, getOneBuffalo };