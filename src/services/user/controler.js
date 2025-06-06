const UserModel = require('../../models/user.models');
const validator = require("email-validator");
const mongoose = require('mongoose');
const {validationNewUser, updateValidationUser} = require('./validation');
const { verifyToken } = require('../../config/firebase');

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const createUser = async (req, res) => {
    try {
        const {error, value} = validationNewUser.validate(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        const {name, lastname, email, password} = value;

        if (!validator.validate(email)) {
            return res.status(400).json({message: 'Email not valid'});
        }

        const userExistsAlready = await UserModel.findOne({email});
        if (userExistsAlready) {
            return res.status(400).json({message: 'User already exists'});
        }

        const user = await UserModel.create({name, lastname, email, password});
        res.json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) {
        return res.status(400).json({message: 'id not valid'});
        }
        const objectId = new mongoose.Types.ObjectId(id);
        const {error, value} = updateValidationUser.validate(req.body);
        if (error) {
        return res.status(400).json({message: error.details[0].message});
        }
        const {name, lastname, email, password} = value;

        const updateUser = {} 

        if (name) {
            updateUser.name = name;
        }
        if (lastname) {
            updateUser.lastname = lastname;
        }
        if (email) {
            if (validator.validate(email)) {
            updateUser.email = email;
            } else {
                return res.status(400).json({message: 'Email not valid'});
            }   
        }
        if (password) {
            updateUser.password = password;
        }

        const userExistsAlready = await UserModel.findOne({_id: objectId});
        if (!userExistsAlready) {
            return res.status(400).json({message: 'User does not exist'});
        }

        const user = await UserModel.updateOne({_id: objectId}, updateUser);
        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        if (!isValidId) {
            return res.status(400).json({message: 'id is not valid'});
        }
        const objectId = new mongoose.Types.ObjectId(id);
        const userExistsAlready = await UserModel.findOne({_id: objectId});
        if (!userExistsAlready) {
            return res.status(400).json({message: 'User does not exist'});
        }

        const user = await UserModel.deleteOne({_id: objectId});
        res.json(user);
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({message: 'Internal server error'});
    } 
}

const verifyUser = async (req, res) => {
    try {
        const {token} = req.body;
        if (!token) {
        return res.status(400).json({message: 'token not found'});
        }
        const decoded = await verifyToken({token});
        res.json({email: decoded.email});
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = { 
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    verifyUser
};