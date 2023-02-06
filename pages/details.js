import React, {useRef, useState } from "react";
import PreBillComponent from "../components/PreBillDetails/PreBillComponent";
import Link from "next/link";
import ReactToPrint from "react-to-print";


const ComponentToPrint = React.forwardRef((props, ref) => {
  const { preBills, index ,setbills} = props.customerAtIndex;
  // console.log(index,preBills)
  return (
    <div className="print-source" ref={ref}>
      <PreBillComponent preBills={preBills} index={index} setbills={setbills}/>
    </div>
  );
});

const ComponentToPrintWrapper = ({ customerAtIndex }) => {
  const componentRef = useRef();
  // console.log("componenetTo print wrapper",customerAtIndex.index)
  return (
    <div>
      <ComponentToPrint ref={componentRef} customerAtIndex={customerAtIndex}/>
      <div className="d-flex justify-content-end">
      <Link href={`/UpdateBill/${customerAtIndex.preBills[customerAtIndex.index]._id}`}><button className="btn px-3 m-2 btn-info text-black fw-bold border border-dark">Edit</button></Link>
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

const details = () => {
  const [recordedBill, setRecordedBill] = useState([]);
  

  const DateInput = useRef();
  const onSearch = async (e) => {
    e.preventDefault();
    if (DateInput.current.value != "") {
      const dateSearch = new Date(DateInput.current.value).toDateString();
      // console.log("details.js", dateSearch);

      const data = await fetch(
        'http://localhost:3000/api/getBill',
        {
          method: "GET",
          headers: {
            query:`{"billDate":"${dateSearch}"}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const d = await data.json();
      // console.log("details.js", d);
      setRecordedBill(d);
      DateInput.current.value = "";
    }
  };

  return (
    <>
      <div className="container my-4">
        <form className="mb-3 row">
          <label htmlFor="name" className="col-sm-auto col-form-label fw-bold">
            Search By Bill Number
          </label>
          <div className="col-sm-4">
            <input
              type="date"
              className="form-control"
              required
              id="name"
              autoComplete="off"
              ref={DateInput}
            />
          </div>
          <div className="col-sm-4">
            <button
              className="btn btn-info text-black fw-bold border border-dark"
              onClick={onSearch}
            >
              Search<i className="bi bi-search mx-1 text-bold"></i>
            </button>
          </div>
        </form>
      </div>
      {recordedBill.length > 0 &&
        recordedBill.map((e, cIndex) => {
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
                    {e.buyer}
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
                          preBills:recordedBill,
                          setbills:setRecordedBill
                        }}
                      />
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

export default details;
