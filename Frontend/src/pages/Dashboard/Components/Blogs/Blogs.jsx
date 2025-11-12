import React from "react";
import img from '../../../../assets/dashboard-bg.png'
import './Blogs.scss'

const Blogs = () => {

    return (
        <div className="blog-container">
            <img src={img} alt="" />
            <h1>How to build a modern blog App in react</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum beatae fugiat quisquam fuga eaque temporibus dignissimos alias tempora placeat perferendis expedita possimus reiciendis mollitia corrupti ea, minima culpa ab quo.</p>
        </div>
    )
}

export default Blogs;