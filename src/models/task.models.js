const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String
});

TaskSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Task', TaskSchema);
