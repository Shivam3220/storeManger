import mongoose from "mongoose";
const MONGODB_URI="mongodb://localhost:27017/grosStore"

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    
    // Use new db connection
    await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      autoIndex: true
    });
    return handler(req, res);
  };
  
  export default connectDB;