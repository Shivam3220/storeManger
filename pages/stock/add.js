import React, { useRef } from "react";


const Add = () => {

  const productName = useRef("")
  const price = useRef("")
  const mrp = useRef("")
  const available = useRef("")
  const caseSize = useRef(1)

  const onAddProduct=async(e)=>{
    if(productName.current.value && price.current.value && mrp.current.value && available.current.value !=""){
      e.preventDefault()
      const productData={
        "product":productName.current.value,
        "price":  price.current.value ,
        "mrp":  mrp.current.value ,
        "available":  available.current.value ,
        "caseSize": caseSize.current.value
      }
      const response= await fetch("/api/product",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
      })
      const res= await response.json()
      if(res.addedStat==true){
        productName.current.value= ""
        price.current.value= ""
        mrp.current.value = ""
        available.current.value =""
      }
      
    }
  }

  return (
    <div className="container my-4">
      <h4 className="text-center">Add Product</h4>
      <form>
        <div className="my-4">
          <div className="mb-3 row">
            <label
              htmlFor="ProductName"
              className="col-sm-2 col-form-label text-center"
            >
              Product Name
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="ProductName"
                placeholder="Product Name"
                ref={productName}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="price" className="col-sm-2 col-form-label text-center">
              Price
            </label>
            <div className="col-sm-6">
              <input
                type="number"
                className="form-control"
                id="Price"
                placeholder="Price"
                ref={price}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="mrp" className="col-sm-2 col-form-label text-center">
              M.R.P.
            </label>
            <div className="col-sm-6">
              <input
                type="number"
                className="form-control"
                id="mrp"
                placeholder="M.R.P."
                ref={mrp}
                required
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="caseSize" className="col-sm-2 col-form-label text-center">
              Case Size
            </label>
            <div className="col-sm-6">
              <input
                type="number"
                className="form-control"
                id="caseSize"
                placeholder=" Case Size"
                ref={caseSize}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="available"
              className="col-sm-2 col-form-label text-center"
            >
              Available
            </label>
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                id="available"
                placeholder="Available"
                ref={available}
                required
              />
              <button
                type="submit"
                className="btn btn-info text-black fw-bold border border-dark my-3 float-end"
                onClick={onAddProduct}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add;
