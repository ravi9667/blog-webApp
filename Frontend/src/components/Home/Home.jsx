import React from "react";
import blogLogo from "../../assets/peercoin.png"
import red1 from "../../assets/red 1.png"
import red2 from "../../assets/red 2.png"
import red3 from "../../assets/red 3.png"
import red4 from "../../assets/red 4.png"
import red5 from "../../assets/red 5.png"
import red6 from "../../assets/red 6.png"
import red7 from "../../assets/red 7.png"
import red8 from "../../assets/red 8.png"
import blue1 from '../../assets/blue 1.png'
import blue2 from '../../assets/blue 2.png'
import blue3 from '../../assets/blue 3.png'
import blue4 from '../../assets/blue 4.png'
import blue5 from '../../assets/blue 5.png'
import blue6 from '../../assets/blue 6.png'
import blue7 from '../../assets/blue 7.png'
import green1 from '../../assets/green 1.png'
import green2 from '../../assets/green 2.png'
import green3 from '../../assets/green 3.png'
import green4 from '../../assets/green 4.png'
import green5 from '../../assets/green 5.png'
import green6 from '../../assets/green 6.png'
import green7 from '../../assets/green 7.png'
import green8 from '../../assets/green 8.png'
import green9 from '../../assets/green 9.png'
import './Home.scss'

const Home = () => {

    return (
        <div className="container">
            <div className="header">
                <div className="header-logo">
                    <img src={blogLogo} alt="" />
                    <p>Blogger</p>
                </div>
                <div className="header-buttons">
                    <p className="login-btn">Login</p>
                    <p className="createBlog-btn">CREATE YOUR BLOG</p>
                </div>
            </div>
            <div className="main-content">
                <div className="section hero">
                    <header className="hero-header">
                        <h2>Publish your passions, your way</h2>
                        <p>Create a unique and beautiful blog easily.</p>
                        <p>CREATE YOUR BLOG</p>
                    </header>
                    <div className="hero-background">
                        <div className="theme red">
                            <img src={red1} alt="" />
                            <img src={red2} alt="" />
                            <img src={red3} alt="" />
                            <img src={red4} alt="" />
                            <img src={red5} alt="" />
                            <img src={red6} alt="" />
                            <img src={red7} alt="" />
                            <img src={red8} alt="" />
                        </div>
                        <div className="theme green">
                            <img src={green1} alt="" />
                            <img src={green2} alt="" />
                            <img src={green3} alt="" />
                            <img src={green4} alt="" />
                            <img src={green5} alt="" />
                            <img src={green6} alt="" />
                            <img src={green7} alt="" />
                            <img src={green8} alt="" />
                            <img src={green9} alt="" />
                        </div>
                        <div className="theme blue">
                            <img src={blue1} alt="" />
                            <img src={blue2} alt="" />
                            <img src={blue3} alt="" />
                            <img src={blue4} alt="" />
                            <img src={blue5} alt="" />
                            <img src={blue6} alt="" />
                            <img src={blue7} alt="" />
                        </div>
                    </div>
                </div>
                <div className="section choose-Design"></div>
                <div className="section free-Domain"></div>
                <div className="section earn-money"></div>
                <div className="section know-your-audience"></div>
                <div className="section memories"></div>
                <div className="section millions"></div>
            </div>
            <div className="footer"></div>
        </div>
    )
}

export default Home;