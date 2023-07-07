import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import TableFilter from "./TableFilter";

const ProductTable = (props) => {

 

  const TableColums = [
    {
      Header: "Product Name",
      accessor: "product",
    },
    {
      Header: "Mrp",
      accessor: "mrp",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Available",
      accessor: "available",
    },
    {
      Header: "Case Size",
      accessor: "caseSize",
    },
  ];

  const closeModal = useRef();
  const [editProduct, setEditProduct] = useState({data:{
    _id: "",
    product: "",
    mrp: 0,
    price: 0,
    available: 0,
    caseSize: 0,
  },index:0});
  const columns = useMemo(() => TableColums, []);
  const [TableData, setTableData] = useState(useMemo(() => props.tableData, []))

  const tableData = useTable(
    {
      columns: columns,
      data: TableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    pageCount,
    gotoPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
  } = tableData;

  const { globalFilter, pageIndex, pageSize } = state;

  const onSaveChangeClick = async (id ) => {
    const response = await fetch("/api/product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProduct.data),
    });
    const resRecive = await response.json();
    if (resRecive.stat) {
      TableData[editProduct.index]=editProduct.data
      setTableData([...TableData])
      closeModal.current.click()
    }
  };

  const onDelClick = async (id ) => {
    const promptOutput = confirm("Are you sure Delete this product");
    if (promptOutput) {
      const response = await fetch("/api/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const resRecive = await response.json();
      if (resRecive.stat) {
        TableData.splice(editProduct.index,1)
        setTableData([...TableData])
        closeModal.current.click();
      }
    }
  };

  const onFormItemChange = (e) => {
    console.log(editProduct)
    if (e.target.id == "product") {
      setEditProduct({data:{ ...editProduct.data, product: e.target.value }, index:editProduct.index});
    } else if (e.target.id == "price") {
      setEditProduct({data:{ ...editProduct.data, price: parseInt(e.target.value) },index:editProduct.index});
    } else if (e.target.id == "mrp") {
      setEditProduct({data:{ ...editProduct.data, mrp: parseInt(e.target.value) },index:editProduct.index});
    } else if (e.target.id == "caseSize") {
      setEditProduct({data:{ ...editProduct.data, caseSize: parseInt(e.target.value) },index:editProduct.index});
    } else if (e.target.id == "available") {
      setEditProduct({data:{ ...editProduct.data, available: parseInt(e.target.value) },index:editProduct.index});
    }
  };

  return (
    <div className="w-full">
      <div className="d-flex justify-content-between">
        <div>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="m-2 px-2"
          >
            {[10, 20, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          entities per page
        </div>
        <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <table {...getTableProps()} className="table table-hover table-bordered">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className=""
                >
                  <span className="d-flex">
                    <p>{column.render("Header")}</p>
                    <span className="d-flex flex-column ml-4 fs-4">
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <i class="bi bi-arrow-up" style={{fontSize:"15px"}}></i>
                          : <i class="bi bi-arrow-down"  style={{fontSize:"15px"}}></i>
                        : ""}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                style={{ cursor: "pointer" }}
                {...row.getRowProps()}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => {
                  setEditProduct({data:row.original, index:row.index});
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* pagenation start here */}
      <div className="d-flex justify-content-center mx-2">
        <ul className="pagination">
          <li className="page-item">
            <button
              onClick={previousPage}
              aria-label="Previous"
              disabled={!canPreviousPage}
              className={`page-link ${
                !!(canPreviousPage - 1) ? "bg-secondary bg-opacity-50 " : ""
              }`}
            >
              <span aria-hidden="true">&laquo; Previous</span>
            </button>
          </li>
          <li className="mx-4 py-2">
            <h5>
              {pageCount && pageCount > 0
                ? `Showing ${pageIndex + 1} to ${pageCount}`
                : ""}
            </h5>
          </li>
          <li className="page-item">
            <button
              onClick={nextPage}
              disabled={!canNextPage}
              aria-label="Next"
              className={`page-link ${
                !canNextPage ? "bg-secondary bg-opacity-50  " : ""
              }`}
            >
              <span aria-hidden="true">Next &raquo;</span>
            </button>
          </li>
        </ul>
      </div>
      {/* Pagenation end here */}

      {/* modal code here */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit--{editProduct.data.product}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="my-4">
                  <div className="mb-3 row dropdown-center flex-fill col dropdown">
                    <label
                      htmlFor="ProductName"
                      className="col-sm-3 col-form-label text-center"
                    >
                      Product Name
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="product"
                        placeholder="Product Name"
                        value={editProduct.data.product}
                        onChange={(e) => onFormItemChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="price"
                      className="col-sm-3  col-form-label text-center"
                    >
                      Price
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="Price"
                        value={editProduct.data.price}
                        onChange={(e) => onFormItemChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="mrp"
                      className="col-sm-3  col-form-label text-center"
                    >
                      M.R.P.
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control"
                        id="mrp"
                        placeholder="M.R.P."
                        value={editProduct.data.mrp}
                        onChange={(e) => onFormItemChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="caseSize"
                      className="col-sm-3  col-form-label text-center"
                    >
                      Case Size
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control"
                        id="caseSize"
                        placeholder=" Case Size"
                        value={editProduct.data.caseSize}
                        onChange={(e) => onFormItemChange(e)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="available"
                      className="col-sm-3 col-form-label text-center"
                    >
                      Available
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="number"
                        className="form-control"
                        id="available"
                        placeholder="Available"
                        value={editProduct.data.available}
                        onChange={(e) => onFormItemChange(e)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info text-black fw-bold border border-dark mx-2"
                onClick={() => onDelClick(editProduct.data._id)}
              >
                Delete Product
              </button>
              <button
                type="button"
                className="btn btn-info text-black fw-bold border border-dark mx-2"
                onClick={() => onSaveChangeClick(editProduct.data._id)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal end */}
    </div>
  );
};

export default ProductTable;
