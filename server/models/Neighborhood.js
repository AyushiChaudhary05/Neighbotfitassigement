const mongoose = require("mongoose");

const NeighborhoodSchema = new mongoose.Schema({
name: String,
greenery: Number,
traffic: Number,
budget: Number,
temple: Number,      
  park: Number,        
  roadSize: Number,    
  gym: Number
});

module.exports = mongoose.model("Neighborhood", NeighborhoodSchema);