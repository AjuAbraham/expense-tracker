import mongoose,{Schema} from "mongoose";
import { UserFields } from "./user.model";

interface incomeDocument {
    userId: UserFields;
    source:string;
    ammount:number;
    category:string;
    date:Date;
    description:string;
}


const incomeSchema:Schema<incomeDocument> =  new Schema({
   userId:{
    type: Schema.Types.ObjectId,
    ref: "User"
   },
   source:{
    type:String,
    required:true,
    trim:true
   },
   ammount:{
    type:Number,
    required:true,
   },
   category:{
    type:String,
    required:true,
    index:true
   },
   date:{
    type:Date,
    required:true,
   },
   description:{
    type:String,
    required:true
   }
   
},{timestamps:true});



export const Income = mongoose.model<incomeDocument>("Income",incomeSchema);