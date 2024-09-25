import React,{useState, useEffect} from "react";
// require('dotenv').config()

const ListTodos = ({update}) => {

    const [result, setResult] = useState(null)
    const [render, setRender] = useState(null) 
    const [editMode, setEditMode] = useState(null)
    const [updatedData, setUpdatedData] = useState({description:'',status:''})

    const handleEdit = (todo_id, description, status) => {
        setEditMode(todo_id)
        setUpdatedData({description, status})
    }

    useEffect(()=>{
        const getTasks = async () => {
            try {
                const Port = process.env.SERVER_PORT || 5000
                const result = await fetch(`http://localhost:${Port}/todo`)
                const data = await result.json()
                setResult(data)
                setRender(update)
            } catch (error) { 
                console.log(`Error while getting tasks: ${error.message}`)
                return error
            }
        }
        getTasks()
    },[update, render])

    async function handleDelete(id){
        try {
            const Port = process.env.SERVER_PORT || 5000
            const result = await fetch(`http://localhost:${Port}/todo/${id}`,{
                method:"DELETE"
            })
            const data = await result.json()
            console.log(data.data)
            setRender(render*(-1))
            return data
        } catch (error) {
            console.log(`Error while deleting tasks: ${error.message}`)
            return error
        }
    }

    async function handleUpdate(id){
        try {
            // const body = {updateddescription, updatedstatus}
            const Port = process.env.SERVER_PORT || 5000
            const response = await fetch(`http://localhost:${Port}/todo/${id}`,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(updatedData)
            })
            const data = await response.json()
            console.log(data)
            setRender(render*(-1))
            setEditMode(null)
        } catch (error) {
            console.log(`Error while updating tasks: ${error.message}`)
            return error
        }
    }

    return (
        <>
        {/* <h1 className="font-mono text-4xl font-bold tracking-tight text-center py-5 text-green-800">List of Tasks</h1> */}
        <h1 className="mx-auto border-red-900 border-1 block md:w-1/2 w-64">List of Tasks</h1>
        <ul>
            {result && result.map((data)=>(
                <li  key={data.todo_id}>
                    {editMode === data.todo_id ? (
                        <>
                        {/* <div className="flex flex-row w-3/4 mx-auto my-4"> */}
                        <div className="md:grid md:grid-cols-2 md:gap-2 mx-auto border-red-900 border-1 w-72 md:w-3/4">
                            <div className="border-red-900 border-1">
                            <span>
                                Description : 
                                <input
                                    // className="text-left basis-2/5"
                                    className=""
                                    type="text"
                                    name="description"
                                    value={updatedData.description}
                                    onChange={(e)=>{setUpdatedData({...updatedData,[e.target.name]:e.target.value})}}
                                />
                            </span>
                            <span className="block">
                                Status :
                                <input
                                    // className="text-left basis-2/5"
                                    className=""
                                    type="text"
                                    name="status"
                                    value={updatedData.status}
                                    onChange={(e)=>{setUpdatedData({...updatedData,[e.target.name]:e.target.value})}}
                                />
                            </span>
                            </div>
                            <div className="md:my-auto border-red-900 border-1">
                            <button className="border-red-900 border-1 mx-2 px-4 py-2 bg-green-800 text-white rounded" onClick={()=>{handleUpdate(data.todo_id)}}>Save</button>
                            <button className="border-red-900 border-1 mx-2 px-4 py-2 bg-green-800 text-white rounded" onClick={()=>{setEditMode(null)}}>Cancel</button>
                            </div>
                        </div>
                        {/* <hr class="w-3/4 mx-auto h-px bg-gray-200 border-0 dark:bg-gray-700"/> */}
                        <hr className="w-72 md:w-3/4 mx-auto h-px bg-gray-200 border-0 dark:bg-gray-700"/>
                        </>
                    ) : (
                        <>
                        {/* <div className="flex flex-row w-3/4 mx-auto my-4"> */}
                        <div className="md:grid md:grid-cols-2 md:gap-2 mx-auto border-red-900 border-1 w-72 md:w-3/4">
                        
                            {/* <span className="text-left basis-2/5"> */}
                            <div className="border-red-900 border-1">
                            <span className="">
                                Description : {data.description}
                            </span>

                            <span className="block">
                                Status : {data.status}
                            </span>
                            </div>

                            <div className="md:my-auto border-red-900 border-1">

                                {/* <button className="inline-block mx-2 px-4 py-2 bg-green-800 text-white rounded" onClick={() => handleEdit(data.todo_id, data.description, data.status)}>Edit</button> */}
                                <button className="border-red-900 border-1 mx-2 px-4 py-2 bg-green-800 text-white rounded" onClick={() => handleEdit(data.todo_id, data.description, data.status)}>Edit</button>
                                
                                <button className="border-red-900 border-1 mx-2 px-4 py-2 bg-green-800 text-white rounded" onClick={() => handleDelete(data.todo_id)}>Delete</button>
                            
                            </div>
                        
                        {/* <strong className="font-mono text-xl tracking-tight text-left">Description :</strong> {data.description}
                        <strong>Status :</strong> {data.status}
                        <button onClick={() => handleEdit(data.todo_id, data.description, data.status)}>Edit</button>
                        <button onClick={() => handleDelete(data.todo_id)}>Delete</button> */}
                        </div>
                        <hr className="w-72 md:w-3/4 mx-auto h-px bg-gray-200 border-0 dark:bg-gray-700"/>
                        </>
                    )}
                </li>
            ))}
        </ul>
        </>
    )
}

export default ListTodos