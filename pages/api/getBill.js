import connectDB from "../../mongodb/middleWare";
import Records from "../../mongodb/Schema/recordBill";

const handler = async (req, res) => {
  if(req.method==="GET"){
    try{

      const d = await JSON.parse(req.headers.query)
      // console.log(req.headers)
      const bills= await Records.find(d)
      // console.log(bills)
      return res.status(200).send(bills);
    }
    catch{
      return res.status(500).send({"error":"eroor"})
    }
  }
}
  export default connectDB(handler);