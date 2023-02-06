import React, { useContext } from "react";
import ItemTable from "./ItemTable";
import MyContext from "../../pages/context/MyContext";

const BillComponent = (props) => {
  const {cart,setCart} = useContext(MyContext)
  const date = new Date().toDateString();

  const onNameChange=(e)=>{
    cart[props.index].customerName=e.target.value
    setCart([...cart])
  }

  return (
    <>
        <div className="border border-dark">
          <h3 className="text-center">ESTIMATE</h3>
          <div className="d-flex  justify-content-between">
            <div className="col ">
            <h6 className="px-2">
            Bill No.{" "}
            <span className="text-decoration-underline fw-bold">GT{cart[props.index].billNumber}</span>
          </h6>
              
            </div>
            <div className="col text-end">
              <h6 className="px-2">Date : {date}</h6>
            </div>
          </div>
            <h6 className="px-2">
                To : <input className="fw-bold border-0" value={props.customer}  onChange={onNameChange}/>
              </h6>
          
          <ItemTable index={props.index}/>
        </div>
    </>
  );
};

export default BillComponent;
