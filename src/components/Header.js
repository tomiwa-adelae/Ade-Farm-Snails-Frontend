import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';

const Header = () => {
   const loginState = useSelector((state) => state.login);
   const { user } = loginState;

   return (
      <header>
         <div className="header">
            <div className="logo">
               <Link to="/">
                  <img src={Logo} alt="Ade Farm Snails" />
               </Link>
            </div>
            <div className="nav">
               <Link to="/search">
                  <i className="fas fa-search"></i>
               </Link>
               <Link to="/about">About Us</Link>
               <Link to="/products">Our Products</Link>
               <Link to="/contact">Contact Us</Link>
               <Link to="/cart">Cart</Link>
               {user && user.isAdmin && <Link to="/admin">Admin Portal</Link>}
               {user ? (
                  <Link className="account" to="/my-account">
                     <i className="fas fa-user"></i>
                     Hi, {user.firstName}
                  </Link>
               ) : (
                  <Link className="account" to="/login/redirect=/">
                     Account
                  </Link>
               )}
            </div>
         </div>
      </header>
   );
};

export default Header;
