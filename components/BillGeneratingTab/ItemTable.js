import React, { useState } from "react";
import { useContext } from "react";
import myContext from "../../pages/context/MyContext";

const ItemTable = (props) => {
  let totalAmout = 0;
  let serialNumber = 0;
  const { cart, setCart } = useContext(myContext);
  const [delBtn, setDelBtn] = useState(-1)

  const mouseEnter=(Dindex)=>{
      setDelBtn(Dindex)
  }
  const mouseLeave=()=>{
    setDelBtn(-1)
  }

  const delClick=(index)=>{
    cart[props.index].cartData.splice(index,1)
    setCart([...cart])
    console.log(index)
  }

  const onchangeTableDataProduct = (e, index) => {
    cart[props.index].cartData[index].productName = e.target.value;
    setCart([...cart]);
  };
  const onchangeTableDataPrice = (e, index) => {
    cart[props.index].cartData[index].price = parseInt(e.target.value);
    setCart([...cart]);
  };
  const onchangeTableDataQuantity = (e, index) => {
    cart[props.index].cartData[index].quantity = parseInt(e.target.value);
    setCart([...cart]);
  };

  return (
    <div className="table-responsive text-nowrap">
      <table className="table table-sm" style={{ boxSizing: "border-box" }}>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Product</th>
            <th>Quantity</th>
            <th className="px-5"> Amout</th>
          </tr>
        </thead>
        <tbody className="table-group-divider fs-6">
          {cart.length > 0 ? (
            cart[props.index].cartData.map((e, Dindex) => {
              totalAmout += e.price;
              serialNumber++;
              return (
                <tr key={Dindex}>
                  <th scope="row" className="px-2 col-md-1" onMouseEnter={()=>mouseEnter(Dindex)} onMouseLeave={mouseLeave}>
                    {serialNumber} <span role="button" hidden={delBtn === Dindex? false:true} onClick={()=>delClick(Dindex)}><i className="bi bi-trash "></i></span>
                  </th>

                  <td className="col-md-3">
                    <input
                      type="text"
                      className="w-100 border-0"
                      value={e.productName}
                      onChange={(element) =>
                        onchangeTableDataProduct(element, Dindex)
                      }
                    />
                  </td>
                  <td className="col-md-1">
                    <input
                      type="number"
                      className="w-100 border-0"
                      value={e.quantity}
                      onChange={(element) =>
                        onchangeTableDataQuantity(element, Dindex)
                      }
                    />
                  </td>
                  <td className="col-md-2">
                    <input
                      type="number"
                      className="w-50 text-end border-0"
                      style={{ marginLeft: "1rem" }}
                      value={e.price}
                      onChange={(element) =>
                        onchangeTableDataPrice(element, Dindex)
                      }
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
            <td colSpan="2" className="fw-bold text-end">
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
