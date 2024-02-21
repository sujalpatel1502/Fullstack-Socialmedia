import { Button } from '@mui/material'
import React, { useState } from 'react'

const Todo = () => {
    const [finaltodo,setfinalTodo]=useState([]);
    const [todo,setTodo]=useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const handlechange=(e)=>{
        console.log(e.target.value);
        setTodo(e.target.value)
    }
    const handlesubmit=()=>{
            setfinalTodo([...finaltodo,todo]);
            setTodo("");
    }
    const deletItemm=(idd)=>{
            // console.log("iddddddd",id);
            const newTodo=finaltodo.filter((item,id)=>id != idd)
            setfinalTodo(newTodo)
    }
    const editItem = (id) => {
        setEditIndex(id);
        setEditValue(finaltodo[id]);
    };

    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };

    const saveEdit = (id) => {
        const updatedTodo = [...finaltodo];
        updatedTodo[id] = editValue;
        setfinalTodo(updatedTodo);
        setEditIndex(null);
        setEditValue('');
    };
    console.log("dataaaaaaa of todo",finaltodo);
  return (
    <div>
        <input type='text' onChange={handlechange} value={todo}/>
        <Button onClick={handlesubmit}>Done</Button>



        {
            finaltodo.map((item,id)=>{
                return(
                    <div>
                    <h1>{item}</h1>
                    <Button onClick={() => deletItemm(id)}>Delete</Button>
                    {/* <Button onClick={() => editItemm(id)}></Button> */}
                    </div>
                )
            })
        }
       
        {/* {finaltodo.map((item, id) => (
                <div key={id}>
                    {editIndex === id ? (
                        <>
                            <input type='text' value={editValue} onChange={handleEditChange} />
                            <Button onClick={() => saveEdit(id)}>Save</Button>
                        </>
                    ) : (
                        <>
                            <h1>{item}</h1>
                            <Button onClick={() => deletItemm(id)}>Delete</Button>
                            <Button onClick={() => editItem(id)}>Edit</Button>
                        </>
                    )}
                </div>
            ))} */}
    </div>
  )
}

export default Todo