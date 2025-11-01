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
import green8 from '../../assets/green8.png'
import green9 from '../../assets/green9.png'
import design1 from '../../assets/design1.png'
import design2 from '../../assets/design2.png'
import design3 from '../../assets/design3.png'
import domain1 from '../../assets/domain-cont-1.png'
import domain2 from '../../assets/domain-cont-2.png'
import domain3 from '../../assets/domain-cont-3.png'
import domain4 from '../../assets/domain-cont-4.png'
import money1 from '../../assets/earnMoney-cont-1.png'
import money2 from '../../assets/earnMoney-cont-2.png'
import money3 from '../../assets/earnMoney-cont-3.png'
import money4 from '../../assets/earnMoney-cont-4.png'
import audience1 from '../../assets/knowYour-cont-1.png'
import audience2 from '../../assets/knowYour-cont-2.png'
import audience3 from '../../assets/knowYour-cont-3.png'
import audience4 from '../../assets/knowYour-cont-4.png'
import memories1 from '../../assets/memories-cont-1.png'
import memories2 from '../../assets/memories-cont-2.png'
import memories3 from '../../assets/memories-cont-3.png'
import millionMap from '../../assets/millions-map_2x.png'
import millionMarker from '../../assets/millions-markers_2x.png'
import Header from "./Header/Header";
import './Home.scss'

const Home = () => {

    return (
        <Header />
        // <div className="container">
        //     <div className="header">
        //         <div className="header-logo">
        //             <img src={blogLogo} alt="" />
        //             <p>Blogger</p>
        //         </div>
        //         <div className="header-buttons">
        //             <p className="login-btn">Login</p>
        //             <p className="createBlog-btn">CREATE YOUR BLOG</p>
        //         </div>
        //     </div>
        //     <div className="main-content">
        //         <div className="section hero">
        //             <header className="hero-header">
        //                 <h2>Publish your passions, your way</h2>
        //                 <p>Create a unique and beautiful blog easily.</p>
        //                 <p>CREATE YOUR BLOG</p>
        //             </header>
        //             <div className="hero-background">
        //                 <div className="theme red">
        //                     <img src={red1} alt="" />
        //                     <img src={red2} alt="" />
        //                     <img src={red3} alt="" />
        //                     <img src={red4} alt="" />
        //                     <img src={red5} alt="" />
        //                     <img src={red6} alt="" />
        //                     <img src={red7} alt="" />
        //                     <img src={red8} alt="" />
        //                 </div>
        //                 <div className="theme green">
        //                     <img src={green1} alt="" />
        //                     <img src={green2} alt="" />
        //                     <img src={green3} alt="" />
        //                     <img src={green4} alt="" />
        //                     <img src={green5} alt="" />
        //                     <img src={green6} alt="" />
        //                     <img src={green7} alt="" />
        //                     <img src={green8} alt="" />
        //                     <img src={green9} alt="" />
        //                 </div>
        //                 <div className="theme blue">
        //                     <img src={blue1} alt="" />
        //                     <img src={blue2} alt="" />
        //                     <img src={blue3} alt="" />
        //                     <img src={blue4} alt="" />
        //                     <img src={blue5} alt="" />
        //                     <img src={blue6} alt="" />
        //                     <img src={blue7} alt="" />
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="section choose-Design">
        //             <header>
        //                 <div>
        //                     <h2>Choose the perfect design</h2>
        //                     <p>Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images - or design something new.</p>
        //                 </div>
        //             </header>
        //             <div className="background">
        //                 <img src={design1} alt="" />
        //                 <img src={design2} alt="" />
        //                 <img src={design3} alt="" />
        //             </div>
        //         </div>
        //         <div className="section free-Domain">
        //             <header>
        //                 <div>
        //                     <h2>Get a domain</h2>
        //                     <p>Give your blog the perfect home. Get a blogspot.com domain or buy a custom domain with just a few clicks.</p>
        //                 </div>
        //             </header>
        //             <div className="background">
        //                 <img src={domain1} alt="" />
        //                 <img src={domain2} alt="" />
        //                 <img src={domain3} alt="" />
        //                 <img src={domain4} alt="" />
        //             </div>
        //         </div>
        //         <div className="section earn-money">
        //             <header>
        //                 <div>
        //                     <h2>Earn Money</h2>
        //                     <p>Get paid for your hard work. Google AdSense can automatically display relevant targeted ads on your blog so that you can earn income by posting about your passion.</p>
        //                 </div>
        //             </header>
        //             <div className="background">
        //                 <img src={money1} alt="" />
        //                 <img src={money2} alt="" />
        //                 <img src={money3} alt="" />
        //                 <img src={money4} alt="" />
        //             </div>
        //         </div>
        //         <div className="section know-your-audience">
        //             <header>
        //                 <div>
        //                     <h2>Know your audience</h2>
        //                     <p>Find out which posts are a hit with Blogger’s built-in analytics. You’ll see where your audience is coming from and what they’re interested in. You can even connect your blog directly to Google Analytics for a more detailed look.</p>
        //                 </div>
        //             </header>
        //             <div className="background">
        //                 <div>
        //                     <img src={audience1} alt="" />
        //                     <img src={audience2} alt="" />
        //                 </div>
        //                 <div>
        //                     <img src={audience3} alt="" />
        //                     <img src={audience4} alt="" />
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="section memories">
        //             <header>
        //                 <div>
        //                     <h2>Hang onto your memories</h2>
        //                     <p>Save the moments that matter. Blogger lets you safely store thousands of posts, photos, and more with Google.</p>
        //                 </div>
        //             </header>
        //             <div className="background">
        //                 <img src={memories1} alt="" />
        //                 <img src={memories2} alt="" />
        //                 <img src={memories3} alt="" />
        //             </div>
        //         </div>
        //         <div className="section millions">
        //             <header className="millions-header">
        //                 <h2>Join millions of others</h2>
        //                 <p>Whether sharing your expertise, breaking news, or whatever’s on your mind, you’re in good company on Blogger. Sign up to discover why millions of people have published their passions here.</p>
        //                 <button>CREATE YOUR BLOG</button>
        //             </header>
        //             <div className="millions-background">
        //                 <div className="millions-map"></div>
        //                 <div className="millions-marker"></div>
        //             </div>
        //         </div>
        //     </div>
            
        //     <div className="footer">
        //         <div className="footer-content">
        //             <div className="footer-logo">
        //                 <img src={blogLogo} alt="Blogger Logo" />
        //                 <p>Blogger</p>
        //             </div>

        //             <div className="footer-links">
        //                 <div>
        //                     <h4>About</h4>
        //                     <p>Learn more about Blogger and how you can share your passions with the world.</p>
        //                 </div>

        //                 <div>
        //                     <h4>Resources</h4>
        //                     <ul>
        //                         <li><a href="#">Help Center</a></li>
        //                         <li><a href="#">Templates</a></li>
        //                         <li><a href="#">Privacy Policy</a></li>
        //                         <li><a href="#">Terms of Service</a></li>
        //                     </ul>
        //                 </div>

        //                 <div>
        //                     <h4>Connect</h4>
        //                     <ul className="social-links">
        //                         <li><a href="#">Facebook</a></li>
        //                         <li><a href="#">Twitter</a></li>
        //                         <li><a href="#">Instagram</a></li>
        //                         <li><a href="#">YouTube</a></li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>

        //         <div className="footer-bottom">
        //             <p>© {new Date().getFullYear()} Blogger — All Rights Reserved.</p>
        //             <p>Made with ❤️ using React</p>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Home;