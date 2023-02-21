import express from "express";
import { getPosts, addPosts, deletePost } from "../controllers/posts.js";
import { verifyRoles } from "../controllers/VerifyRoles.js";
import { ROLES_LIST } from "../config/roles_list.js";
const router = express.Router();

// GET POSTS ROUTE
router.get("/", getPosts);

// ADD POST ROUTE
router.post("/add", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), addPosts);

//DELETE POST ROUTE
router.delete("/:id", verifyRoles(ROLES_LIST.Admin), deletePost);


export default router;