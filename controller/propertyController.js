import propertyService from "../services/propertyService.js";
import { ObjectId } from "mongodb";

// Lista todas Propriedades
const getAllPropertys = async (req, res) => {
    try {
      const propertys = await propertyService.getAll();
      return res.status(200).json({ propertys: propertys });    // Cod. 200 (OK)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro interno do servidor. "}); // Cod. 500 (Internal Server Error)
    }
  };

// Criar uma nova Propriedade
const createProperty = async (req, res) => {
    try{
        const {nome, finalidade, endereco, responsavel} = req.body;
        await propertyService.Create(nome, finalidade, endereco, responsavel);
        res.sendStatus(201); // Cod. 201 (Created)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Erro interno do servidor."}) // Cod. 500 (Internal Server Error)
    }
};

// Deletar uma Propriedade
const deleteProperty = async (req, res) => {
        try{
            if(ObjectId.isValid(req.params.id)){
                const id = req.params.id
                await propertyService.Delete(id)
                res.sendStatus(204) // Cod. 204 (No Content)
            } else {
                res. sendStatus(400) // Cod. 400 (Bad Request)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro interno do servidor.' }) // Cod. 500 (Internal Server Error)
        }
};

// Atualizar uma Propriedade
const updateProperty = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id;
            const {nome, finalidade, endereco, responsavel} = req.body;
            const property = await propertyService.Update(id, nome, finalidade, endereco, responsavel);
            res.status(200).json({ property }); // Cod. 200 (OK)
        } else {
            res.sendStatus(400); // Cod. 400 (Bad request)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Cod. 500 (Internal Sever Error)
    }
};

// Listar uma uníca Propriedade
const getOneProperty = async (req, res) => {
    try{
        if(ObjectId.isValid(req.params.id)) {
            const id = req.params.id
            const property = await propertyService.getOne(id)
            if (!property){
                res.sendStatus(404); // Cod. 404 (Not Found)
            } else {
                res.status(200).json({ property }) // Cod. 200 (OK)
            }
        } else {
            res.sendStatus(400); // Cod. 400 (Bad Request)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500) // Cod. 500 (Internal Server Error)
    }
};

export default { getAllPropertys, createProperty, deleteProperty, updateProperty, getOneProperty };