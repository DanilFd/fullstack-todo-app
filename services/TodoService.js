import Todo from "../models/Todo.js";
import {ApiError} from "../exceptions/apiError.js";

class TodoService {
    async createTodo(todo, id) {
        return Todo.create({...todo, owner: id})
    }

    async getAllTodo(id) {
        return Todo.find({owner: id})
    }

    async updateTodo(id) {
        if (!id) {
            throw ApiError.BadRequest("Id not found")
        }
        const todo = await Todo.findById(id)
        todo.completed = !todo.completed
        return todo.save()
    }

    async deleteTodo(id, ownerId) {
        if (!id || !ownerId) {
            throw new Error("id not found")
        }
        return Todo.findByIdAndDelete({_id: id, owner: ownerId})
    }
}

export default new TodoService()