import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Admin Log In
        </NavLink>
      </li>
     
      <li>
        <NavLink to="/places/new">Employee</NavLink>
      </li>
     
    </ul>
  );
};

export default NavLinks;
