import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/Navbar";
import MyState from "./context/MyState";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Head>
        <title>GRMP Store</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <div className="pb-4">
        <MyState>
          <Navbar />
          <Component {...pageProps} />
        </MyState>
      </div>
    </>
  );
}

export default MyApp;
