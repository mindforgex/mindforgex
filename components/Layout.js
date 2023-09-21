import React from "react";
import NavBar from "./NavBar";
import { Image } from "@chakra-ui/react";
import Footer from "./Footer";
import useLoginListener from "../hooks/useLoginListener";

export default function Layout({ children }) {
  useLoginListener()

  return (
    <div className="content woocommerce woocommerce-page">
      <NavBar />

      <div className="nk-main">
        {children}
      </div>

      {/* START: Page Background */}
      <Image
        className="nk-page-background-top"
        src="/assets/bg-top.png"
        alt="Top Background Image"
        fill={true}
      />
      <Image
        className="nk-page-background-bottom"
        src="/assets/bg-bottom.png"
        alt="Bottom Background Image"
        fill={true}
      />
      {/* END: Page Background */}

      <Footer />
    </div>
  )
}
