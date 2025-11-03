import React from "react";
import { domain } from "../../../../assets";
import './FreeDomain.scss'

const FreeDomain = () => {
    return (
        <div className="section free-Domain">
            <header>
                <div>
                    <h2>Get a domain</h2>
                    <p>Give your blog the perfect home. Get a blogspot.com domain or buy a custom domain with just a few clicks.</p>
                </div>
            </header>
            <div className="background">
                {domain.map((img, i) => (
                    <img 
                        key={i}
                        src={img}
                        alt={`domain ${i + 1}`}
                        className={`domain-img domain-${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default FreeDomain;