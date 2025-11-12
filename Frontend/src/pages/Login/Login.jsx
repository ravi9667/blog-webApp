import React, { use, useState } from "react";
import Loader from '../../ReusableComponents/Loader/Loader'
import show from '../../assets/eye.png'
import hide from '../../assets/hide.png'
import { useNavigate } from "react-router";
import logo from '../../assets/peercoin.png'
import userIcon from '../../assets/user.png'
import passIcon from '../../assets/padlock.png'
import illustration from '../../assets/login-illustration.png'
import './Login.scss';

const Login = () => {
    const navigate = useNavigate();
    const [ loginApiData, setLoginApiData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isPasswordHidden, setIsPasswordHidden ] = useState(true);
    const [ loginFormData, setLoginFormData ] = useState({
        email: '',
        password: ''
    });

    const handleFormInput = (field, event) => {
        setLoginFormData({...loginFormData, [field]: event.target.value})
    }

    return (
        isLoading ? (
            <Loader />
        ) : (
            <div className="login-container">
                <div className="login-main">
                    <div className="login-card">
                        <div className="blogger">
                            <img src={logo} alt="Blogger-logo" width={40} height={40} />
                            <h1 className="blogger-Heading">Blogger</h1>
                        </div>
                        <div>
                            <h1>Sign In</h1>
                            <p>Continue to Blogger</p>
                        </div>
                        <div className="input-group group-1">
                            <img src={userIcon} alt="" className="user-icon"/>
                            <input
                                type="email"
                                className="input"
                                required
                                placeholder=" "
                                onChange={(e) => handleFormInput('email', e)}
                                value={loginFormData.email}
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-group group-2">
                            <img src={passIcon} alt="" className="password-icon"/>
                            <input
                                type={isPasswordHidden ? 'password' : 'text'}
                                className="input"
                                required
                                placeholder=" "
                                onChange={(e) => handleFormInput('password', e)}
                                value={loginFormData.password}
                            />
                            <label>Password</label>
                            {loginFormData.password.trim().length ? <img src={isPasswordHidden ? hide : show} alt="Eye Icon" className="showIcon" /> : null}
                        </div>
                        <button>Sign In</button>
                        <p>Don't have an Account <button onClick={() => navigate('/signup')}>SignUp</button></p>
                    </div>
                </div>
                <div className="login-bg">
                    <img src={illustration} alt="" className="login-illustrations"/>
                </div>
            </div>
        )
    )
}

export default Login;