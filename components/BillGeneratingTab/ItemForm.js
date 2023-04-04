import React, {useRef, useState } from "react";

const ItemForm = (props) => {
  // getting props data 
  const { setCart, cart, index } = props

  // all refs 
  const productName = useRef();
  const price = useRef();
  const quantity = useRef();
  const dropdown = useRef();

  // states
  const [searchProduct, setSearchProduct] = useState([]);
  const [navigate, setNavigate] = useState(0);
  
  // handling onchange on input product field and showing the product similar to the enter name from database 
  const onChangeProductInput = async () => {
    quantity.current.value=""
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
  };

 
  const handleAddProduct = () => {
    if (productName.current.value != "" && price.current.value != "") {
      if (quantity.current.value != "") {
        cart[index].cartData = [
          ...cart[index].cartData,
          {
            productName: productName.current.value,
            price: parseFloat(price.current.value),
            quantity: parseInt(quantity.current.value),
          },
        ];
        productName.current.value = "";
        quantity.current.value = "";
        price.current.value = "";
        setSearchProduct([])
      } 
    }
    setCart([...cart]);
  };

  const downkey = (e) => {
    if(searchProduct.length!=0){
      if (e.code == "ArrowDown") {
      dropdown.current.children[navigate].focus();
      setNavigate((navigate+1)%searchProduct.length)
    }
    else if(e.code=="ArrowUp"){
      productName.current.focus()
      setNavigate(0)
    }
  }
  else if(e.code=="ArrowDown"){
    price.current.focus()
  }
  else if(e.code=="ArrowUp"){
    quantity.current.focus()
  }
  };

  const onSearchClick = (e) => {
    productName.current.value = e.product;
    price.current.value = e.price;
    quantity.current.focus();
    setNavigate(0)
    setSearchProduct([]);
  };

  const toggleOn = () => {
    const checkDropState = productName.current.className;
    if(productName.current.value!=""){
      if (checkDropState.search("show") < 0) {
        productName.current.click();
        productName.current.scrollIntoView();
      }
    }
  };

  return (
    <div className="container">
      <form>
        <div className="d-flex">
          <div className="dropdown-center flex-fill mx-2 col dropdown">
            <input
              type="text"
              className="form-control"
              list="datalistOptions"
              placeholder="Product Name"
              ref={productName}
              required
              onChange={onChangeProductInput}
              onKeyDown={downkey}
              onInput={toggleOn}
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
                  return (<tr key={index} onClick={()=>onSearchClick(e)} onKeyDown={(element)=>{ 
                    downkey(element)
                    if (element.code == "Enter") {
                      onSearchClick(e)
                  }}} tabIndex={0}>
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
          <div className="flex-fill mx-2">
            <input
              type="number"
              className="form-control "
              placeholder="Price"
              ref={price}
              required
              onKeyDown={(element)=>{ 
                if (element.code == "ArrowDown") {
                  element.preventDefault()
                  quantity.current.focus()}                  
                  else if(element.code == "ArrowUp"){
                    element.preventDefault()
                    productName.current.focus()
                  }}}
            />
          </div>
          <div className="flex-fill mx-2">
            <input
              type="number"
              className="form-control "
              placeholder="Quantity"
              ref={quantity}
              required
              onKeyDown={(element)=>{ 
                if (element.code == "ArrowUp") {
                  element.preventDefault()
                  price.current.focus()
                }                  
                else if(element.code == "ArrowDown"){
                  element.preventDefault()
                  productName.current.focus()
                }
              }}
            />
          </div>

          <div className="flex-fill mx-2">
            <button
              type="submit"
              className="btn btn-info text-black fw-bold border border-dark w-100"
              onClick={() => handleAddProduct()}
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
