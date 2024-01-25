// express import
const express = require("express")
const {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
    
} = require("../controllers/workoutControler")

//creating a router?
const router = express.Router()

// GET all workouts
router.get("/", getWorkouts)

// Get a single workout
router.get("/:id", getSingleWorkout)

// POST a workout
router.post("/", createWorkout )

// DELETE a workout
router.delete("/:id", deleteWorkout)

// UPDATE a workout
router.patch("/:id", updateWorkout)

module.exports = router