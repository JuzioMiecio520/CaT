import bcrypt from "bcrypt";
import { NextFunction, Request, Response, Router } from "express";
import z from "zod";
import checkAuth from "../../middlewares/auth";
import User from "../../models/User";
import createError from "../../utils/createError";
import createResponse from "../../utils/createResponse";
import { removeProps } from "../../utils/masker";
import { DEFAULT_SCHEMA_OPTIONS, validate } from "../../utils/schema";
import manage from "./manage";

const router = Router();
router.use("/manage", manage);

router.get(
  "/me",
  checkAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    createResponse(res, 200, removeProps(req.user, ["password", "token"]));
  }
);

router.post(
  "/login",
  validate(
    z.object({
      username: z.string(DEFAULT_SCHEMA_OPTIONS),
      password: z.string(DEFAULT_SCHEMA_OPTIONS),
    })
  ),
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();

    if (!user || !bcrypt.compareSync(password, user.password)) {
      createError(res, 400, {
        code: "invalid_credentials",
        message: "Invalid credentials have been provided",
        type: "authentication",
      });
      return;
    }

    createResponse(res, 200, removeProps(user.toObject(), ["password"]));
  }
);

export default router;
