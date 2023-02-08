import mongoose from "mongoose";
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  item: {
    type: String,
    required: true,
    unique: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    require: true,
  },
  available: {
    type: Number,
    require: true,
  },
});

mongoose.models = {};
module.exports = mongoose.model("stock", stockSchema);
