import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ createdAt, creator }) => {
    const [author, setAuthor] = useState({});

    useEffect(() => {
        const getAuthor = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${creator}`);
                setAuthor(response?.data);
            } catch (err) {
                console.log(err, 123);
            }
        }

        getAuthor();
    }, []);

    return (
        <Link to={`/posts/users/${creator}`} className='post__author'>
            <div className="post__author-avatar">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt="avatar" />
            </div>
            <div className="post__author-details">
                <h5>By: {author?.name}</h5>
                <small>
                    <ReactTimeAgo date={new Date(createdAt)} locale='en-ES' />
                </small>
            </div>
        </Link>
    );
};

export default PostAuthor;
