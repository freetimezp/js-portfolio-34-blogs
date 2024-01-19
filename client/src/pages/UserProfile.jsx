import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaCheck } from 'react-icons/fa';

import Avatar from '../images/avatar15.jpg';
import { UserContext } from '../context/userContext';

const UserProfile = () => {
    const [avatar, setAvatar] = useState(Avatar);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const navigate = useNavigate();

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    return (
        <section className='profile'>
            <div className="container profile__container">
                <Link to={`/myposts/${currentUser.id}`} className='btn'>
                    My Posts
                </Link>

                <div className="profile__details">
                    <div className="avatar__wrapper">
                        <div className="profile__avatar">
                            <img src={avatar} alt="avatar" />
                        </div>
                        <form className="form avatar__form">
                            <input type="file" name='avatar' id='avatar' accept='png, jpg, jpeg'
                                onChange={e => setAvatar(e.target.files[0])} />
                            <label htmlFor="avatar">
                                <FaEdit />
                            </label>
                        </form>
                        <button className='profile__avatar-btn'>
                            <FaCheck />
                        </button>
                    </div>

                    <h1>Ernest Achiever</h1>

                    <form className="form profile__form">
                        <p className="form__error-message">This is an error message.</p>
                        <input type="text" placeholder='Full Name' value={name}
                            onChange={e => setName(e.target.value)} />
                        <input type="email" placeholder='Email' value={email}
                            onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder='Current password' value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)} />
                        <input type="password" placeholder='New Password' value={newPassword}
                            onChange={e => setNewPassword(e.target.value)} />
                        <input type="password" placeholder='Confirm New Password' value={confirmNewPassword}
                            onChange={e => setConfirmNewPassword(e.target.value)} />

                        <button type="submit" className='btn primary'>
                            Update my info
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
