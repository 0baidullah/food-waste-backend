import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String },
},

{ 
  timestamps: true,
});

const City = mongoose.model("City", citySchema);
export default City;