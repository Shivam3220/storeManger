import connectDB from "../../mongodb/middleWare";
import ProductSch from "../../mongodb/Schema/stockSchema"

const handler = async (req, res) => {
    if(req.method=="POST"){
        try {   
            const newProduct= new ProductSch(req.body)
            const onAddProductToData = await newProduct.save()
            res.status(200).send({message:"Product added successfully", stat:true})
        } 
        catch (error) {
            res.status(406).send({message:"product not added", stat:false})
        }
    }

     else if(req.method=="GET"){
        try { 
            if(req.headers.query!=undefined){

                const fProduct= await JSON.parse(req.headers.query)  
                // console.log(fProduct)
                if(fProduct.product!=undefined){
                    const regProduct=new RegExp(fProduct.product,"i")
                    fProduct.product=regProduct
                  }
                const findProduct = await ProductSch.find(fProduct).limit(5)
                res.status(200).send({products:findProduct, stat:true})
            }
            else{
                const findProduct = await ProductSch.find({})
                res.status(200).send({products:findProduct, stat:true})
            } 
            }
            
        catch (error) {
            res.status(500).send({message:"product not added", stat:false})
        }
    }
    else if(req.method=="PUT"){
        try {   
            const upDateProduct = await ProductSch.findOneAndUpdate({_id:req.body.
            _id},req.body)
            res.status(200).send({message:"Product Updated successfully", stat:true})
        } 
        catch (error) {
            res.status(406).send({message:"product not Updated", stat:false})
        }
    }
    else if(req.method=="DELETE"){
        try {   
            const DelProduct = await ProductSch.deleteOne( { _id: req.body.id } )
            res.status(200).send({message:"Product Deleted successfully", stat:true})
        } 
        catch (error) {
            res.status(406).send({message:"product not Deleted", stat:false})
        }
    }

}

export default connectDB(handler)