import React from "react";
import ReactDOM from "react-dom";
/* this component fills up gap when you use hamburger button */
import "./Backdrop.css";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
