import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id: 1, text: "Hello World!"}]
}

export const todoSlice = createSlice({
    name: 'ToDo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id != action.payload)
        },
        editTodo: (state, action) => {
            const todoIndex = state.todos.findIndex((todo) => todo.id != action.payload.id)
            state.todos[todoIndex].text = action.payload.text
        },

    }
})

export const {addTodo, removeTodo, editTodo} = todoSlice.actions

export default todoSlice.reducer