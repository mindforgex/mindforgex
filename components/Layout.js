import React from "react";
import Header from "./Header";
import { Container } from "@chakra-ui/react";

export default function Layout({children}) {
  return <div className="content">
    {children}
  </div>
}
