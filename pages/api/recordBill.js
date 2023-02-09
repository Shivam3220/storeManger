import connectDB from "../../mongodb/middleWare";
import Records from "../../mongodb/Schema/recordBill";

const handler = async (req, res) => {
  if(req.method==="GET"){
    if(req.headers.query!=undefined){
      try{
        const d = await JSON.parse(req.headers.query)
        // console.log(req.headers)
        const bills= await Records.find(d)
        // console.log(bills)
        return res.status(200).send(bills);
      }
      catch{
        return res.status(500).send({"error":"error"})
      }
    }
    const number= await Records.count()
    return res.status(200).send(number);
  }

  else if (req.method === 'POST') {
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
  } 

 else if (req.method === 'PUT') {
    // console.log(req.body)
        try {
          const billUpdate = await Records.findOneAndUpdate({billNo:req.body.billNo},req.body);
        //   console.log(billUpdate)
          return res.status(200).send({message:"Bill Added Sucessfully", recorded:true,bill:billUpdate});
        } 
        catch (error) {
          return res.status(500).send({message:"Internal Server Error", recorded:false});
        }
  } 
  
  
  else {
    res.status(422).send({message:'req_method_not_supported', recorded:false});
  }


};

export default connectDB(handler);