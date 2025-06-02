const joi = require('joi');
const validationNewUser = joi.object({
    name: joi.string().required(),  
    lastname: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

const updateValidationUser = joi.object({
    name: joi.string(),  
    lastname: joi.string(),
    email: joi.string().email(),
    password: joi.string()
});
module.exports = {validationNewUser, updateValidationUser};