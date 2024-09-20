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
        <h1 className="text-center mt-5">List of Tasks</h1>
        {/* <div>{console.log(result)}</div> */}
        <ul>
            {result && result.map((data)=>(
                <li key={data.todo_id}>
                    {editMode === data.todo_id ? (
                        <div>
                            <input
                                type="text"
                                name="description"
                                value={updatedData.description}
                                onChange={(e)=>{setUpdatedData({...updatedData,[e.target.name]:e.target.value})}}
                            />
                            <input
                                type="text"
                                name="status"
                                value={updatedData.status}
                                onChange={(e)=>{setUpdatedData({...updatedData,[e.target.name]:e.target.value})}}
                            />
                            <button onClick={()=>{handleUpdate(data.todo_id)}}>Save</button>
                            <button onClick={()=>{setEditMode(null)}}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                        <strong>Description :</strong> {data.description}
                        <strong>Status :</strong> {data.status}
                        <button onClick={() => handleEdit(data.todo_id, data.description, data.status)}>Edit</button>
                        <button onClick={() => handleDelete(data.todo_id)}>Delete</button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
        </>
    )
}

export default ListTodos