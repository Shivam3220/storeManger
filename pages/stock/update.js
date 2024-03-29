import React, { useEffect, useState } from "react";
import ProductTable from "../../components/Table/ProductTable";

const update = () => {
  const [allProduct, setAllProduct] = useState([]);

  const findAllProduct = async () => {
    const data = await fetch("http://localhost:3000/api/product", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const d = await data.json();
    if(d.stat){
      setAllProduct(d.products)
    }
  };


  useEffect(() => {
    findAllProduct() 
  }, []);



  return (
    <>
    <h1 className="text-center my-2">Products Table</h1>
    <div className="container border my-2">
   {allProduct&&allProduct.length>0? <ProductTable tableData={allProduct}/>:""}
    </div>
    </>
    // <>
    //   <div className="container my-3">
    //     <h3 className="my-3 text-center">Search Product</h3>
    //     <form className="mb-3 row">
    //       <div className="col-sm-4">
    //         <input
    //           type="text"
    //           className="form-control"
    //           required
    //           id="name"
    //           placeholder="Search Product"
    //           autoComplete="off"
    //           ref={UserInput}
    //         />
    //       </div>
    //       <div className="col-sm-4">
    //         <button
    //           className="btn btn-info text-black fw-bold border border-dark"
    //           onClick={onSearch}
    //         >
    //           Search<i className="bi bi-search mx-1 text-bold"></i>
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    //   <div className="container my-4">
    //     <table className="table border table-striped">
    //       <thead>
    //         <tr>
    //           <th>S.NO.</th>
    //           <th>Product</th>
    //           <th>Price</th>
    //           <th>M.R.P.</th>
    //           <th>Case Size</th>
    //           <th>Available</th>
    //           <th>Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {allProduct.map((singleProduct, index) => {
    //           return (
    //             <tr key={index}>
    //               <td>{index + 1}</td>
    //               <td>{singleProduct.product}</td>
    //               <td>{singleProduct.price}</td>
    //               <td>{singleProduct.mrp}</td>
    //               <td>{singleProduct.caseSize}</td>
    //               <td>{singleProduct.available}</td>
    //               <td>
    //                 <div className="d-flex">
    //                   <button
    //                     className="btn btn-outline-info mx-1"
    //                     data-bs-toggle="modal"
    //                     data-bs-target="#exampleModal"
    //                     onClick={()=>{setEditProduct(singleProduct)}}
    //                   >
    //                     <i className="bi bi-pencil-square "></i> edit
    //                   </button>
    //                 </div>
    //               </td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>

    //     {/* modal code here */}
    //     <div
    //       className="modal fade"
    //       id="exampleModal"
    //       tabIndex="-1"
    //       aria-labelledby="exampleModalLabel"
    //       aria-hidden="true"
    //     >
    //       <div className="modal-dialog">
    //         <div className="modal-content">
    //           <div className="modal-header">
    //             <h5 className="modal-title" id="exampleModalLabel">
    //               Edit--{editProduct.product}
    //             </h5>
    //             <button
    //               type="button"
    //               className="btn-close"
    //               data-bs-dismiss="modal"
    //               aria-label="Close"
    //               ref={closeModal}
    //             ></button>
    //           </div>
    //           <div className="modal-body">
    //           <form>
    //     <div className="my-4">
    //       <div className="mb-3 row dropdown-center flex-fill col dropdown">
    //         <label
    //           htmlFor="ProductName"
    //           className="col-sm-3 col-form-label text-center"
    //         >
    //           Product Name
    //         </label>
    //         <div className="col-sm-6">
    //           <input
    //             type="text"
    //             className="form-control"
    //             id="product"
    //             placeholder="Product Name"
    //            value={editProduct.product}
    //            onChange={(e)=>onFormItemChange(e)}
    //            required
    //           />
    //         </div>
    //       </div>
    //       <div className="mb-3 row">
    //         <label htmlFor="price" className="col-sm-3  col-form-label text-center">
    //           Price
    //         </label>
    //         <div className="col-sm-6">
    //           <input
    //             type="number"
    //             className="form-control"
    //             id="price"
    //             placeholder="Price"
    //             value={editProduct.price}
    //             onChange={(e)=>onFormItemChange(e)}
    //             required
    //           />
    //         </div>
    //       </div>
    //       <div className="mb-3 row">
    //         <label htmlFor="mrp" className="col-sm-3  col-form-label text-center">
    //           M.R.P.
    //         </label>
    //         <div className="col-sm-6">
    //           <input
    //             type="number"
    //             className="form-control"
    //             id="mrp"
    //             placeholder="M.R.P."
    //             value={editProduct.mrp}
    //             onChange={(e)=>onFormItemChange(e)}
    //             required
    //           />
    //         </div>
    //       </div>
    //       <div className="mb-3 row">
    //         <label htmlFor="caseSize" className="col-sm-3  col-form-label text-center">
    //           Case Size
    //         </label>
    //         <div className="col-sm-6">
    //           <input
    //             type="number"
    //             className="form-control"
    //             id="caseSize"
    //             placeholder=" Case Size"
    //             value={editProduct.caseSize}
    //             onChange={(e)=>onFormItemChange(e)}
    //             required
    //           />
    //         </div>
    //       </div>
    //       <div className="mb-3 row">
    //         <label
    //           htmlFor="available"
    //           className="col-sm-3 col-form-label text-center"
    //         >
    //           Available
    //         </label>
    //         <div className="col-sm-6">
    //           <input
    //             type="number"
    //             className="form-control"
    //             id="available"
    //             placeholder="Available"
    //             value={editProduct.available}
    //             onChange={(e)=>onFormItemChange(e)}
    //             required
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    //           </div>
    //           <div className="modal-footer">
    //             <button type="button" className="btn btn-info text-black fw-bold border border-dark mx-2" onClick={()=>onDelClick(editProduct._id)}>
    //               Delete Product
    //             </button>
    //             <button type="button" className="btn btn-info text-black fw-bold border border-dark mx-2" onClick={()=>onSaveChangeClick(editProduct._id)}>
    //               Save Changes
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     {/* modal end */}

    //     <nav aria-label="Page navigation example">
    //       <div className="d-flex justify-content-center">
    //         <ul className="pagination">
    //           <button className="btn btn-info text-black fw-bold border border-dark mx-1">
    //             Previous
    //           </button>
    //           <button className="btn btn-info text-black fw-bold border border-dark mx-1">
    //             1
    //           </button>
    //           <button className="btn btn-info text-black fw-bold border border-dark mx-1">
    //             2
    //           </button>
    //           <button className="btn btn-info text-black fw-bold border border-dark mx-1">
    //             3
    //           </button>
    //           <button className="btn btn-info text-black fw-bold border border-dark mx-1">
    //             Next
    //           </button>
    //         </ul>
    //       </div>
    //     </nav>
    //   </div>
    // </>
  );
};

export default update;
