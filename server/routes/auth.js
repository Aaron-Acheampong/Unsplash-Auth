import express from "express";
import { handleRefreshToken, register ,login, logout} from "../controllers/auth.js";

const router = express.Router();

// REGISTER USER ROUTE
router.post("/register", register);

// LOGIN USER ROUTE
router.post("/login", login);

// LREFRESH USER ROUTE
router.get("/refresh", handleRefreshToken);

// LOGOUT ROUTE
router.post("/logout", logout);

export default router;