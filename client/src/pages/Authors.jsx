import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useCheckUserLogged } from '../context/userContext';
import Loader from '../components/Loader';
import axios from 'axios';

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useCheckUserLogged();

    useEffect(() => {
        const getAuthors = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
                setAuthors(response?.data);
            } catch (err) {
                console.log(err);
            }

            setIsLoading(false);
        }

        getAuthors();
    }, []);

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className='authors'>
            {authors.length > 0 ? (
                <div className="container authors__container">
                    {authors.map(({ _id: id, name, avatar, posts }) => (
                        <Link to={`/posts/users/${id}`} key={id} className='author'>
                            <div className="author__avatar">
                                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                                    alt={`avatar of name: ${name}`} />
                            </div>
                            <div className="author__info">
                                <h4>{name}</h4>
                                <p>{posts} posts</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : <h2 className='center'>No users/authors were found..</h2>}
        </section>
    );
};

export default Authors;
