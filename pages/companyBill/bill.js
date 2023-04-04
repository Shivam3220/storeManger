import React, { useState,useEffect, useRef } from "react";
import ItemForm from "../../components/BillGeneratingTab/ItemForm";
import ComBillPrintCom from "./CompanyPrintComponent";


const bill = () => {
  const customer = useRef();

  const [companyCart, setCompanyCart] = useState([])
  const [cBNumber, setCBNumber] = useState(0)

  async function getNo(){
    const recordNo=await fetch("/api/companyBill", {
      method: "GET",
    });
    const number=await recordNo.json()
    setCBNumber(number)
  }


  useEffect(() => {
    getNo()
    if(localStorage.getItem("companyCart")!==null){
      setCompanyCart(JSON.parse(localStorage.getItem("companyCart")))
    }
}, [])

  const createButton = async (e) => {
    e.preventDefault()
    if (customer.current.value != "") {
      const customer_name_capitalize =
        customer.current.value.charAt(0).toUpperCase() +
        customer.current.value.slice(1);
      const data = {
        "buyer": customer_name_capitalize,
        "billNo": cBNumber,
        "cartData": [],
        "billDate": new Date().toDateString(),
      }
      const response = await fetch("/api/companyBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      const resRecive = await response.json()
      if (resRecive.recorded) {
        setCompanyCart([
          ...companyCart,
          { buyer: customer_name_capitalize, cartData: [], billNo: cBNumber},
        ]);
        customer.current.value = "";
        getNo()
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("companyCart", JSON.stringify(companyCart))
}, [companyCart])


  const checkout = async (index) => {
    const data = {
      "buyer": companyCart[index].buyer,
      "billNo": companyCart[index].billNo,
      "cartData": companyCart[index].cartData,
      "billDate": new Date().toDateString()
    }
    const response = await fetch("/api/companyBill", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    const resRecive = await response.json()
    if (resRecive.recorded) {
      companyCart.splice(index, 1);
      localStorage.setItem("companyCart", JSON.stringify(companyCart));
      setCompanyCart([...companyCart]);
    }
  };

  const discard = async (index) => {
    const data = {
      "buyer": "BILL DICARDED",
      "billNo": companyCart[index].billNo,
      "cartData": [],
      "billDate": new Date().toDateString()
    }
    const response = await fetch("/api/companyBill", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    const resRecive = await response.json()
    if (resRecive.recorded) {
      companyCart.splice(index, 1);
      localStorage.setItem("companyCart", JSON.stringify(companyCart));
      setCompanyCart([...companyCart]);
    }
  };

  return (
    <>
      <div className="container my-4">
        
        <form className="mb-3 row">
          <label htmlFor="name" className="col-sm-auto col-form-label fw-bold">
            Company Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              required
              id="name"
              autoComplete="off"
              ref={customer}
            />
          </div>
          <div className="col-sm-4">
            <button
              className="btn btn-info text-black fw-bold border border-dark"
              onClick={createButton}
            >
              Create
            </button>
           
          </div>
        </form>
      </div>
      {companyCart &&
        companyCart.map((e, cIndex) => {
          return (
            <div
              className="accordion container my-2"
              id="accordionExample"
              key={`accordian${cIndex}`}
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#accordian${cIndex}`}
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    #{cIndex+1} {e.buyer}
                  </button>
                </h2>
                <div
                  id={`accordian${cIndex}`}
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    className="accordion-body overflow-auto"
                    style={{ height: "25rem" }}
                  >
                    <div className=" w-75 m-auto">
                      <ComBillPrintCom
                        customerAtIndex={{
                          index: cIndex,
                          cart:companyCart,
                          setCart:setCompanyCart,
                          editing:true
                        }}
                      />
                    </div>
                    <ItemForm index={cIndex} cart={companyCart}
                          setCart={setCompanyCart}/>
                    <div className="container d-flex justify-content-end my-2">
                      <button
                        className="btn btn-info text-black fw-bold border border-dark mx-2"
                        onClick={() => discard(cIndex)}
                      >
                        Discard
                      </button>
                      <button
                        className="btn btn-info text-black fw-bold border border-dark mx-2"
                        onClick={() => checkout(cIndex)}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
    </>
  );
};

export default bill;



