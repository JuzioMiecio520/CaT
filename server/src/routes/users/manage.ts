import { NextFunction, Request, Response, Router } from "express";
import checkAuth, { checkPermissions } from "../../middlewares/auth";
import createResponse from "../../utils/createResponse";

const router = Router();

router.post(
  "/create",
  checkAuth,
  checkPermissions("cat.users.manage.create"),
  async (req: Request, res: Response, next: NextFunction) => {
    createResponse(res, 200, {
      // TODO: finish this route
      message: "TODO: Create user",
    });
  }
);

export default router;
