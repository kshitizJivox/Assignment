import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { BiLogOut } from "react-icons/bi"
import LogoImg from '../../assets/download.png'
import { useDispatch } from "react-redux";
import { logoutHandler } from "../Login/redux/LoginAction";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return location.pathname == "/login" ? null : (
    <div className={classes.mainContainer}>
      <img src={LogoImg} onClick={() => navigate("/")}/>
      <div className={classes.navContainer}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/album">Album</NavLink>
        <NavLink to="/todo">Todo</NavLink>
      </div>
      <BiLogOut onClick={() => dispatch(logoutHandler())}/>
    </div>
  );
}

export default Navbar;
