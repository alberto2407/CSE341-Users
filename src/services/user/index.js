const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, updateUser, deleteUser, verifyUser } = require('./controler');

const baseroute = '/users';                  
router.get(baseroute, getAllUsers);
router.post(baseroute, createUser);
router.patch(baseroute + '/:id', updateUser);
router.delete(baseroute + '/:id', deleteUser);
router.post(baseroute + '/verify', verifyUser);

module.exports = router;