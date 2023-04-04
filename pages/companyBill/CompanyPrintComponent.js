import React, { useRef } from 'react'
import ReactToPrint from "react-to-print";
import CompanyBillComponent from "./companyBillComponent"


const ComponentToPrint = React.forwardRef((props, ref) => {
    const { cart,index,setCart, editing } = props.customerAtIndex;
    return (
      <div className="print-source" ref={ref}>
        <div className='container my-2'>
        <CompanyBillComponent cart={cart} index={index} setCart={setCart} editing={editing}/>
        </div>
      </div>
    );
  });



const printComponent = ({customerAtIndex}) => {
    const componentRef = useRef();
    const {cart, index, editing}= customerAtIndex
  return (
    <div>
        <ComponentToPrint ref={componentRef} customerAtIndex={customerAtIndex} />
        <div className="d-flex justify-content-end">
          <ReactToPrint
            trigger={() => (
              <button className="btn px-3 my-2 btn-info text-black fw-bold border border-dark">
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
  )
}

export default printComponent

