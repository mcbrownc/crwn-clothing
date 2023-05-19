import { Outlet, Link } from "react-router-dom"; 
import { Fragment } from "react";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import './navbar.styles.scss'; 

const NavBar = () => {
  return (
    <Fragment>
      <div className="navbar">
        <Link className="logo-container" to='/'>
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            SHOP
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
};

export default NavBar;