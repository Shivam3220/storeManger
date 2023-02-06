import React, { useEffect } from "react";
import { useRef, useContext } from "react";
import MyContext from "../../pages/context/MyContext";

const ItemForm = (props) => {
  const { setCart, cart } = useContext(MyContext);
  const productName = useRef();
  const price = useRef();
  const quantity = useRef();

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
      } else {
        cart[index].cartData = [
          ...cart[index].cartData,
          {
            productName: productName.current.value,
            price: parseFloat(price.current.value),
            quantity: 1,
          },
        ];
        productName.current.value = "";
        quantity.current.value = "";
        price.current.value = "";
      }
    }

    setCart([...cart])
  };

     // storing data to local storage when cart update
     useEffect(() => {
      localStorage.setItem("cart",JSON.stringify(cart))
    }, [handleAddProduct])

  return (
    <div className=" container">
      <form className="">
        <div className="d-flex">
          <input
            type="text"
            className="form-control mx-2"
            placeholder="Product Name"
            ref={productName}
            required
          />
          <input
            type="number"
            className="form-control mx-2"
            placeholder="Price"
            ref={price}
            required
          />
          <input
            type="number"
            className="form-control mx-2"
            placeholder="Quantity"
            ref={quantity}
          />

          <button
            type="submit"
            className="btn btn-info text-black fw-bold border border-dark w-50 mx-2"
            onClick={() => handleAddProduct(props.cIndex)}
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
