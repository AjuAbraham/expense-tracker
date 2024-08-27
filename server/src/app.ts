import express, { Response,Request } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HttpError } from "http-errors";
import userRouter from "./routes/user.routes";

dotenv.config();

export const app = express();

app.use(
  cors({
    origin: process.env.PORT,
  })
);
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));


//routes


app.use("api/users",userRouter);





app.use((err: HttpError, _:Request,res: Response) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message|| "Something went wrong",
    success:false,
  });
});
