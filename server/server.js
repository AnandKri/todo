const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {Pool} = require('pg')

dotenv.config()

const port = process.env.SERVER_PORT
const app = express()

const pool = new Pool({
    user: process.env.PG_USERNAME,
    host: process.env.PG_SERVER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
})

app.use(cors())
app.use(express.json())

// POST
app.post("/todo", async (req,res)=>{
    const {description, status} = req.body
    const query = 'INSERT INTO todo (description, status) VALUES ($1, COALESCE($2, $3)) RETURNING *;'
    const values = [description, status, "Pending"]
    try {
        const result = await pool.query(query, values)
        res.status(201).json({
            message: 'Task added successfully',
            data: result.rows[0]
        })
    } catch (error) {
        console.log('Error inserting the task:', error)
        res.status(500).send('server error')
    }
})

// GET
app.get("/todo", async (req,res)=>{
    try {
        const query = 'SELECT * FROM todo;'
        const result = await pool.query(query)
        res.status(200).json(result.rows)
    } catch (error) {
        console.log('Error fetching the tasks:', error)
        res.status(500).send('server error')
    }
})

// DELETE
app.delete("/todo/:id", async (req,res)=>{
    try {
        const {id} = req.params
        const query = 'DELETE FROM todo WHERE todo_id = $1'
        values = [id]
        const result = await pool.query(query, values)
        res.status(200).json({
            data:result,
            message: 'Task deleted successfully'
        })
    } catch (error) {
        console.log('Error deleting the task:', error)
        res.status(500).send('server error')
    }
})

// PUT
app.put("/todo/:id", async (req,res)=>{
    try {
         const {description, status} = req.body
         const {id} = req.params
         const query = 'UPDATE todo SET description = $1, status = $2 WHERE todo_id = $3 RETURNING *;'
         const values = [description, status, id]
         const result = await pool.query(query, values)
         res.status(200).json({
            message: 'Task updated successfully',
            data: result.rows[0]
         })    
    } catch (error) {
        console.log('Error editing the task:', error)
        res.status(500).send('server error')
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})