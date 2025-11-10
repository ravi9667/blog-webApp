import React, { useState } from "react";
import Loader from "../../ReusableCompo/Loader/Loader";
import show from "../../assets/eye.png";
import hide from "../../assets/hide.png";
import { useNavigate } from "react-router";
import logo from "../../assets/peercoin.png";
import userIcon from "../../assets/user.png";
import emailIcon from "../../assets/mail.png";
import passIcon from "../../assets/padlock.png";
import illustration from "../../assets/login-illustration.png";
import "./Signup.scss";

const Signup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [signupFormData, setSignupFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleFormInput = (field, event) => {
        setSignupFormData({ ...signupFormData, [field]: event.target.value });
    };

    return isLoading ? (
        <Loader />
    ) : (
        <div className="signup-container">
            <div className="signup-main">
                <div className="signup-card">
                    <div className="blogger">
                        <img src={logo} alt="Blogger-logo" width={40} height={40} />
                        <h1 className="blogger-Heading">Blogger</h1>
                    </div>
                    <div>
                        <h1>Create Account</h1>
                        <p>Join Blogger today</p>
                    </div>

                    {/* Name Field */}
                    <div className="input-group group-1">
                        <img src={userIcon} alt="" className="user-icon" />
                        <input
                            type="text"
                            className="input"
                            required
                            placeholder=" "
                            onChange={(e) => handleFormInput("name", e)}
                            value={signupFormData.name}
                        />
                        <label>Name</label>
                    </div>

                    {/* Email Field */}
                    <div className="input-group group-2">
                        <img src={emailIcon} alt="" className="email-icon" />
                        <input
                            type="email"
                            className="input"
                            required
                            placeholder=" "
                            onChange={(e) => handleFormInput("email", e)}
                            value={signupFormData.email}
                        />
                        <label>Email</label>
                    </div>

                    {/* Password Field */}
                    <div className="input-group group-3">
                        <img src={passIcon} alt="" className="password-icon" />
                        <input
                            type={isPasswordHidden ? "password" : "text"}
                            className="input"
                            required
                            placeholder=" "
                            onChange={(e) => handleFormInput("password", e)}
                            value={signupFormData.password}
                        />
                        <label>Password</label>
                        {signupFormData.password.trim().length ? (
                            <img
                                src={isPasswordHidden ? hide : show}
                                alt="Eye Icon"
                                className="showIcon"
                                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                            />
                        ) : null}
                    </div>

                    <button>Sign Up</button>
                    <p>
                        Already have an Account?{" "}
                        <button onClick={() => navigate("/login")}>Sign In</button>
                    </p>
                </div>
            </div>

            <div className="signup-bg">
                <img src={illustration} alt="" className="signup-illustrations" />
            </div>
        </div>
    );
};

export default Signup;
