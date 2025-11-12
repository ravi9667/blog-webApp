import React, { useEffect } from "react";
import { design } from "../../../../../assets";
import "./ChooseDesign.scss";

const ChooseDesign = () => {
    useEffect(() => {
        const elements = document.querySelectorAll(
            ".background img:not(.design-1)"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    } else {
                        entry.target.classList.remove("visible");
                    }
                });
            },
            {
                threshold: 0.3, // triggers when 30% of element is visible
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="section choose-Design">
            <header>
                <div>
                    <h2>Choose the perfect design</h2>
                    <p>
                        Create a beautiful blog that fits your style. Choose from a
                        selection of easy-to-use templates – all with flexible layouts and
                        hundreds of background images – or design something new.
                    </p>
                </div>
            </header>
            <div className="background">
                {design.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`design ${i + 1}`}
                        className={`design-img design-${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChooseDesign;
