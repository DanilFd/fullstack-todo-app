import {api} from "../http";

export const getTodosApi = () => {
    return api.get("/todos")
}
export const postTodoApi = (title: string) => {
    return api.post('/todos', {title})
}
export const putTodoApi = (id: string) => {
    return api.put(`/todos/${id}`)
}
export const deleteTodoApi = (id: string) => {
    return api.delete(`/todos/${id}`)
}