import connectDB from "../../mongodb/middleWare";
import Records from "../../mongodb/Schema/recordBill";

const handler = async (req, res) => {
  if(req.method==="GET"){
    if(req.headers.query!=undefined){
      try{
        const d = await JSON.parse(req.headers.query)
        if(d.buyer!=undefined){
          const buyerName=new RegExp(d.buyer,"i")
          d.buyer=buyerName
        }
        if(d.lastRecord!=undefined){
          const bills= await Records.find().limit(d.lastRecord).sort({$natural:-1}) 
        return res.status(200).send(bills)
        }
        const bills= await Records.find(d)
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
        try {
          const record = new Records(req.body);
          const recordBill = await record.save();

          return res.status(200).send({message:"Bill Added Sucessfully", recorded:true});
        } 
        catch (error) {
          return res.status(500).send({message:"Bill Number Already Exsits", recorded:false});
        }
  } 

 else if (req.method === 'PUT') {
        try {
          const billUpdate = await Records.findOneAndUpdate({billNo:req.body.billNo},req.body);
          return res.status(200).send({message:"Bill Added Sucessfully", recorded:true});
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