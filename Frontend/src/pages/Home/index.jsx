import React from "react";
import Header from "./components/Header/Header";
import Hero from './components/Section/Hero/Hero'
import ChooseDesign from './components/Section/ChooseDesign/ChooseDesign'
import FreeDomain from './components/Section/FreeDomain/FreeDomain'
import EarnMoney from './components/Section/EarnMoney/EarnMoney'
import KnowAudience from './components/Section/KnowAudience/KnowAudience'
import Memories from './components/Section/Memories/Memories'
import JoinMillions from './components/Section/JoinMillions/JoinMillions'
import Footer from './components/Footer/Footer'
import './style.scss'

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