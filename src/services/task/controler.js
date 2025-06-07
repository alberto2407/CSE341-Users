const TasksModel = require('../../models/task.models');
const mongoose = require('mongoose');
const {validationNewTask, updateValidationTask} = require('./validation');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await TasksModel.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching taks:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !description || !status) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newTask = new TasksModel({ title, description, status });
        const savedTask = await newTask.save();

        res.status(201).json(savedTask);

    } catch (error) {
        console.error('Error fetching taks:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const updateTask = async (req, res) => {
    try {
        const {id} = req.params;
        const isValidId = mongoose.Types.ObjectId.isValid(id);

        if (!isValidId) {
        return res.status(400).json({message: 'id not valid'});
        }

        const objectId = new mongoose.Types.ObjectId(id);
        const {error, value} = updateValidationTask.validate(req.body);

        if (error) {
        return res.status(400).json({message: error.details[0].message});
        }
        const {title, description, status} = value;

        const updateTask = {} 

        if (title) {
            updateTask.title = title;
        }
        if (description) {
            updateTask.description = description;
        }
        if (status) {
            updateTask.status = status;
        }

        const taskExistsAlready = await TasksModel.findOne({_id: objectId});

        if (!taskExistsAlready) {
            return res.status(400).json({message: 'Task does not exist'});
        }

        const task = await TasksModel.updateOne({_id: objectId}, updateTask);
        res.json(task);

    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const deleteTask = async (req, res) => {
        try {
            const {id} = req.params;
            const isValidId = mongoose.Types.ObjectId.isValid(id);
            if (!isValidId) {
                return res.status(400).json({message: 'id is not valid'});
            }
            const objectId = new mongoose.Types.ObjectId(id);
            const taskExistsAlready = await TasksModel.findOne({_id: objectId});
            if (!taskExistsAlready) {
                return res.status(400).json({message: 'Task does not exist'});
            }
    
            const task = await TasksModel.deleteOne({_id: objectId});
            res.json(task);
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({message: 'Internal server error'});
        } 
}

module.exports = {getAllTasks, createTask, updateTask, deleteTask};