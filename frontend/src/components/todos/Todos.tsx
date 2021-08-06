import {useTodos} from "../../hooks/useTodos";
import {Todo} from "./todo/Todo";
import {useState} from "react";
import "./todos.scss"
import {CSSTransition, TransitionGroup} from "react-transition-group";

export const Todos = () => {
    const [title, setTitle] = useState('')
    const {deleteTodo, createTodo, todos, putTodo} = useTodos()
    return (
        <div className="container">
            <div className="form__wrapper">
                <form className="form__group" onSubmit={e => e.preventDefault()}>
                    <input id="title" className="form__field" placeholder="Title" name="title" required value={title}
                           onChange={e => setTitle(e.target.value)}/>
                    <label htmlFor="title" className="form__label">Title</label>
                    <button className="form__button" onClick={() => {
                        createTodo(title)
                        setTitle('')
                    }}>Создать
                    </button>
                </form>
            </div>
            <TransitionGroup className="todos__container">
                {todos.map(todo =>
                    <CSSTransition key={todo._id} timeout={500} classNames="todo__wrapper">
                        <Todo todo={todo} putTodo={putTodo} deleteTodo={deleteTodo}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

