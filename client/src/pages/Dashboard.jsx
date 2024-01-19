import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Loader from '../components/Loader';
import { UserContext } from '../context/userContext';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,
                    { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
                setPosts(response?.data);
            } catch (err) {
                console.log(err);
            }

            setIsLoading(false);
        };

        fetchPosts();
    }, [id]);

    if (isLoading) {
        return <Loader />
    }

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
