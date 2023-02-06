import connectDB from "../../mongodb/middleWare";
import Records from "../../mongodb/Schema/recordBill";

const handler = async (req, res) => {
if (req.method === 'PUT') {
    // console.log(req.body)
        try {
          const billUpdate = await Records.findOneAndUpdate({billNo:req.body.billNo},req.body);
        //   console.log(billUpdate)
          return res.status(200).send({message:"Bill Added Sucessfully", recorded:true,bill:billUpdate});
        } 
        catch (error) {
          return res.status(500).send({message:"Internal Server Error", recorded:false});
        }
  } else {
    res.status(422).send({message:'req_method_not_supported', recorded:false});
  }
};

export default connectDB(handler);