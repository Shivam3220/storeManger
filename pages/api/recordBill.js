import connectDB from "../../mongodb/middleWare";
import Records from "../../mongodb/Schema/recordBill";

const handler = async (req, res) => {
  if(req.method==="GET"){
    const number= await Records.count()
    // console.log(number)
    return res.status(200).send(number);
  }

  if (req.method === 'POST') {
    // console.log(req.body)
        try {
          const record = new Records(req.body);
          // console.log(record)
          const recordBill = await record.save();

          return res.status(200).send({message:"Bill Added Sucessfully", recorded:true});
        } 
        catch (error) {
          return res.status(500).send({message:"Bill Number Already Exsits", recorded:false});
        }
  } else {
    res.status(422).send({message:'req_method_not_supported', recorded:false});
  }
};

export default connectDB(handler);