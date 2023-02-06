import React from "react";
import Link from "next/link";

const navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-info sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" href="/">
            GRMP Store
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/" className="nav-link  text-black fw-semibold">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/bill" className="nav-link  text-black fw-semibold">
                  Bill
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/details"
                  className="nav-link  text-black fw-semibold"
                >
                  Details
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle text-black fw-semibold"
                  href=""
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Stock Manage
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/stock/add">
                      Add Stock
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/stock/update">
                      Update Stock
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/stock/delete">
                      Delete Stock
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default navbar;
