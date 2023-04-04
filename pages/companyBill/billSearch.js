import React, { useState ,useRef} from 'react'
import ItemForm from "../../components/BillGeneratingTab/ItemForm";
import ComBillPrintCom from "./CompanyPrintComponent";

const BillSearch = () => {
    const [inputFieldType, setInputFieldType] = useState("date")
    const [recordedBill, setRecordedBill] = useState([]);

    const UserInput = useRef();
    const InputParameter = useRef();

    const onSearch = async (e) => {
        e.preventDefault();
        if (UserInput.current.value != "") {
          let parameter = InputParameter.current.value;
          let userParameter = UserInput.current.value;
          if (InputParameter.current.value == "billNo") {
            userParameter = parseInt(UserInput.current.value);
          } else if (InputParameter.current.value == "billDate") {
            userParameter = new Date(UserInput.current.value).toDateString();
          }
    
          const data = await fetch("/api/companyBill", {
            method: "GET",
            headers: {
              query: `{"${parameter}":"${userParameter}"}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            }
          });
          const d = await data.json();
          setRecordedBill(d);
          UserInput.current.value = "";
        }
      };
      const onchangeParaMeters = (e) => {
        if (e.target.value == "billDate") {
          setInputFieldType("date");
        } else if (e.target.value == "billNo") {
          setInputFieldType("number");
        } else if (e.target.value == "buyer") {
          setInputFieldType("text");
        }else if (e.target.value == "lastRecord") {
          setInputFieldType("number");
        } 
      };

    
      const updateHandleClick=async(index)=>{
        console.log("first",index)
        const data = {
            "buyer": recordedBill[index].buyer,
            "billNo": recordedBill[index].billNo,
            "cartData": recordedBill[index].cartData,
            "billDate": recordedBill[index].billDate
          }
          const response = await fetch("/api/companyBill", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
          });
          const resRecive = await response.json()

      }
    
  return (
    <>
    <div className="container my-4">
        <h3 className="text-center mx-2">Search Bill</h3>
        <h5 className="text-center">GOPI RAM MAHAVIR PRASAD</h5>
          <h6 className="text-center">1532 GALI ARYA SAMAJ DELHI-110006 </h6>
          <h6 className="text-center mb-2">Mob No. 8459520402</h6>
        <form className="mb-3 row">
          <select
            className="w-25 rounded-2 fw-bold"
            aria-label="Default select example"
            onChange={onchangeParaMeters}
            ref={InputParameter}
          >
            <option value="billDate" defaultValue>
              Search By Date
            </option>
            <option value="billNo">Search By Bill Number</option>
            <option value="buyer">Search By Name</option>
            <option value="lastRecord">Search Last Number of Bills</option>
          </select>

          <div className="col-sm-4">
            <input
              type={inputFieldType}
              className="form-control"
              required
              id="name"
              autoComplete="off"
              ref={UserInput}
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
                          cart: recordedBill,
                          setCart: setRecordedBill,
                          editing: true
                        }}
                      />
                    </div>
                    <ItemForm cIndex={cIndex} cart={recordedBill}
                          setCart={setRecordedBill}/>
                    <div className="container d-flex justify-content-end my-2">
                      <button
                        className="btn btn-info text-black fw-bold border border-dark mx-2"
                        onClick={() => updateHandleClick(cIndex)}
                      >
                        Update
                      </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  )
}

export default BillSearch