import createHttpError from "http-errors";
import { Income } from "../models/income.model";
import {Request,Response,NextFunction} from 'express';


const setIncome = async (req:Request,res:Response,next:NextFunction)=>{
    
    try {
        const {source,amount,category,date,description} = req.body;
        if(!source|| !amount|| !category|| !date|| !description){
            const err = createHttpError(400,"All fields are required");
            next(err);
        }
        const prevIncome = await Income.findOne({source});
        if(prevIncome){
            const err = createHttpError(400,"Income Already exsist");
            next(err);
        }
        const parsedDate = new Date(date);

        
        if (isNaN(parsedDate.getTime())) {
          return next(createHttpError(400, "Invalid date format"));
        }

        const income = await Income.create({
            source,
            amount,
            category,
            date:parsedDate,
            description,
            userId: req.user?._id
        })
        await income.save();
        
        const checkIncome = await Income.findById({_id:income._id});
        if(!checkIncome){
            const err = createHttpError(500,"Unable to create Income");
            next(err);
        }
        res.status(200).json({
            success:true,
            checkIncome,
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




export {setIncome}