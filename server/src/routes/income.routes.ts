import { Router } from "express";
import { setIncome } from "../controllers/income.controller";


const incomeRouter = Router();


incomeRouter.route("/setIncome").post(setIncome);



export default incomeRouter;