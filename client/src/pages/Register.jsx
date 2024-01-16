import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            //try to send request with user data to register new user
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
            const newUser = await response.data;
            //console.log(newUser);
            //if have error
            if (!newUser) {
                setError("Could not register new user!");
            }

            //if all is ok, going to login page
            navigate('/login');
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    return (
        <section className='register'>
            <div className="container">
                <h2>Register \ Sign Up</h2>
                <form className="form register__form" onSubmit={registerUser}>
                    {error && (
                        <p className="form__error-message">
                            {error}
                        </p>
                    )}
                    <input
                        type="text"
                        placeholder='Full Name'
                        name="name"
                        value={userData.name}
                        onChange={changeInputHandler}
                    />
                    <input
                        type="text"
                        placeholder='Email'
                        name="email"
                        value={userData.email}
                        onChange={changeInputHandler}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        name="password"
                        value={userData.password}
                        onChange={changeInputHandler}
                    />
                    <input
                        type="password"
                        placeholder='Password repeat'
                        name="password2"
                        value={userData.password2}
                        onChange={changeInputHandler}
                    />
                    <button type="submit" className='btn primary'>
                        Register
                    </button>
                </form>
                <small>Already have an account? <Link to="/login">Sign In</Link></small>
            </div>
        </section>
    );
};

export default Register;
