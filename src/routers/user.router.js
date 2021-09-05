import { Router } from "express";
import { UserController } from "../controllers"
const userRouter = Router();

userRouter.get("/register", UserController.renderRegister);

userRouter.post('/register', UserController.register);

export default userRouter;