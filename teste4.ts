import { fakeData } from "./fakeData";
import { Request, Response } from "express";

const updateUser = (req: Request, res: Response) => {
  const { id } = req.query;
  const { name, job } = req.body;

  try {
    // Busca usuário para atualização
    const user = fakeData.find((d) => d.id === id);

    if (!user) {
      // Verifica se o usuário não foi encontrado
      return res.status(404).json({ error: "User not found" });
    }
    // Verifica se os campos estão preenchidos e adiciona ao usuário
    user.name = !String(name) ? user.name : name;
    user.job = !String(job) ? user.job : job;

    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", erro: error });
  }
};

export default updateUser;
