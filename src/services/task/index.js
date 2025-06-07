const express = require('express');
const router = express.Router();
const {getAllTasks, createTask, updateTask, deleteTask} = require('./controler');
const baseroute = '/tasks';   
// Define the base route for user operations               
router.get(baseroute, getAllTasks);
router.post(baseroute, createTask);
router.patch(baseroute + '/:id', updateTask);
router.delete(baseroute + '/:id', deleteTask);

module.exports = router;