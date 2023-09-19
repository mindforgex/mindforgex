import React from "react";
import { Container } from "@chakra-ui/react";

export default function Layout({children}) {
  return <div className="content">
    {children}
  </div>
}
