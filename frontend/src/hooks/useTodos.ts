import {useCallback, useEffect, useState} from "react";
import {Todo} from "../types/Todo";
import {deleteTodoApi, getTodosApi, postTodoApi, putTodoApi} from "../services/TodosSrvice";


export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const getTodos = useCallback(() => {
        setLoading(true)
        getTodosApi()
            .then(res => setTodos(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        let isMounted = true
        getTodosApi()
            .then(res => {
                if (isMounted) {
                    setTodos(res.data)
                }
            })
        return () => {
            isMounted = false
        }
    }, [setTodos])

    const deleteTodo = useCallback((id: string) => {
        setLoading(true)
        deleteTodoApi(id)
            .then(() => {
                setTodos(todos.filter(el => el._id !== id))
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [todos])

    const createTodo = useCallback((title: string) => {
        setLoading(true)
        postTodoApi(title)
            .then(getTodos)
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [getTodos])

    const putTodo = useCallback((id: string) => {
        setLoading(true)
        putTodoApi(id)
            .then(getTodos)
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [getTodos])

    return {deleteTodo, createTodo, putTodo, todos, isLoading, error}
}

