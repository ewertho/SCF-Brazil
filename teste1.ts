import { Request, Response } from "express";
import { fakeData } from "./fakeData";

interface User {
  name: string;
}

const getUser = (req: Request, res: Response) => {
  var name = req.query.name;
  //busca usuário com mesmo nome na base de dados
  //caso a procura de erro por não existir o usuário devolve com código 404 e mensagem de usuário não encontrado
  //caso de erro na conexão com o banco devolve erro de servidor com código 500
  try {
    const user = fakeData.find((user: User) => user.name === name);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", erro: error });
  }
};

const getUsers = (req: Request, res: Response) => {
  //busca todos os usuários na base de dados
  //preocupação: erro na consulta tratado com trycatch
  //caso não tenha registro na consulta retorna um objeto com array vazio
  try {
    res.json(fakeData);
  } catch (error) {
    res.status(500).json({ message: "Server error", erro: error });
  }
};

export { getUser, getUsers };
