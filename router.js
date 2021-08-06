import Router from "express"
import TodoController from "./controllers/TodoController.js";
import AuthController from "./controllers/AuthController.js";
import {check} from "express-validator";
import authMiddleware from "./middleware/authMiddleware.js";


const router = new Router()

router.post("/todos", authMiddleware, TodoController.createTodo)
router.get("/todos", authMiddleware, TodoController.getAllTodo)
router.put("/todos/:id", authMiddleware, TodoController.updateTodo)
router.delete("/todos/:id", authMiddleware, TodoController.deleteTodo)
router.post("/login", AuthController.loginUser)
router.post("/registration", [
    check('username', "Username must be more than 6 and less than 17 characters").isLength({min: 6, max: 17}),
    check('password', "Password must be more than 7 and less than 15 characters").isLength({min: 7, max: 15}),

], AuthController.registerUser)
router.post("/logout", AuthController.logoutUser)
router.get("/refresh", AuthController.refreshToken)

export default router