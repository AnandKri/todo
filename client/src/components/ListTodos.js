import React,{useState, useEffect} from "react";
// require('dotenv').config()

const ListTodos = ({update}) => {

    const [result, setResult] = useState(null)
    const [render, setRender] = useState(null)
    
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

    return (
        <>
        <h1 className="text-center mt-5">List of Tasks</h1>
        <div>{console.log(result)}</div>
        <ul>
            {result && result.map((data)=>(
                <li key={data.todo_id}>
                    <div>
                        <strong>Description :</strong> {data.description}
                        <strong>Status :</strong> {data.status}
                        <button onClick={() => handleDelete(data.todo_id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
        </>
    )
}

export default ListTodos