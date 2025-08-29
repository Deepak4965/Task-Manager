const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const { jwtAuthMiddleware } = require('../utils/jwt')

// List my tasks
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userPayload.id })
        res.status(200).json(tasks)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server Error" })
    }
})

// Create Task
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const { title, dueDate } = req.body;
        const newtask = new Task({
            title,
            dueDate,
            user: req.userPayload.id
        })

        await newtask.save()
        res.status(200).json(newtask)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server Error" })
    }
})

// Update task
router.put('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const { title, dueDate, completed } = req.body;

        const response = await Task.findByIdAndUpdate(
            { _id: req.params.id, user: req.userPayload.id },
            { $set: { title, dueDate, completed } },
            { new: true }
        )

        if (!response) {
            return res.status(404).json({ error: "response not updated" })
        }

        console.log("Updated");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

// Delete task
router.delete('/:id', jwtAuthMiddleware, async (req, res) => {
    try {
        const deleted = await Task.findByIdAndDelete({ _id: req.params.id, user: req.userPayload.id })

        if (!deleted) return res.status(404).json({ error: "Task not found" })

        console.log("Deleted");
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
})

module.exports = router

