import React, { useEffect, useRef, useState } from "react";
import ItemForm from "../components/BillGeneratingTab/ItemForm";
import PrintComp from "../components/printComponent"

const Index = () => {
  // total data of active customer
  const [activeCustomerCart, setActiveCustomerCart] = useState([]);

  // getting the count of bill recorded to set the bill number in increment order 
  const [billNumber,setBillNumber]=useState(0)

  // useRefs 
  const customer = useRef();

  // getting the next bill number form database
  async function getBillNo(){
    const recordNo=await fetch("/api/recordBill", {
      method: "GET",
    });
    const number=await recordNo.json()
    setBillNumber(number)
  }

  // getting the cart from local storage if present 
  useEffect(() => {
    getBillNo()
    if(localStorage.getItem("activeCustomercart")!==null){
      setActiveCustomerCart(JSON.parse(localStorage.getItem("activeCustomercart")))
    }
}, [])

  // update local storage when ActiveCustomerCart update 
  useEffect(() => {
   localStorage.setItem("activeCustomercart", JSON.stringify(activeCustomerCart))
}, [activeCustomerCart])

  // handling create button 
  const createButton = async (e) => {
    e.preventDefault()
    if (customer.current.value != "") {
      const customer_name_capitalize =
        customer.current.value.charAt(0).toUpperCase() +
        customer.current.value.slice(1);
      const data = {
        "buyer": customer_name_capitalize,
        "billNo": billNumber,
        "cartData": [],
        "billDate": new Date().toDateString(),
      }
      const response = await fetch("/api/recordBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      const resRecive = await response.json()
      if (resRecive.recorded) {
        setActiveCustomerCart([
          ...activeCustomerCart,
          { buyer: customer_name_capitalize, cartData: [], billNo: billNumber},
        ]);
        customer.current.value = "";
        getBillNo()
      }
    }
  };

  // updating the stock quantity after checkout (function called in checkout)
  const updateStock=async(cart)=>{
    const response = await fetch("/api/stockUpdate", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cart),
    });
  }

    // handling checkout button 
  const checkout = async (index) => {
    const data = {
      "buyer": activeCustomerCart[index].buyer,
      "billNo": activeCustomerCart[index].billNo,
      "cartData": activeCustomerCart[index].cartData,
      "billDate": new Date().toDateString()
    }
    const response = await fetch("/api/recordBill", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    const resRecive = await response.json()
    if (resRecive.recorded) {
      updateStock(activeCustomerCart[index].cartData)
      activeCustomerCart.splice(index, 1);
      localStorage.setItem("activeCustomerCart", JSON.stringify(activeCustomerCart));
      setActiveCustomerCart([...activeCustomerCart]);
    }
  };

     // handling discard button 
  const discard = async (index) => {
    const data = {
      "buyer": "BILL DICARDED",
      "billNo": activeCustomerCart[index].billNo,
      "cartData": [],
      "billDate": new Date().toDateString()
    }
    const response = await fetch("/api/recordBill", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });
    const resRecive = await response.json()
    if (resRecive.recorded) {
      activeCustomerCart.splice(index, 1);
      localStorage.setItem("activeCustomerCart", JSON.stringify(activeCustomerCart));
      setActiveCustomerCart([...activeCustomerCart]);
    }
  };

  return (
    <>
      <div className="container my-4">
        <form className="mb-3 row">
          <label htmlFor="name" className="col-sm-auto col-form-label fw-bold">
            Customer Name
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
      {activeCustomerCart &&
        activeCustomerCart.map((singleActiveCustomer, atIndex) => {
          return (
            <div
              className="accordion container my-2"
              id="accordionExample"
              key={`accordian${atIndex}`}
            >
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#accordian${atIndex}`}
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    #{atIndex+1} {singleActiveCustomer.buyer}
                  </button>
                </h2>
                <div
                  id={`accordian${atIndex}`}
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div
                    className="accordion-body overflow-auto"
                    style={{ height: "25rem" }}
                  >
                    <div className=" w-75 m-auto">
                      <PrintComp
                        customerAtIndex={{
                          index: atIndex,
                          cart:activeCustomerCart,
                          setCart:setActiveCustomerCart,
                          editing:true

                        }}
                      />
                    </div>
                    <ItemForm index={atIndex} cart={activeCustomerCart} setCart={setActiveCustomerCart} />
                    <div className="container d-flex justify-content-end my-2">
                      <button
                        className="btn btn-info text-black fw-bold border border-dark mx-2"
                        onClick={() => discard(atIndex)}
                      >
                        Discard
                      </button>
                      <button
                        className="btn btn-info text-black fw-bold border border-dark mx-2"
                        onClick={() => checkout(atIndex)}
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

export default Index;
