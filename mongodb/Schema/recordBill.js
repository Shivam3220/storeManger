import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var d = new Date();
d.setUTCHours(0, 0, 0, 0)
// const nDate = new Date().toLocaleString('en-US', {
//     timeZone: 'Asia/Calcutta'
//     });
    

const recordsSchema = new Schema({
  buyer: {
    type: String,
    default:"cash",
    required: true
  },
  billNo: {
    type: Number,
    required: true,
    unique: true
  },

  cartData: Array,


  billDate: {
    type: String,
    require:true
  }
});

mongoose.models = {};
module.exports= mongoose.model('billRecords', recordsSchema);


