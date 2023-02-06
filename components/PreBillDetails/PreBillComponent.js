import React from "react";
import PreItemTable from "./PreItemTable";

const BillComponent = (props) => {
 const { preBills, index ,setbills} = props;


  const onNameChange=(e)=>{
    preBills[index].buyer=e.target.value
    setbills([...preBills])
  }

  return (
    <>
        <div className="border border-dark">
          <h3 className="text-center">ESTIMATE</h3>
          <div className="d-flex  justify-content-between">
            <div className="col ">
            <h6 className="px-2">
            Bill No.{" "}
            <span className="text-decoration-underline fw-bold">GT{preBills[index].billNo}</span>
          </h6>
              
            </div>
            <div className="col text-end">
              <h6 className="px-2">Date : {preBills[index].billDate}</h6>
            </div>
          </div>
            <h6 className="px-2">
                To : <input className="fw-bold border-0" value={preBills[index].buyer}  onChange={onNameChange}/>
              </h6>
          
          <PreItemTable preBills={preBills} customerindex={index} setbills={setbills} />
        </div>
    </>
  );
};

export default BillComponent;
