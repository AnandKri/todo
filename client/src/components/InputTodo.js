import React, {useState} from "react";
import ListTodos from "./ListTodos";
// require('dotenv').config()

const InputTodo = () => {

    const [description, setDescription] = useState(null)
    const [status, setStatus] = useState(null)
    const [update, setUpdate] = useState(-1)
    const Port = process.env.SERVER_PORT || 5000

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if(description){
            try {
                const body = {description, status}
                const response = await fetch(`http://localhost:${Port}/todo`,{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body: JSON.stringify(body)
                })
                console.log(response)
            } catch (error) { 
                console.error(error.message)
            }
        }
        setDescription("")
        setStatus(null)
        setUpdate(update*-1)
    }

    return (
        <>
            <h1 className="text-center mt-5">PERN Todo List</h1>
            <form className="d-flex mx-5" onSubmit={onSubmitForm}>
                <input value={description} onChange={e => setDescription(e.target.value)} type="text" className="form-control" placeholder="Input Task Name"/>
                {/* <input value={status} onChange={e => setStatus(e.target.value)} type="text" className="form-control" placeholder="Input Task Status"/> */}
                <select onChange={e => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input value="Add" className="btn btn-success" type="submit"/>
            </form>
            <ListTodos update={update}/>
        </>
    )
}

export default InputTodo