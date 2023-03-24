import connectDB from "../../mongodb/middleWare";
import ProductSch from "../../mongodb/Schema/stockSchema"

const handler = async (req, res) => {
    if(req.method=="PUT"){
        try {
            for (let i in req.body){
                try {
                    const findProduct = await ProductSch.findOne(req.body[i])
                    const filter={_id:findProduct.id}
                    const update={available:((findProduct.available)-(req.body[i].quantity))}
                    if (update.available<=0){
                        update.available=0
                    }
                    const d= await ProductSch.findOneAndUpdate(filter, update)
                } catch (error) {
                    res.status(500).send({message:"Product NOT Updated successfully", stat:false})
                }
            }
            res.status(200).send({message:"Product Updated successfully", stat:true})
        } catch (error) {
            res.status(500).send({message:"Product NOT Updated successfully", stat:false})
        }

    }
}

export default connectDB(handler)