import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import '../../index.css'

const ClientLayout = ({children}) => {
  return (
    <div className="bg-gray">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default ClientLayout;
