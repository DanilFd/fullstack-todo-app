import React from 'react';
import {Todo as TodoType} from "../../../types/Todo";
import "./todo.scss"

type Props = {
    todo: TodoType,
    deleteTodo: (id: string) => void
    putTodo: (id: string) => void
}

export const Todo = ({todo, deleteTodo, putTodo}: Props) => {
    return (
        <div className="todo__wrapper">
            <p onClick={() => putTodo(todo._id)} className={`todo__title ${todo.completed && "completed"}`}>{todo.title}
                    <button disabled={todo.disabled} onClick={e => {
                        deleteTodo(todo._id)
                        e.stopPropagation()
                    }} className="close">×
                    </button>
            </p>
        </div>
    );
};

