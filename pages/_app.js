import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/Navbar";
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
          <Navbar />
          <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
