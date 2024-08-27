import { Router } from "express";
import { upload } from "../middlewares/multer";
import { userLogin, userRegisteration } from "../controllers/user.controller";

const userRouter = Router();



userRouter.route("/register").post(upload.single("avatar"),userRegisteration);
userRouter.route("/login").post(userLogin);





export default userRouter;