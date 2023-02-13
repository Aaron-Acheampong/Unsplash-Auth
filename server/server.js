import express from "express";
import postRoutes from "./routes/posts.js";
//import authRoutes from "./routes/auth.js";
//import cookieParser from "cookie-parser";
import cors from 'cors';
import { sequelize }  from "./model/db.js";

sequelize.sync().then(() => { 
    console.log('Connection / Syncing to Database Successful.....DB IS READY!!!!!');
}).catch((err) => {
    console.log("Error Syncing / Connecting to Database!!!");
});

const app = express();

app.use( cors({ origin: '*', }) );

app.use(express.json());
//app.use(cookieParser());
//app.use("/api/posts", postRoutes);
//app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


app.listen(5000, ()=>{
    console.log("Connected!!");
});