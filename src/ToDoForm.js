import React, { useState } from 'react';

const ToDoForm = ({ addTask }) => {

    const [ userInput,  setUserInput ] = useState('');
    const [ userStartInput,  setUserStartInput ] = useState('');
    const [ userEndInput,  setUserEndInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }
    const handlestartChange = (e) => {
        setUserStartInput(e.currentTarget.value)
    }
    const handleendChange = (e) => {
        setUserEndInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput, userStartInput, userEndInput);
        setUserInput("");
        setUserStartInput("");
        setUserEndInput("");
    }
    
    return (
        <div className='containerform'>
            <form onSubmit={handleSubmit}>
            <input className='textbox' value={userInput} type="text" onChange={handleChange} placeholder="Class Name"/>
            <input className='textbox' value={userStartInput} type="text" onChange={handlestartChange} placeholder="Start Time"/>
            <input className='textbox' value={userEndInput} type="text" onChange={handleendChange} placeholder="End Time"/>
            <button className='submittbtn'>Add</button>
            </form>
        </div>
        
    );
};

export default ToDoForm;