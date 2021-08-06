import TodoService from "../services/TodoService.js";

class TodoController {
    async createTodo(req, res) {
        try {
            if (!req.body.title) {
                return res.status(400).json({message: "title can't be empty"})
            }
            const todo = await TodoService.createTodo(req.body, req.user.id)
            res.status(201).json({message: "todos was created", todo})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    async getAllTodo(req, res) {
        try {
            const todos = await TodoService.getAllTodo(req.user.id)
            res.json(todos)
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    async updateTodo(req, res) {
        try {
            const todo = await TodoService.updateTodo(req.params.id)
            res.json({message: "todos was updated", todo})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    async deleteTodo(req, res) {
        try {
            const deletedTodo = await TodoService.deleteTodo(req.params.id, req.user.id)
            if (!deletedTodo) {
                res.status(404).json({message: "Todo not found"})
            }
            res.status(200).json({message: "Todo was deleted"})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

}

export default new TodoController()