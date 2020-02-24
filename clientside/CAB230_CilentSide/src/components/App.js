import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { withRouter } from "react-router-dom";

const App = () => (
  <div className="page-container">
    <Header />
    <Main />
    <Footer/>  
  </div>
);

export default withRouter(App);
