import React, {useEffect, useState } from "react";
import { useRouter } from "next/router";
import ItemForm from "../../components/BillGeneratingTab/ItemForm";
import PrintComp from "../../components/printComponent"


const UpdateBill = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [preBills, setPreBills] = useState([]);

  const fetchBillData = async () => {
    const data = await fetch("http://localhost:3000/api/recordBill", {
      method: "GET",
      headers: {
        query: `{"_id":"${slug}"}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const d = await data.json();
    setPreBills(d);
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchBillData();
  }, [router.isReady]);



const UpdateClick = async () => {
  const data = {
    buyer: preBills[0].buyer,
    billNo: preBills[0].billNo,
    cartData: preBills[0].cartData,
    billDate: preBills[0].billDate,
  };
  const response = await fetch("/api/recordBill", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resRecive = await response.json();
  if (resRecive.recorded) {
    router.push("/details");
  }
};

  return (
    <>
      <h3 className="text-center my-3">Update Bill</h3>
      {preBills.length > 0 &&
        preBills.map((e, cIndex) => {
          return (
            <div key={cIndex}>
              <div className=" w-50 m-auto my-4">
                <PrintComp
                  customerAtIndex={{
                    index: cIndex,
                    cart: preBills,
                    setCart: setPreBills,
                    editing: true,
                  }}
                />
              </div>
              <ItemForm index={cIndex} cart={preBills} setCart={setPreBills} />
                  <div className="container d-flex justify-content-end">
              <button
                className="btn btn-info text-black fw-bold border border-dark m-2"
                onClick={() => UpdateClick()}
                >
                Update
              </button>
                </div>
            </div>
          );
        })}
    </>
  );
};

export default UpdateBill;
