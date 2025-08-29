const express = require('express')
const app = express()

//Import Routes file
const authRouter = require('./routers/auth.Routes')
const taskRouter = require('./routers/task.Routes')
const ConnectDB = require('./config/db')
const PORT = process.env.PORT ||4000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
ConnectDB
app.get('/', (req, res) => {
    res.send("hey")
})

//use of routes file
app.use('/auth', authRouter)
app.use('/task',taskRouter)

app.listen(PORT, () => {
    console.log("4000 PORT is Listening");

})