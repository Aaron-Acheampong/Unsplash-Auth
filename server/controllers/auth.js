import { sequelize }  from "../model/db.js";
import { Users } from "../model/Users.js";
//import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res)=>{
    //CHECK EXISTING USER
    // const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    // db.all(q, [req.body.email], (err, data)=>{
    //     if(err) return res.json(err);
    //     if(data.length) return res.status(409).json("User already exists!!");

    //     //Hash the password and create a user
    //     const salt = bcrypt.genSaltSync(10);
    //     const hash = bcrypt.hashSync(req.body.password, salt);

    //     const q = "INSERT INTO users(`email`, `password`) VALUES (?,?)";
    //     const values = [
    //         req.body.email,
    //         hash
    //     ];

    //     db.run(q, [values], (err, data)=>{
    //         if(err) return res.json(err);
    //         return res.status(200).json("User has been created.");
    //     });
    // });
    console.log("Registering new User!!!!!")
    await Users.create(req.body);
    return res.send("User Registered!!!");
};

export const login = (req, res)=>{
    //CHECK USER
    // const q = "SELECT * FROM users WHERE email = ?";
    // db.run(q, [req.body.email], (err, data)=>{
    //     if(err) return res.json(err);
    //     if(data.length === 0) return res.status(404).json("User not found!");

    //     //CHECK PASSWORD
    //     const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)

    //     if(!isPasswordCorrect) return res.status(400).json("Wrong username or pasword!");

    //     const token = jwt.sign({id:data[0].id}, "jwtkey");
    //     const {password, ...other} = data[0];

    //     res.cookie("access_token", token, {
    //         httpOnly: true,
    //         sameSite: 'None,
    //         maxAge: 24 * 60 * 60 * 1000
    //     }).status(200).json(other);
        
    // });
};

export const logout = (req, res)=>{
    // res.clearCookie("access_token", {
    //     samesite:"None",
    //     secure:true
    // }).status(200).json("User has been logged out.");
};