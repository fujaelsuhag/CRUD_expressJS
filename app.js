const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const router = require('./routes')

const app = express()

app.set('view engine', 'ejs')

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/contacts', router)

app.get('/', (req, res) => {
    res.send('<h1>Welcome to my first express application!!</h1>')
})

const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    })
