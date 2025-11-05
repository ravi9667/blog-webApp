import React, { use, useState } from "react";
import Loader from "../../ReusableCompo/Loader/Loader";
import show from '../../assets/eye.png'
import hide from '../../assets/hide.png'
import { useNavigate } from "react-router";
// import './Login.scss';

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
                        <h1 className="login-Heading">Login</h1>
                        <div className="input-group group-1">
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
                        <p>Don't have an Account <span onClick={() => navigate('/signup')}>SignUp</span></p>
                    </div>
                </div>
                <div className="login-illustrations"></div>
            </div>
        )
    )
}

export default Login;