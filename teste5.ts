import { fakeData } from "./fakeData";
import { Request, Response } from "express";

const getUserReadCount = (req: Request, res: Response) => {
  const { name } = req.query;

  const user = fakeData.find((d) => d.name === name);

  if (!user) {
    // Verifica se o usuário não foi encontrado
    return res.status(404).json({ error: "User not found" });
  }
  let umarray: any[] = [];

  const userReadCount = user.readCount || 0;

  return res.send(`Usuário ${name} foi lido ${userReadCount} vezes.`);
};

export default getUserReadCount;
