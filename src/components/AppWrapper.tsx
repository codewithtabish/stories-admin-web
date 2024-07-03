import React from "react";
import Navbar from "./custom/navbar/Navbar";

const AppWrapper = ({ children }: any) => {
  return <div className="md:max-w-6xl mx-auto">{children}</div>;
};

export default AppWrapper;
