import React from "react";
import { useRef} from "react";

const ItemForm = (props) => {
  const { preBills, customerIndex ,setbills} = props;

  
  const productName = useRef();
  const price = useRef();
  const quantity = useRef();

  const handleAddProduct = () => {
    if (productName.current.value != "" && price.current.value != "") {
      if (quantity.current.value != "") {
        preBills[customerIndex].cartData = [
          ...preBills[customerIndex].cartData,
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
        preBills[customerIndex].cartData = [
          ...preBills[customerIndex].cartData,
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

    setbills([...preBills])
  };


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
            onClick={() => handleAddProduct()}
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
