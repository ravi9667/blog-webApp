import React from "react";
import Header from "./Header/Header";
import Hero from "./Section/Hero/Hero";
import ChooseDesign from "./Section/ChooseDesign/ChooseDesign";
import FreeDomain from "./Section/FreeDomain/FreeDomain";
import EarnMoney from "./Section/EarnMoney/EarnMoney";
import KnowAudience from "./Section/KnowAudience/KnowAudience";
import Memories from "./Section/Memories/Memories";
import JoinMillions from "./Section/JoinMillions/JoinMillions";
import Footer from "./Footer/Footer";
import './Home.scss'

const Home = () => {

    return (
        <div className="container">
            <Header />
            <div className="main-content">
                <Hero />
                <ChooseDesign />
                <FreeDomain />
                <EarnMoney />   
                <KnowAudience />
                <Memories />
                <JoinMillions />
            </div>
            <Footer />
        </div>
      )
}

export default Home;