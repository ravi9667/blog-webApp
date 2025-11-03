import React from "react";
import { money } from "../../../../assets";
import './EarnMoney.scss'

const EarnMoney = () => {
    return (
        <div className="section earn-money">
            <header>
                <div>
                    <h2>Earn Money</h2>
                    <p>Get paid for your hard work. Google AdSense can automatically display relevant targeted ads on your blog so that you can earn income by posting about your passion.</p>
                </div>
            </header>
            <div className="background">
                {money.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`money ${i + 1}`}
                        className={`money-img money-${i + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

export default EarnMoney;