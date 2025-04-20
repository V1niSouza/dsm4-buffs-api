import buffaloService from "../services/buffaloService.js";
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
    try{
        const {tag, nome, sexo, maturidade, raca, tagPai, tagMae, localizacao, grupo, atividade, zootecnico, sanitario} = req.body;
        await buffaloService.Create(tag, nome, sexo, maturidade, raca, tagPai, tagMae, localizacao, grupo, atividade, zootecnico, sanitario);
        res.sendStatus(201); // Cod. 201 (Created)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Erro interno do servidor."}) // Cod. 500 (Internal Server Error)
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
    try{
        if(ObjectId.isValid(req.params.id)){
            const id = req.params.id;
            const {tag, nome, sexo, maturidade, raca, tagPai, tagMae, localizacao, grupo, atividade, zootecnico, sanitario} = req.body;
            const buffalo = await buffaloService.Update(id, tag, nome, sexo, maturidade, raca, tagPai, tagMae, localizacao, grupo, atividade, zootecnico, sanitario);
            res.status(200).json({ buffalo }); // Cod. 200 (OK)
        } else {
            res.sendStatus(400); // Cod. 400 (Bad request)
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500); // Cod. 500 (Internal Sever Error)
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