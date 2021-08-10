import {useTodos} from "../../hooks/useTodos";
import {Todo} from "./todo/Todo";
import {useMemo, useState} from "react";
import "./todos.scss"
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Select} from "../select/select";

export const Todos = () => {
    const [title, setTitle] = useState('')
    const {deleteTodo, createTodo, todos, putTodo} = useTodos()

    const [filter, setFilter] = useState("All")
    const filteredTodos = useMemo(() => {
        if (filter === "Completed") {
            return todos.filter(todo => todo.completed)
        }
        if (filter === "Not completed") {
            return todos.filter(todo => !todo.completed)
        }
        return todos
    }, [todos, filter])
    return (
        <div className="container">
            <div className="form__wrapper">
                <form className="form__group" onSubmit={e => e.preventDefault()}>
                    <div className="form__group__input">
                        <input id="title" className="form__field" placeholder="Title" name="title" required
                               value={title}
                               onChange={e => setTitle(e.target.value)}/>
                        <label htmlFor="title" className="form__label">Title</label>
                        <Select filter={filter} setFilter={setFilter}/>
                    </div>
                    <button className="form__button" onClick={() => {
                        createTodo(title)
                        setTitle('')
                    }}>Add
                    </button>
                </form>
            </div>
            <TransitionGroup className="todos__container">
                {filteredTodos.map(todo =>
                    <CSSTransition key={todo._id} timeout={500} classNames="todo__wrapper">
                        <Todo todo={todo} putTodo={putTodo} deleteTodo={deleteTodo}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

