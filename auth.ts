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
    case "manager":
      permissions = { canDelete: true, canUpdate: false };
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
  /**
   * Autenticação API Key
   * ---------------------
   * key: user-id
   * value: "user";"supervisor";"manager";"root"
   */
  const userPermissionId = req.headers["user-id"] as string;
  const userPermissions = getUserPermissions(userPermissionId);

  // Verificar as permissões necessárias para o endpoint ou método
  if (
    req.path === "/users" &&
    !userPermissions.canDelete &&
    !userPermissions.canUpdate
  ) {
    return res
      .status(403)
      .json({ error: "user does not have update and delete permissions" });
  }

  if (req.method === "DELETE" && !userPermissions.canDelete) {
    return res
      .status(403)
      .json({ error: "User is not allowed to delete users." });
  }

  if (req.method === "PUT" && !userPermissions.canUpdate) {
    return res
      .status(403)
      .json({ error: "User does not have permission to update users" });
  }

  // Se todas as permissões forem válidas, chama o next() para passar para a próxima função de middleware
  next();
};

export default checkUserPermissions;
