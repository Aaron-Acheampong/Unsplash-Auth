import { User } from "../model/Users.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { ROLES_LIST } from "../config/roles_list.js";

dotenv.config();







/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// REFRESH TOKEN CONTROLLER /////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    //check if there cookies with jwt properties
    if(!cookies?.jwt) return res.sendStatus(401);
    
    const refreshToken = cookies.jwt;

    //Find user with refreshToken captured
    const user = User.findOne({ 
        where: {
            Refreshtoken: refreshToken
        }
    });

    if (!user) return res.sendStatus(403); // forbidden
    //evaluate jwt
   jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if (err || user.Username !== decoded.username) return res.sendStatus(403);

        const roles = [];
        if (user.Roles === ROLES_LIST.Admin) {
            roles = [ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User];
        } else if (user.Roles === ROLES_LIST.Editor) {
            roles = [ROLES_LIST.Editor, ROLES_LIST.User];
        } else {
            roles = [ROLES_LIST.User];
        }

        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": user.Username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '900s' }
        );
        res.json({ accessToken });
    }
   )
    
};
//----------------------------------------------------------------------------------------------------------------------/





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// REGISTER CONTROLLER /////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const register = async (req, res) => {
    //get req body
    const { username, email, password } = req.body;

    //check if request body is valid or not empty
    if(!username || !email || !password) return res.status(400).json({'message': 'Username and password are required.'});

    //check if user already exists
    const user = await User.findAll({ 
        where: { 
            [Op.or]: [
                {Username: { [Op.like]: `%${username}%` }},
                {Email: { [Op.like]: `%${email}%` }}
        ]
    }
    });

    if (user.length) return res.sendStatus(409).json({'message': "User already exists!!"});

    try {
        //encrypt password
        const salt = bcrypt.genSaltSync(10);
        const hash =  bcrypt.hashSync(password, salt);
        //create user
        await User.create({ username, email, hash});
        //response
        return res.sendStatus(201).json({"message": "User Registered successfully."});
    } catch (err) {
        res.sendStatus(500).json({'message': err.message});
    }
    
};
//----------------------------------------------------------------------------------------------------------------------/





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////// LOGIN CONTROLLER ///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const login = async (req, res) => {
    const { username, email, password } = req.body;
    //check if request body is valid or not empty
    if(!username || !email || !password) return res.sendStatus(400).json({'message': 'Username and password are required.'});

    //Find user with credentials
    const user = await User.findOne({ 
        where: { 
            [Op.or]: [
                {Username: { [Op.like]: `%${username}%` }},
                {Email: { [Op.like]: `%${email}%` }}
        ]
    }
    });

    if (!user) return res.sendStatus(401).json({'message': "User Unauthorized."});

    //evaluate password
    const match = bcrypt.compareSync(password, user.Password)

    const roles = [];
    if (match) {
        if (user.Roles === ROLES_LIST.Admin) {
            roles = [ROLES_LIST.Admin, ROLES_LIST.Editor, ROLES_LIST.User];
        } else if (user.Roles === ROLES_LIST.Editor) {
            roles = [ROLES_LIST.Editor, ROLES_LIST.User];
        } else {
            roles = [ROLES_LIST.User];
        }

        //create JWTs
        const accessToken = jwt.sign(
            {
                "userInfo": {
                    "username": user.Username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '900s' }
        );

        const refreshToken = jwt.sign(
            {"username": user.Username},
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        //update user refresh token
        await User.update({ Refreshtoken: refreshToken }, {
            where: {
              Username: username,
              Email: email
            }
          });

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', Secure: true, maxAge: 24 * 60 * 60 * 100});  
        res.sendStatus(200).json({ accessToken })
    } else {
        res.sendStatus(401);
    }
    
};
//---------------------------------------------------------------------------------------------------------------//






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////// LOGOUT CONTROLLER ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const logout = async (req, res) => {
    // Get Cookies as they come in
    const cookies = req.cookies;
    //check if there cookies with jwt properties
    if(!cookies?.jwt) return res.sendStatus(204); // No content
  
    const refreshToken = cookies.jwt;

    //Is refresh token in DB?
    const user = User.findOne({ 
        where: {
            Refreshtoken: refreshToken
        }
    });
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.sendStatus(204); 
    }

    // Delete refresh token in DB
    await User.update({ Refreshtoken: '' }, {
        where: {
          Username: user.Username,
          Email: user.Email
        }
    });

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', Secure: true }); // secure: true - only serves on https
    res.sendStatus(204);
    
};
//-----------------------------------------------------------------------------------------------------------//