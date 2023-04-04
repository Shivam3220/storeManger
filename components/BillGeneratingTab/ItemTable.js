import React, { useState } from "react";

const ItemTable = (props) => {
  let totalAmout = 0;
  let serialNumber = 0;
  const { cart, setCart, index, editing } = props;
  const [delBtn, setDelBtn] = useState(-1)

  const mouseEnter=(Dindex)=>{
    if(editing){
      setDelBtn(Dindex)
    }
  }
  const mouseLeave=()=>{
    setDelBtn(-1)
  }

  const delClick=(Productindex)=>{
    cart[index].cartData.splice(Productindex,1)
    setCart([...cart])
    setDelBtn(-1)
  }

  const onchangeTableDataProduct = (e, Productindex) => {
    cart[index].cartData[Productindex].productName = e.target.value;
    setCart([...cart]);
  };
  const onchangeTableDataPrice = (e, Productindex) => {
    cart[index].cartData[Productindex].price = parseInt(e.target.value);
    setCart([...cart]);
  };
  const onchangeTableDataQuantity = (e, Productindex) => {
    cart[index].cartData[Productindex].quantity = parseInt(e.target.value);
    setCart([...cart]);
  };

  return (
    <div className="table-responsive text-nowrap">
      <table className="table table-sm" style={{ boxSizing: "border-box" }}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th className="px-5"> Amout</th>
          </tr>
        </thead>
        <tbody className="table-group-divider fs-6">
          {cart.length > 0 ? (
            cart[index].cartData.map((product, Productindex) => {
              totalAmout += (product.price*product.quantity);
              serialNumber++;
              return (
                <tr key={Productindex}>
                  <th scope="row" className="px-2 col-md-1" onMouseEnter={()=>mouseEnter(Productindex)} onMouseLeave={mouseLeave}>
                    {serialNumber} <span role="button" hidden={delBtn === Productindex? false:true} onClick={()=>delClick(Productindex)}><i className="bi bi-trash "></i></span>
                  </th>

                  <td className="col-md-3">
                    <input
                      type="text"
                      className="w-100 border-0"
                      value={product.productName}
                      readOnly={!editing}
                      onChange={(element) =>
                        onchangeTableDataProduct(element, Productindex)
                      }
                    />
                  </td>
                  <td className="col-md-2">
                    <input
                      type="number"
                      className="w-100 border-0"
                      value={product.price}
                      readOnly={!editing}
                      onChange={(element) =>
                        onchangeTableDataPrice(element, Productindex)
                      }
                    />
                  </td>
                  <td className="col-md-1">
                    <input
                      type="number"
                      className="w-100 border-0"
                      value={product.quantity}
                      readOnly={!editing}
                      onChange={(element) =>
                        onchangeTableDataQuantity(element, Productindex)
                      }
                    />
                  </td>
                  <td className="col-md-2">
                    <input
                      type="number"
                      className="w-50 text-end border-0"
                      style={{ marginLeft: "1rem" }}
                      readOnly
                      value={product.price*product.quantity}
                    />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Data available</td>
            </tr>
          )}
          <tr>
            <th scope="row"></th>
            <td colSpan="3" className="fw-bold text-end">
              Grand Total
            </td>
            <td className="fw-bold">
              <div className="text-end w-50"> ₹ {totalAmout}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
