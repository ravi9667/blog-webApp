import React, { useEffect, useRef } from "react";
import blogLogo from "../../../assets/peercoin.png";
import "./Header.scss";

const Header = () => {
    const headerRef = useRef(null);
    let lastScrollY = 0;

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 20) {
                headerRef.current?.classList.remove("header-hidden");
            } else {
                headerRef.current?.classList.add("header-hidden");
            }

            lastScrollY = currentScroll;
        };

        headerRef.current?.classList.add("header-hidden");

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <header ref={headerRef} className="header">
                <div className="header__logo">
                    <img src={blogLogo} alt="Blogger Logo" />
                    <p>Blogger</p>
                </div>

                <div className="header__buttons">
                    <button className="header__login-btn">Login</button>
                    <button className="header__create-btn">Create Your Blog</button>
                </div>
            </header>
        </div>
    );
};

export default Header;