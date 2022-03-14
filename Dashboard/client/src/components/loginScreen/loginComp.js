import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './loginStyles.css';

const LoginComponent = props => {
    const navigate = useNavigate();

    useEffect(() => {
        props.data && props.data.authenticate && props.data.authenticate.status === 200 && navigate('Dashboard');
        props.data && props.data.authenticate && props.data.authenticate.status !== 200 && alert("Login Failed");
    },[props.data, navigate])

    return(
        <form>
            <header>Login Screen</header>
            <hr/>
            <div className="userCredentialsBox">
                <label>User Name :</label><br/>
                <input
                    className="userCredentials"
                    type="text"
                    name="user"
                    id="user"
                    value={props.user}
                    onChange={props.handleUserInput}
                    placeholder="Enter Username"
                /><br/>
                {props.userError}
            </div>
            <div className="userCredentialsBox">
                <label>Password :</label><br/>
                <input
                    className="userCredentials"
                    type="password"
                    name="password"
                    value={props.password}
                    onChange={props.handlePasswordInput}
                    placeholder="Password"
                /><br/>
                {props.passwordError}
            </div>
            <div className="userCredentialsBox">
                <p/>
                <button
                    type="button"
                    onClick={props.handleLogin}
                    className="loginButton"
                >
                    Login
                </button>
            </div>
        </form>
    )
}

export default LoginComponent;