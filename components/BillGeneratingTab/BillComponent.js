import React from "react";
import ItemTable from "./ItemTable";

const BillComponent = (props) => {
  const {cart, setCart, index, editing}=props
  const date = new Date().toDateString();

  const onNameChange=(e)=>{
    cart[index].buyer=e.target.value
    setCart([...cart])
  }

  const billDate=()=>{
    if(cart[index].billDate!=undefined){
      return cart[index].billDate
    }else{
      return date
    }
  }
  

  return (
    <>
        <div className="border border-dark">
          <h5 className="text-center">ESTIMATE</h5>
          <div className="d-flex  justify-content-between">
            <div className="col ">
            <h6 className="px-2">
            Bill No.{" "}
            <span className="text-decoration-underline fw-bold">GT{ cart[index].billNo}</span>
          </h6>
              
            </div>
            <div className="col text-end">
              <h6 className="px-2">Date : {billDate()}</h6>
            </div>
          </div>
            <h6 className="px-2">
                To : <input className="fw-bold border-0 py-1" style={{"width":"90%"}} value={ cart[index].buyer}  onChange={onNameChange} readOnly={!editing}/>
              </h6>
          
          <ItemTable cart={cart} index={index} setCart={setCart} editing={editing}/>
        </div>
    </>
  );
};

export default BillComponent;
