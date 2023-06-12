import { fakeData } from "./fakeData";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";

const addUser = (req: Request, res: Response) => {
  const { name, job } = req.body;

  if (!name || !job) {
    // Verifica se name e job são fornecidos no corpo da requisição
    return res.status(400).json({ error: "Name and job are required" });
  }
  //inseri um id randômico em hexadecimal ao usuário adicionado
  let id = uuidv4();
  const newUser = { id, name, job };
  //inseri usuário na base de dados
  //caso de erro na conexão com o banco devolve erro de servidor com código 500
  try {
    fakeData.push(newUser);
    return res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", erro: error });
  }
};

export default addUser;
