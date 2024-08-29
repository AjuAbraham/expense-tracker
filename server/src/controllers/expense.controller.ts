import { Expense } from "../models/expense.model";
import createHttpError from "http-errors";
import {Request,Response,NextFunction} from 'express';


const setExpense = async (req:Request,res:Response,next:NextFunction)=>{
    
    try {
        const {title,amount,category,date,description} = req.body;
        if(!title|| !amount|| !category|| !date|| !description){
            const err = createHttpError(400,"All fields are required");
            next(err);
        }
        const prevExpense = await Expense.findOne({title});
        if(prevExpense){
            const err = createHttpError(400,"Expense Already exsist");
            next(err);
        }
        const parsedDate = new Date(date);

        
        if (isNaN(parsedDate.getTime())) {
          return next(createHttpError(400, "Invalid date format"));
        }

        const expense = await Expense.create({
            title,
            amount,
            category,
            date:parsedDate,
            description,
            userId: req.user?._id
        })
        await expense.save();
        
        const checkExpense = await Expense.findById({_id:expense._id});
        if(!checkExpense){
            const err = createHttpError(500,"Unable to create Expense");
            next(err);
        }
        res.status(200).json({
            success:true,
            checkExpense,
            message:"Expense created successfully"
        })

    } catch (error) {
        if(error instanceof Error){
            console.log("Error occured while setting income");
            const err = createHttpError(500,error.message);
            next(err);
        }
    }

}




export {setExpense}