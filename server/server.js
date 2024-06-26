const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require ('cors')

const {v4: uuidv4} = require ('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.get('/todos/:userEmail', async (req, res) => {
    console.log(req)
    const {userEmail} = req.params
    console.log('todoss', req.body)

    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(todos.rows)
    }
    catch (err) {
        console.error(err)
        if (err) {
            res.json({detail: err.detail})
        }
    }
})


// create a new todo
app.post('/todos', async (req, res) => {
    const{user_email, title, progress, date} = req.body
    console.log('todo', req.body)
    console.log(user_email, title, progress, date)
    const id = uuidv4()
    try {
       const newtoDo = await pool.query('INSERT INTO todos (id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)', [id, user_email, title, progress, date])
        res.json(newtoDo)
    }
    catch (err) {
        console.error(err)
    }
})


// edit a todo
app.put('/todos/:id', async (req, res) => {
    const {id} = req.params
    const {user_email, title, progress, date} = req.body
    try {
        const editTodo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5', [user_email, title, progress, date, id])
        res.json(editTodo)
        console.log(user_email, title, progress, date)
    }
    catch (err) {
        console.error(err)
    }
})

// delete todo item
app.delete('/todos/:id', async (req, res) => {
    const {id} = req.params
    try {
        const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1', [id])
        res.json(deleteTodo)
    }
    catch (err) {
        console.error(err)
    }
})


//Signup
app.post('/signup', async (req, res) => {
    const {email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    try {
        const signup = await pool.query('INSERT INTO users (email, hashed_passwords) VALUES($1, $2)', [email, hashedPassword])
        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

        res.json({email, token})

    }
    catch (err) {
        console.error(err)
        if(err) {
            res.json({detail: err.detail})
        }
    }
})



//Login
app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (!users.rows.length) {
            return res.json({detail: 'User does not exist!'})
        }
        const response = await bcrypt.compare(password, users.rows[0].hashed_passwords)

        const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
        if (response) {
            res.json({'email': users.rows[0].email, token})
        }
        else {
            res.json({detail: 'Login failed!'})
        }
    }
    catch (err) {
        console.error(err)
    }
})


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))