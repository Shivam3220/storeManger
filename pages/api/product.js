import connectDB from "../../mongodb/middleWare";
import ProductSch from "../../mongodb/Schema/stockSchema"

const handler = async (req, res) => {
    if(req.method=="POST"){
        try {   
            const newProduct= new ProductSch(req.body)
            const onAddProductToData = await newProduct.save()
            res.status(200).send({message:"Product added successfully", addedStat:true})
        } 
        catch (error) {
            res.status(406).send({message:"product not added", addedStat:false})
        }
    }

    if(req.method=="GET"){
        try { 
            const fProduct= await JSON.parse(req.headers.query)  
            // console.log(fProduct)
            if(fProduct.product!=undefined){
                const regProduct=new RegExp(fProduct.product,"i")
                fProduct.product=regProduct
              }
            const findProduct = await ProductSch.find(fProduct).limit(5)
            res.status(200).send(findProduct)
        } 
        catch (error) {
            res.status(500).send({message:"product not added", addedStat:false})
        }
    }

}

export default connectDB(handler)