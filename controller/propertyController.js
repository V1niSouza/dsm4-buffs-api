import { createPropertySchema, updatePropertySchema } from "../dtos/property.dto.js";
import propertyService from "../services/propertyService.js";
import { ObjectId } from "mongodb";

// Lista todas Propriedades
const getAllPropertys = async (req, res) => {
  try {
    const propertys = await propertyService.getAll();
    return res.status(200).json({ propertys: propertys }); // Cod. 200 (OK)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor. " }); // Cod. 500 (Internal Server Error)
  }
};

// Criar uma nova Propriedade
const createProperty = async (req, res) => {
  try {
    // Validando os dados recebidos
    const parsedData = createPropertySchema.parse(req.body);
    // Se passou na validação, prossegue com o processo de criação
    await propertyService.Create(parsedData);
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

// Deletar uma Propriedade
const deleteProperty = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      await propertyService.Delete(id);
      res.sendStatus(204); // Cod. 204 (No Content)
    } else {
      res.sendStatus(400); // Cod. 400 (Bad Request)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." }); // Cod. 500 (Internal Server Error)
  }
};

// Atualizar uma Propriedade
const updateProperty = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const parsedData = updatePropertySchema.parse(req.body);
      const property = await propertyService.Update(id, parsedData);
      res.status(200).json({ property }); // Cod. 200 (OK)
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

// Listar uma uníca Propriedade
const getOneProperty = async (req, res) => {
  try {
    if (ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const property = await propertyService.getOne(id);
      if (!property) {
        res.sendStatus(404); // Cod. 404 (Not Found)
      } else {
        res.status(200).json({ property }); // Cod. 200 (OK)
      }
    } else {
      res.sendStatus(400); // Cod. 400 (Bad Request)
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500); // Cod. 500 (Internal Server Error)
  }
};

export default {
  getAllPropertys,
  createProperty,
  deleteProperty,
  updateProperty,
  getOneProperty,
};
