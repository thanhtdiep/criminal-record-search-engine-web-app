import React from "react";
import { Link } from "react-router-dom";
import {logOut, cookiesGetter} from "./api";


const Header = () => (
  <header>
    <nav>
      <ul>
        { cookiesGetter() != null ? null : <li>
          <Link to="/Register">Register</Link>
        </li>}
        { cookiesGetter() != null ? null :<li>
          <Link to="/Login">Login</Link>
          </li>}
        <li>
          <Link to="/Offence">Offence</Link>
        </li>
        {cookiesGetter() != null ?<li>
          <Link to="/Search">Search</Link>
        </li> : null}
        { cookiesGetter() != null ?<button className="logoutBtn" onClick={()=>logOut()}>Logout</button> :null}
      </ul>
    </nav>
  </header>
);

export default Header;
