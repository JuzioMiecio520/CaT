import { NextFunction, Request, Response, Router } from "express";
import { z } from "zod";
import checkAuth, { checkPermissions } from "../../middlewares/auth";
import createError from "../../utils/createError";
import createResponse from "../../utils/createResponse";
import { removeProps } from "../../utils/masker";
import { createId, randomString } from "../../utils/misc";
import { validate } from "../../utils/schema";

const router = Router();

router.post(
  "/create",
  checkAuth,
  checkPermissions("cat.users.manage.create"),
  validate(
    z.object({
      username: z.string(),
      permissions: z.array(z.string()).optional(),
    })
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, permissions } = req.body;

    if ((await req.prisma.user.count({ where: { username } })) > 0)
      return createError(res, 409, {
        code: "user_already_exists",
        message: "A user with this username already exists",
        type: "validation",
      });

    await req.prisma.user
      .create({
        data: {
          id: await createId("user"),
          token: randomString(48),
          username,
          password: randomString(8),
          requirePasswordChange: true,
          createdAt: new Date(),
          permissions: permissions || [],
        },
      })
      .then((user) => {
        createResponse(res, 201, removeProps(user, ["token"]));
      })
      .catch((err) => {
        console.log(err);
        // TODO: better handle errors, not always throw 500
        createError(res, 500, {
          code: "internal_server_error",
          message: "An internal server error occurred",
          type: "internal",
        });
      });
  }
);

router.delete(
  "/",
  checkAuth,
  checkPermissions("cat.users.manage.delete"),
  validate(
    z.object({
      id: z.string().min(1).startsWith("user_"),
    })
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;

    if (id === req.user.id)
      return createError(res, 400, {
        code: "delete_self",
        message: "You cannot delete yourself",
        type: "validation",
      });

    const user = await req.prisma.user.findUnique({ where: { id } });

    if (!user)
      return createError(res, 404, {
        code: "not_found",
        message: "The user does not exist",
        type: "validation",
      });

    if (user.username === "admin")
      return createError(res, 400, {
        code: "delete_admin",
        message: "You cannot delete the admin user",
        type: "validation",
      });

    req.prisma.user
      .delete({ where: { id } })
      .then(() => createResponse(res, 201, { deleted: true }))
      .catch(() => {
        // TODO: better handle errors, not always throw 500
        createError(res, 500, {
          code: "internal_server_error",
          message: "An internal server error occurred",
          type: "internal",
        });
      });
  }
);

export default router;
