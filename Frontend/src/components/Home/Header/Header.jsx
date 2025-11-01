import React from "react";
import blogLogo from "../../../assets/peercoin.png";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={blogLogo} alt="Blogger Logo" />
        <p>Blogger</p>
      </div>

      <div className="header__buttons">
        <button className="header__login-btn">Login</button>
        <button className="header__create-btn">Create Your Blog</button>
      </div>
    </header>
  );
};

export default Header;
