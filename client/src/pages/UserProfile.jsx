import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaCheck } from 'react-icons/fa';

import { UserContext } from '../context/userContext';

const UserProfile = () => {
    const [error, setError] = useState('');
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isAvatarTouched, setIsAvatarTouched] = useState(false);

    const navigate = useNavigate();

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,
                { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
            const { name, email, avatar } = response.data;
            setName(name);
            setEmail(email);
            setAvatar(avatar);
        };

        getUser();
    }, []);

    const changeAvatarHandler = async () => {
        setIsAvatarTouched(false);

        try {
            const postData = new FormData();
            postData.set('avatar', avatar);

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
                postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
            setAvatar(response?.data.avatar);
        } catch (err) {
            console.log(err);
        }
    };

    const updateUserDatails = async (e) => {
        e.preventDefault();

        try {
            const userData = new FormData();
            userData.set('name', name);
            userData.set('email', email);
            userData.set('currentPassword', currentPassword);
            userData.set('newPassword', newPassword);
            userData.set('confirmNewPassword', confirmNewPassword);

            const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`,
                userData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });

            if (response.status === 200) {
                navigate('/logout');
            }
        } catch (err) {
            setError(err.response.data.message);
            //console.log(err);
        }
    };

    return (
        <section className='profile'>
            <div className="container profile__container">
                <Link to={`/myposts/${currentUser.id}`} className='btn'>
                    My Posts
                </Link>

                <div className="profile__details">
                    <div className="avatar__wrapper">
                        <div className="profile__avatar">
                            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                                alt="avatar" />
                        </div>
                        <form className="form avatar__form">
                            <input type="file" name='avatar' id='avatar' accept='png, jpg, jpeg'
                                onChange={e => setAvatar(e.target.files[0])} />
                            <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                                <FaEdit />
                            </label>
                        </form>
                        {isAvatarTouched && (
                            <button className='profile__avatar-btn' onClick={changeAvatarHandler}>
                                <FaCheck />
                            </button>
                        )}
                    </div>

                    <h1>{currentUser.name}</h1>

                    <form className="form profile__form" onSubmit={updateUserDatails}>
                        {error && (
                            <p className="form__error-message">{error}</p>
                        )}
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
