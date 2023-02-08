import React from "react";
import ItemForm from "../components/BillGeneratingTab/ItemForm";
import BillComponent from "../components/BillGeneratingTab/BillComponent";
import { useRef, useContext } from "react";
import myContext from "./context/MyContext";
import ReactToPrint from "react-to-print";

const ComponentToPrint = React.forwardRef((props, ref) => {
  const { customer, index } = props.customerAtIndex;
  // console.log(index,customer)
  return (
    <div className="print-source" ref={ref}>
      <BillComponent customer={customer} index={index} />
    </div>
  );
});

const ComponentToPrintWrapper = ({ customerAtIndex }) => {
  const componentRef = useRef();
  // console.log("componenetTo print wrapper",customerAtIndex)
  return (
    <div>
      <ComponentToPrint ref={componentRef} customerAtIndex={customerAtIndex} />
      <div className="d-grid justify-content-end">
        <ReactToPrint
          trigger={() => (
            <button className="btn px-3 m-2 btn-info text-black fw-bold border border-dark">
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
};

const Index = () => {
  const { cart, setCart, bNumber, getNo } = useContext(myContext);
  const customer = useRef();

  const createButton = async (e) => {
    e.preventDefault()
    // console.log("someone click on create", bNumber);
    if (customer.current.value != "") {
      const customer_name_capitalize =
        customer.current.value.charAt(0).toUpperCase() +
        customer.current.value.slice(1);
      const data = {
        "buyer": customer_name_capitalize,
        "billNo": bNumber,
        "cartData": [],
        "billDate": new Date().toDateString()
      }
      const response = await fetch("/api/recordBill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      const resRecive = await response.json()
      // console.log(resRecive)
      if (resRecive.recorded) {
        setCart([
          ...cart,
          { customerName: customer_name_capitalize, cartData: [], billNumber: bNumber },
        ]);
        customer.current.value = "";
        getNo()
      }
    }
  };

  const checkout = async (index) => {
    const data = {
      "buyer": cart[index].customerName,
      "billNo": cart[index].billNumber,
      "cartData": cart[index].cartData,
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
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart([...cart]);
    }
  };

  const discard = async (index) => {
    const data = {
      "buyer": "BILL DICARDED",
      "billNo": cart[index].billNumber,
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
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart([...cart]);
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
      {cart &&
        cart.map((e, cIndex) => {
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
                    {e.customerName}
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
                    <div className=" w-50 m-auto">
                      <ComponentToPrintWrapper
                        customerAtIndex={{
                          index: cIndex,
                          customer: e.customerName,
                        }}
                      />
                    </div>
                    <ItemForm cIndex={cIndex} />
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

export default Index;
