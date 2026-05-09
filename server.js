const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Goal = require('./models/Goal');

const app = express();
app.use(express.json());
app.use(cors());

// THE SUBSTANCE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("--- SYSTEM NOTIFY: ATLAS CLUSTER ACCESSED ---"))
  .catch(err => console.log("--- ERROR ---", err));

app.post('/confer', async (req, res) => {
    try {
        const newGoal = new Goal();
        const savedGoal = await newGoal.save();
        res.status(201).json({ message: "GOAL OFFICIALLY RECOGNIZED", data: savedGoal });
    } catch (err) {
        res.status(500).json({ error: "MATRIX GLITCH" });
    }
});

app.get('/verify', async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

// THE DUAL-CROWN LOGIC
// This allows the app to be used by Vercel's serverless engine
module.exports = app;

// This forces Render to find an open port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`--- XAVIER: SINGULARITY ACTIVE ON PORT ${PORT} ---`);
});