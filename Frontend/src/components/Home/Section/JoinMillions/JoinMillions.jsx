import React from "react";
import { millions } from "../../../../assets";
import './JoinMillions.scss'

const JoinMillions = () => {
    return (
        <div className="section millions">
            <header className="millions-header">
                <h2>Join millions of others</h2>
                <p>Whether sharing your expertise, breaking news, or whatever’s on your mind, you’re in good company on Blogger. Sign up to discover why millions of people have published their passions here.</p>
                <button>CREATE YOUR BLOG</button>
            </header>
            <div className="millions-background">
                <div className="millions-map"></div>
                <div className="millions-marker"></div>
            </div>
        </div>
    )
}

export default JoinMillions;