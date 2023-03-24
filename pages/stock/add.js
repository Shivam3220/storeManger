import React, { useRef, useState } from "react";


const Add = () => {

  const productName = useRef("")
  const price = useRef("")
  const mrp = useRef("")
  const available = useRef("")
  const caseSize = useRef(1)
  const dropdown = useRef();

  const [searchProduct, setSearchProduct] = useState([]);
  

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
      if(res.stat==true){
        productName.current.value= ""
        price.current.value= ""
        mrp.current.value = ""
        available.current.value =""
        caseSize.current.value =""
        productName.current.focus()
      }
      
    }
  }


  const toggleOn = () => {
    const checkDropState = productName.current.className;
    if (checkDropState.search("show") < 0) {
      productName.current.click();
    }
  };


  const onChangeProductInput = async () => {
    if(productName.current.value!=""){

      const product = productName.current.value;
      const response = await fetch("/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          query: `{"product":"${product}"}`,
        },
      });
      const res = await response.json();
      if(res.stat){
        setSearchProduct(res.products);
      }
    }else{
      setSearchProduct([]);
    }
  }

  return (
    <div className="container my-4">
      <h4 className="text-center">Add Product</h4>
      <form>
        <div className="my-4">
          <div className="mb-3 row dropdown-center flex-fill col dropdown">
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
                onChange={onChangeProductInput}
                onInput={toggleOn}
                required
              />
              <table className="table my-1 border table-hover" hidden={searchProduct.length>0?false:true}>
              <thead>
                <tr>
                <th>Product</th>
                <th>Price</th>
                <th>M.R.P.</th>
                <th>Available</th>
                <th>Case Size</th>
                </tr>
              </thead>
              <tbody ref={dropdown}>
                {searchProduct.map((e,index)=>{
                  return (<tr key={index}>
                    <td>{e.product}</td> 
                    <td>{e.price}</td> 
                    <td>{e.mrp}</td> 
                    <td>{e.available}</td> 
                    <td>{e.caseSize}</td> 
                     </tr>)
                })}
                </tbody>
               </table>
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
                required
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
