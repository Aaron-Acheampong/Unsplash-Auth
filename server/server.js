import express from "express";
import postRoutes from "./routes/posts.js";
import path from 'path';
//import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { sequelize }  from "./model/db.js";
import corsOptions from "./config/corsOptions.js";
import verifyJWT from "./controllers/verifyJWT.js";
import { credentials } from "./controllers/credentials.js";

/////////////////////////////////////////////////////////////////////////////////
////////////////// Sync with DB ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
sequelize.sync().then(() => { 
    console.log('Connection / Syncing to Database Successful.....DB IS READY!!!!!');
}).catch((err) => {
    console.log("Error Syncing / Connecting to Database!!!");
});
////////////////-------------------------------------------///////////////////////

//server initialization
const app = express();

const PORT = process.env.PORT || 5000;

///////////ACCESS AND REFRESH TOKEN .env/////////////////////
////require('crypto').randomBytes(64).toString('hex')///////
////////////////////////////////////////////////////////////


/// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin resource Sharing
app.use( cors({ origin: '*', }) );
//app.use(cors(corsOptions));

//built-in middleware to handle urlecoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// midlleware for cookies
app.use(cookieParser());

//static files path
//app.use(express.static(path.join(__dirname, '/public')));

/// welcome middleware
app.use((req, res, next) => {
    console.log(`${req.method}  ${req.path}  ${req.url}`);
    next();
});

//AUTH PATHS
app.use("/api/auth", authRoutes);

//POSTS PATHS
app.use(verifyJWT);
app.use("/api/posts", postRoutes);

// APP LISTENER
app.listen(PORT, ()=>{
    console.log(`Connected!!...Server Listening on port ${PORT}`);
});