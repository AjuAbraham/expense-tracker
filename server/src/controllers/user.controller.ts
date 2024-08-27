import { NextFunction,Request,Response } from "express";
import { User } from "../models/user.model";
import createHttpError from "http-errors";

const userRegisteration = async (req:Request,res:Response,next:NextFunction) =>{
    const {firstName,lastName,email,password} = req.body;
    if(!firstName||!lastName||!email||!password){
        const error = createHttpError(400,"All fields are required");
        return next(error);
    }
}
const userLogin = async (req:Request,res:Response,next:NextFunction) =>{
    const {email,password} = req.body;
}

export {userRegisteration,userLogin};