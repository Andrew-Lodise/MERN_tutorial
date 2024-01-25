const { request, response } = require("express")
const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

// get all workouts
const getWorkouts = async (request, response) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    response.status(200).json(workouts)
}

// get single workout
const getSingleWorkout = async (request, response) => {
    const { id } = request.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        response.status(404).json({error:"workout not found"})
    }
    const workout = await Workout.findById(id)

    if (!workout){
        return response.status(404).json({error: "workout not found"})
    }

    response.status(200).json({workout })
}

// create  a workout
const createWorkout = async (request, response) => {
    const {title, load, reps} = request.body

    // add doc to db
    try{
        const workout = await Workout.create({title, load, reps})
        response.status(200).json(workout)
    } catch (error) {
        response.status(400).json({error: error.message})
    }
 } 

// delete a workout
const deleteWorkout = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        response.status(404).json({error:"workout not found"})
    } 

    const workout = await Workout.findOneAndDelete({_id:id})
    if (!workout) {
        return response.status(400).json({msg: "workout not found"})
    }

    response.status(200).json(workout)
 }

// update a workout
const updateWorkout = async (request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        response.status(404).json({error:"workout not found"})
    } 

    const workout = await Workout.findOneAndUpdate({_id:id}, {
        ...request.body
    })

    if (!workout) {
        return response.status(400).json({msg: "workout not found"})
    }

    response.status(200).json(workout)
}

module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}