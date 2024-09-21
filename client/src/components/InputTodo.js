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
        <div className="py-10 px-5 text-center">
            <h1 className="font-mono text-4xl font-bold tracking-tight text-center py-5 text-green-800">Todo Application</h1>
            <div className="text-center block">
            <form className="flex mr-auto ml-auto w-1/2" onSubmit={onSubmitForm}>
                <input value={description} onChange={e => setDescription(e.target.value)} type="text" className="mx-2 form-control" placeholder="Input Task Name"/>
                <select className="mx-2 rounded-md px-3 bg-green-800 text-white" onChange={e => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input value="Add" className="mx-2 btn btn-success  bg-green-800 text-white" type="submit"/>
            </form>
            </div> 
            <ListTodos update={update}/>
        </div>
    )
}

export default InputTodo