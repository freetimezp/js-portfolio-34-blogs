import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import PostItem from '../components/PostItem';
import { useCheckUserLogged } from '../context/userContext';
import Loader from '../components/Loader';

const CategoryPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { category } = useParams();

    useCheckUserLogged();

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`);
                setPosts(response?.data);
            } catch (err) {
                console.log(err);
            }

            setIsLoading(false);
        };

        fetchPosts();
    }, [category]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <section>
            {posts.length > 0 ? (
                <div className="container posts__container">
                    {posts.map(({ _id: id, thumbnail, title, description, category, creator, createdAt }) => (
                        <PostItem key={id}
                            postId={id}
                            thumbnail={thumbnail}
                            title={title}
                            description={description}
                            category={category}
                            creator={creator}
                            createdAt={createdAt}
                        />
                    ))}
                </div>
            ) : <h2 className='center'>No posts found..</h2>}
        </section>
    )
}

export default CategoryPosts;

