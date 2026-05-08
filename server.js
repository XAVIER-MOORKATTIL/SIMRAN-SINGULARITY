const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Goal = require('./models/Goal');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("--- SYSTEM NOTIFY: ATLAS CLUSTER ACCESSED ---"))
  .catch(err => console.log("--- ERROR ---", err));

// THE GENIUS INJECTION ROUTE
app.post('/confer', async (req, res) => {
    try {
        const newGoal = new Goal();
        const savedGoal = await newGoal.save();
        res.status(201).json({
            message: "GOAL OFFICIALLY RECOGNIZED",
            data: savedGoal
        });
    } catch (err) {
        res.status(500).json({ error: "MATRIX GLITCH" });
    }
});

// THE VERIFICATION ROUTE
app.get('/verify', async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

// THE VERCEL SERVERLESS EXPORT (The Override)
module.exports = app;

// LOCAL EXECUTION (Only runs if not in Vercel)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`--- XAVIER: SINGULARITY ACTIVE ON PORT ${PORT} ---`);
    });
}