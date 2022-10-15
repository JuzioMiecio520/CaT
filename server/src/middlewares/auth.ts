import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import minimatch from "minimatch";
import createError from "../utils/createError";

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
    }
  }
}

export default async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;

  if (!auth)
    return createError(res, 401, {
      code: "no_auth",
      message: "No Authorization header provided",
      type: "authentication",
    });

  const [type, token] = auth.split(" ");

  if (type !== "Key")
    return createError(res, 401, {
      code: "invalid_token_type",
      message: 'Invalid token type, expected "Key <token>"',
      type: "authentication",
    });
  if (!token)
    return createError(res, 401, {
      code: "no_token",
      message: "No token has been provided in the Authorization header",
      type: "authentication",
    });

  const user = await req.prisma.user.findUnique({ where: { token } });

  if (!user)
    return createError(res, 401, {
      code: "invalid_token",
      message: "Invalid token",
      type: "authentication",
    });

  req.user = user;
  next();
}

export function checkPermissions(permission: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const perms = req.user.permissions;

    if (perms.includes("*") || perms.includes(permission)) return next();

    for (const p of perms) {
      if (minimatch(p, permission)) return next();
    }

    createError(res, 403, {
      code: "no_permission",
      message: "You do not have permissions to access this resource",
      type: "authentication",
      details: {
        required: permission,
        available: perms,
      },
    });
  };
}
