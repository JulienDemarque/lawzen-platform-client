import React from "react";
import Header from "./Header";
import "bulma/css/bulma.css";
import "../app.scss";

export default ({ children }) => {
  return (
    <div className="container">
      <Header />
      <section className="section">{children}</section>
    </div>
  );
};
