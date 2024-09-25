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
            {/* <h1 className="font-mono text-4xl font-bold tracking-tight text-center py-5 text-green-800">Todo Application</h1> */}
            <div className="mx-auto border-red-900 border-1 block md:w-1/2 w-64">Todo Application</div>
            {/* <div className="border-red-900 border-1 mx-auto"> */}
            <form className="border-red-900 border-1 mx-auto md:w-1/2 block w-64" onSubmit={onSubmitForm}>  
                <input value={description} onChange={e => setDescription(e.target.value)} type="text" className="border-red-900 border-1 form-control md:w-1/2  md:inline-block" placeholder="Input Task Name"/>
                
                {/* <div className="inline-block"> */}
                {/* <select className="border-x-red-900 border-4 mx-2 rounded-md px-3 bg-green-800 text-white" onChange={e => setStatus(e.target.value)}> */}
                <select className="border-red-900 border-1 rounded-md md:inline-block" onChange={e => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                {/* <input value="Add" className="border-x-red-900 border-4 mx-2 px-3 btn btn-success  bg-green-800 text-white" type="submit"/> */}
                <input value="Add" className="border-red-900 border-1 btn btn-success md:inline-block" type="submit"/>
                {/* </div> */}
            </form>
            {/* </div>  */}
            <ListTodos update={update}/>
        </div>
    )
}

export default InputTodo