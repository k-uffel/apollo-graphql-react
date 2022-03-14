import React, {useState} from 'react';
import {gql, useLazyQuery} from '@apollo/client';
import LoginComponent from "../components/loginScreen/loginComp";


const AUTHENTICATE = gql`
    query auth($userName: String!, $password: String!) {
        authenticate(userName: $userName, password: $password) {
            status
            statusText
        }
    }
`;

function Login() {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [userError, setUserError] = useState(<span> </span>);
    const [passwordError, setPasswordError] = useState(<span> </span>);
    const [getAuth, {data}] = useLazyQuery(AUTHENTICATE);

    function handleUserInput(e) {
        setUser(e.target.value);
        setUserError(<span> </span>);
    }

    function handlePasswordInput(e) {
        setPassword(e.target.value);
        setPasswordError(<span> </span>);

    }

    async function handleLogin() {
        if (!user) {
            setUserError(<span className="userCredentialsError">* Username is required</span>)
        }
        if (!password) {
            setPasswordError(<span className="userCredentialsError">* Password is required</span>)
        }

        if (user && password) {
            getAuth({variables: {userName: user, password: password}});
        }
    }

    return (
        <LoginComponent
            handleUserInput={(event) => handleUserInput(event)}
            handlePasswordInput={(event) => handlePasswordInput(event)}
            handleLogin={handleLogin}
            user={user}
            userError={userError}
            password={password}
            passwordError={passwordError}
            data={data}
        />
    )
}

export default Login;