import React, { useEffect } from "react";
import { domain } from "../../../../../assets";
import "./FreeDomain.scss";

const FreeDomain = () => {
    useEffect(() => {
        const elements = document.querySelectorAll(".background img");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="section free-domain">
            <header>
                <div>
                    <h2>Get a domain</h2>
                    <p>
                        Give your blog the perfect home. Get a blogspot.com domain or buy a
                        custom domain with just a few clicks.
                    </p>
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
    );
};

export default FreeDomain;