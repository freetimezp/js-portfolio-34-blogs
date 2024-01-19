import React, { useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../context/userContext';

const DeletePost = ({ postId: id }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    const removePost = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,
                { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) {
                if (location.pathname === `/myposts/${currentUser.id}`) {
                    navigate(0);
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.log("Could not delete post!");
        }
    };

    return (
        <Link className='btn sm danger' onClick={() => removePost(id)}>
            Delete
        </Link>
    );
};

export default DeletePost;
