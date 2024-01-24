require("dotenv").config()
const express = require("express")

// creating express app
const app = express()

// middlewear, must do this before interacting with a request
app.use( (request, response, next) => {
    console.log(request.path, request.method)
    next()
})

// rout handler to react to get requests
app.get("/", (request, response) => {
    response.json({msg: "welcome to the app bro"})
})

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("listening on port 3008!")
})
