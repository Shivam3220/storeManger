import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import PreBillComponent from "../../components/PreBillDetails/PreBillComponent";
import ReactToPrint from "react-to-print";
import PreItemForm from "../../components/PreBillDetails/PreItemForm";

const ComponentToPrint = React.forwardRef((props, ref) => {
  const { preBills, index, setbills } = props.customerAtIndex;
  //   console.log(index,preBills)
  return (
    <div className="print-source" ref={ref}>
      <PreBillComponent preBills={preBills} index={index} setbills={setbills} />
    </div>
  );
});

const ComponentToPrintWrapper = ({ customerAtIndex }) => {
    const router = useRouter();
  const componentRef = useRef();
  //   console.log("componenetTo print wrapper", customerAtIndex.index);
    const UpdateClick=async(customerAtIndex)=>{
        const {preBills,index}=customerAtIndex
        // console.log(preBills)
        const data = {
            "buyer": preBills[index].buyer,
            "billNo": preBills[index].billNo,
            "cartData": preBills[index].cartData,
            "billDate":  preBills[index].billDate
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
            router.push("/") 
          }
    }


  return (
    <div>
      <ComponentToPrint ref={componentRef} customerAtIndex={customerAtIndex} />
      <div className="d-flex justify-content-end">
        <button className="btn px-3 m-2 btn-info text-black fw-bold border border-dark" onClick={()=>UpdateClick(customerAtIndex)}>
          Update
        </button>
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

const UpdateBill = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [preBills, setPreBills] = useState([]);

  const fetchBillData = async () => {
    // console.log("fetch is running",slug)
    const data = await fetch("http://localhost:3000/api/recordBill", {
      method: "GET",
      headers: {
        query: `{"_id":"${slug}"}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const d = await data.json();
    // console.log("fetchBillData.js", d);
    setPreBills(d);
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchBillData();
  }, [router.isReady]);

  return (
    <>
      <h3 className="text-center my-3">Update Bill</h3>
      {preBills.length > 0 &&
        preBills.map((e, cIndex) => {
          return (
              <div key={cIndex}>
                <div className=" w-50 m-auto my-4">
                  <ComponentToPrintWrapper
                    customerAtIndex={{
                      index: cIndex,
                      preBills: preBills,
                      setbills: setPreBills,
                    }}
                  />
                </div>
                <PreItemForm
                  customerIndex={cIndex}
                  preBills={preBills}
                  setbills={setPreBills}
                />
              </div>
          );
        })}
    </>
  );
};

export default UpdateBill;
