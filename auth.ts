import { Request, Response, NextFunction } from "express";

interface UserPermissions {
  canDelete: boolean;
  canUpdate: boolean;
}

function getUserPermissions(userId: string): UserPermissions {
  let permissions: UserPermissions;
  // Lógica para verificar as permissões do usuário
  switch (userId) {
    case "user":
      permissions = { canDelete: false, canUpdate: false };
      break;
    case "supervisor":
      permissions = { canDelete: false, canUpdate: true };
      break;
    case "root":
      permissions = { canDelete: true, canUpdate: true };
      break;
    default:
      permissions = { canDelete: false, canUpdate: false };
      break;
  }
  // Retorne um objeto UserPermissions com as permissões corretas
  return permissions;
}

const checkUserPermissions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userPermissionId = req.headers["user-id"] as string; // Ou qualquer outro método para obter o ID do usuário
  const userPermissions = getUserPermissions(userPermissionId);

  // Verificar as permissões necessárias para o endpoint específico
  if (req.path === "/users" && !userPermissions.canDelete) {
    return res
      .status(403)
      .json({ error: "User is not allowed to delete users." });
  }

  if (req.path === "/users" && !userPermissions.canUpdate) {
    return res
      .status(403)
      .json({ error: "User does not have permission to update users" });
  }

  // Se todas as permissões forem válidas, chame next() para passar para a próxima função de middleware
  next();
};

export default checkUserPermissions;
