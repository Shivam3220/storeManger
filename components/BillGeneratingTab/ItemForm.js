import React, { useEffect, useState } from "react";
import { useRef, useContext } from "react";
import MyContext from "../../pages/context/MyContext";

const ItemForm = (props) => {
  const { setCart, cart } = useContext(MyContext);
  const productName = useRef();
  const price = useRef();
  const quantity = useRef();
  const dropdown = useRef();

  const [searchProduct, setSearchProduct] = useState([]);
  const [navigate, setNavigate] = useState(0);

  const onChangeProductInput = async () => {
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
      setNavigate(0)
      setSearchProduct(res.products);
    }
  };

  const call=()=>{
    console.log("hi")
    return 4
  }

  const handleAddProduct = (index) => {
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
      // else {
      //   cart[index].cartData = [
      //     ...cart[index].cartData,
      //     {
      //       productName: productName.current.value,
      //       price: parseFloat(price.current.value),
      //       quantity: 1,
      //     },
      //   ];
      //   productName.current.value = "";
      //   quantity.current.value = "";
      //   price.current.value = "";
      // }
    }

    setCart([...cart]);
  };

  // storing data to local storage when cart update
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [handleAddProduct]);

  const downkey = (e) => {
    if(searchProduct.length!=0){
      if (e.code == "ArrowDown") {
      dropdown.current.children[navigate].focus();
      setNavigate((navigate+1)%searchProduct.length)
    }
    else if(e.code=="ArrowUp"){
      productName.current.focus()
    }
  }
  };

  const onSearchClick = (e) => {
    productName.current.value = e.product;
    price.current.value = e.price;
    quantity.current.focus();
    setSearchProduct([]);
  };

  const toggleOn = () => {
    const checkDropState = productName.current.className;
    if (checkDropState.search("show") < 0) {
      productName.current.click();
      productName.current.scrollIntoView();
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
            />
          </div>
          <div className="flex-fill mx-2">
            <input
              type="number"
              className="form-control "
              placeholder="Quantity"
              ref={quantity}
              required
            />
          </div>

          <div className="flex-fill mx-2">
            <button
              type="submit"
              className="btn btn-info text-black fw-bold border border-dark w-100"
              onClick={() => handleAddProduct(props.cIndex)}
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
