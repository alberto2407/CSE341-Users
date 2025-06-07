const Joi = require('joi');

const validationNewTask = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required()
}); 

const updateValidationTask = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string()
});

module.exports = {  validationNewTask, updateValidationTask };