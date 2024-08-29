import { Router } from "express";
import { setExpense } from "../controllers/expense.controller";


const expenseRouter = Router();


expenseRouter.route("/setExpense").post(setExpense);



export default expenseRouter;