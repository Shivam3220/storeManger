import mongoose from "mongoose";
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  product: {
    type: String,
    required: true,
    unique: true,
  },
  mrp: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  available: {
    type: Number,
    require: true,
  },
  caseSize: {
    type: Number,
    default:1
  },
});

mongoose.models = {};
module.exports = mongoose.model("stock", stockSchema);
