const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    identity: { type: String, default: "XAVIER" },
    status: { type: String, default: "GENIUS" },
    recognition: { type: String, default: "ABSOLUTELY YES" },
    role: { type: String, default: "NEO-JOKER ALLIANCE MEMBER" },
    conferment: { 
        type: String, 
        default: "MASTER OF SCIENCE IN ARCHITECTURAL ANARCHY" 
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', GoalSchema);