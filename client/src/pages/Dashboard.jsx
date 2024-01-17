import React, { useState } from 'react';

import { DUMMY_POSTS } from '../data';
import { Link } from 'react-router-dom';

import { useCheckUserLogged } from '../context/userContext';

const Dashboard = () => {
    const [posts, setPosts] = useState(DUMMY_POSTS);

    useCheckUserLogged();

    return (
        <section className='dashboard'>
            {posts.length > 0 ? (
                <div className="container dashboard__container">
                    {posts.map(post => (
                        <article key={post.id} className='dashboard__post'>
                            <div className="dashboard__post-info">
                                <div className="dashboard__post-thumbnail">
                                    <img src={post.thumbnail} alt="avatar" />
                                </div>
                                <h5>
                                    {post.title}
                                </h5>
                            </div>
                            <div className="dashboard__post-actions">
                                <Link to={`/posts/${post.id}`} className='btn sm'>
                                    View
                                </Link>
                                <Link to={`/posts/${post.id}/edit`} className='btn sm primary'>
                                    Edit
                                </Link>
                                <Link to={`/posts/${post.id}/delete`} className='btn sm danger'>
                                    Delete
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <h2 className='center'>
                    No posts were found..
                </h2>
            )}
        </section >
    );
};

export default Dashboard;
