import React from "react";
import { design } from "../../../../assets";
import './ChooseDesign.scss'

const ChooseDesign = () => {
    return (
        <div className="section choose-Design">
            <header>
                <div>
                    <h2>Choose the perfect design</h2>
                    <p>Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images - or design something new.</p>
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
    )
}

export default ChooseDesign;