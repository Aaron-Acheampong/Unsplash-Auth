//import { sequelize } from "../model/db.js";
import { Posts } from "../model/Posts.js";
//import jwt from "jsonwebtoken";
import { Op } from "sequelize";


export const getPosts = async (req, res)=>{
    // const q = req.query.desc 
    // ? "SELECT * FROM posts WHERE desc LIKE %?%" 
    // : "SELECT * FROM posts";

    // db.all(q, [req.query.desc], (err, data)=>{
    //     if(err) return res.status(500).send(err);

    //     return res.status(200).json(data);
    // });
    console.log("LOADING PICTURES!!!!!")
    if (req.query.label === '') {
        const data = await Posts.findAll({
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json(data);
    }

    //const data = await Posts.findOne({ where: { label: req.query.label}});
    const data = await Posts.findAll({ 
        where: { label: { [Op.like]: `%${req.query.label}%` }},
        order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(data);


};

export const addPosts = async (req, res)=>{
    // const token = req.cookies.access_token;
    // if(!token) return res.status(401).json("Not Authenticated!!");

    // jwt.verify(token, "jwtkey", (err, userInfo)=>{
    //     if(err) return res.status(403).json("Token is not valid!!");

    //     const q = "INSERT INTO posts(`desc`, `url`, `date`, `uid`) VALUES (?)";
    //     const values = [
    //         req.body.desc,
    //         req.body.url,
    //         req.body.date,
    //         userInfo.id
    //     ];

    //     db.run(q, [values], (err, data)=>{
    //         if(err) return res.status(500).json(err);

    //         return res.json("Post has been created!!");
    //     });
    // });

    console.log("UPLOADING NEW PICTURE!!!!!")
    await Posts.create(req.body);
    return res.send("Post has been added");
   
};


export const deletePost = async (req, res)=>{
//     const token = req.cookies.access_token;
//     if(!token) return res.status(401).json("Not Authenticated!!");

//     jwt.verify(token, "jwtkey", (err, userInfo)=>{
//         if(err) return res.status(403).json("Token is not valid!!");

//         const postId = req.params.id;
//         const q = "DELETE FROM posts WHERE `id` = ?";

//         db.run(q, [postId], (err, data)=>{
//             if(err) return res.status(403).json("You can delete only your post!!");

//             return res.json("Post has been deleted!!");
//         });
//     });


    console.log("DELETING PICTURE!!!!!")
    await Posts.destroy({ where: { id: req.params.id}});
    return res.json("Post has been deleted!!");

 };