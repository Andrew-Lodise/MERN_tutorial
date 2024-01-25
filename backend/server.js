// import-like js statements
require("dotenv").config()
const express = require("express")
const workout_routes = require("./routes/workouts")
const mongoose = require("mongoose")

// creating express app
const app = express()

// middlewear, must do this before interacting with a request
app.use(express.json())
app.use( (request, response, next) => {
    console.log(request.path, request.method)
    next()
})

// routes
app.use("/api/workouts", workout_routes)

app.get("/", (request, response) => {
    response.json({msg: "home url"})
})

//
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to db and listening on port 3008.")
        })
    })
    .catch((error) => {
        console.log(error)
    })
