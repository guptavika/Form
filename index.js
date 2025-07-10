const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const FormDataModel = require('./FormData.js');

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/practice_mern', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB with Mongoose');

  // Start server **only when DB connected**
  app.listen(3001, () => {
    console.log("✅ Server listening on http://127.0.0.1:3001");
  });
})
.catch((err) => {
  console.error('❌ Could not connect to MongoDB', err);
});

// ✅ Register route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await FormDataModel.findOne({ email: email });
    if (user) {
      return res.json({ message: "Already registered" });
    }

    const newUser = new FormDataModel({
      name,
      email,
      password
    });

    await newUser.save();
    res.json({ message: "Registration successful", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await FormDataModel.findOne({ email: email });

    if (!user) {
      return res.json({ message: "No records found!" });
    }

    if (user.password === password) {
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Wrong password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
