'use client';
import { useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react'
const TodoApp = () => {
  const [animationParent] = useAutoAnimate()
    const [todos, setTodos ] = useState([
        {id:1, text: 'Read a book'},
        {id:2, text: 'Swim'},
        {id:3, text: 'Work'}
    ])
    const [inputText, setInputText] = useState('')
    const [editedText, setEditedText] = useState('');
    const [editMode, setEditedMode] = useState(null);
    const addTodo = (e) => {
        e.preventDefault();
        if (inputText == ' ' || inputText == '' ) {
            alert('input doesnt be null')
            setInputText('')
            return
        }
        if(inputText.trim() !== '') {
            const isExisitingTodo = todos.some((todo) => todo.text === inputText)
            if(isExisitingTodo) {
                alert('This todo is already exists')
                setInputText('')
                return;
            }
        }
        const newTodo = {
            id: todos.length + 1,
            text: inputText
        }
        setTodos([...todos,newTodo]);
        setInputText('')
    }
    const deleteTodo = (id) => {
        const updateTodo = todos.filter((todo) => todo.id !== id)
        setTodos(updateTodo)
    }
    const editTodo = (id) => {
        setEditedMode(id)
        const todoToEdit = todos.find(todo => todo.id === id);
        if(todoToEdit) {
            setEditedText(todoToEdit.text)
        }
    }
    const saveEditedTodo = () => {
        const updateTodo = todos.map(todo => todo.id === editMode ? {...todo, text:editedText} : todo);
        setTodos(updateTodo)
        setEditedMode(null)
    }
    return (
        <div className="container">
            <h2 className="mb-4 text-2xl font-bold">
                TodoApp
            </h2>
            <div className="flex mb-4">
            <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="p-2 border border-gray-500 rounded"
                type="text"
                placeholder='Add todo ...' />
        <button
        onClick={addTodo}
        className={` px-4 py-2 text-white
        bg-blue-500 rounded`}>Add</button>
        </div>
        <ul ref={animationParent}>
        {todos.map((todo) => (
            <div className="flex mb-2">
            <li className="mb-2 p-2 mr-3 border-b-2 w-full" key={todo.id}>{todo.text}</li>
            {editMode === todo.id ? (
                <>
                    <input 
                        type="text" 
                        onChange={(e) => setEditedText(e.target.value)}
                        value={editedText}
                        className='p-2 border border-gray-500 rounded' />
                    <button onClick={saveEditedTodo} className={`px-4 py-2
        text-white bg-orange-500 rounded`}>Save</button>
                </>
            ) : (
                <>
                    <button
                        onClick={() => editTodo(todo.id)}
                        className={`px-4 py-2
    text-white bg-blue-500 rounded mr-2`}>Edit</button>
                    <button
                        onClick={() => deleteTodo(todo.id)}
                        className={`px-4 py-2
        text-white bg-red-500 rounded`}>Delete</button>
                </>
            )}
            </div>
            ))}
        </ul>
        </div>
    )
}

export default TodoApp