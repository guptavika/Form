const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Prevent duplicate emails
  },
  password: {
    type: String,
    required: true
  }
});

const FormDataModel = mongoose.model('FormData', FormDataSchema);

module.exports = FormDataModel;
