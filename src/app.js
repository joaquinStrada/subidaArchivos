const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

// capturar body
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// importing routes
const router = require('./routes/router')

// middelwares
app.use('/', router)

// static files
app.use(express.static(path.join(__dirname, 'public')))

// initializaition on the server
app.listen(port, () => {
    console.log('server on port', port)
})