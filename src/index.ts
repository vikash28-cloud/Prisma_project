import express,{Express,Request,Response} from "express";
const app:Express = express();




app.listen(3000,()=>{
    console.log("Server is running on port http://localhost:3000");
})