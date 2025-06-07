const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, updateUser, deleteUser, verifyUser } = require('./controler');
const { auth } = require('../../middlewares/auth');
const baseroute = '/users';   
// Define the base route for user operations               
router.get(baseroute, auth, getAllUsers);
router.post(baseroute, auth, createUser);
router.patch(baseroute + '/:id', auth, updateUser);
router.delete(baseroute + '/:id', auth, deleteUser);
router.post(baseroute + '/verify', verifyUser);

module.exports = router;