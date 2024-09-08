import React, {useState} from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {description, status}
            const response = await fetch(`http://localhost:3000/todo`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(body)
            })
            console.log(response)
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            <h1 className="text-center mt-5">PERN Todo List</h1>
            <form className="d-flex mx-5" onSubmit={onSubmitForm}>
                <input value={description} onChange={e => setDescription(e.target.value)} type="text" className="form-control" placeholder="Input Task Name"/>
                <input value={status} onChange={e => setStatus(e.target.value)} type="text" className="form-control" placeholder="Input Task Status"/>
                <button className="btn btn-success">Add</button>
            </form>
        </>
    )
}

export default InputTodo