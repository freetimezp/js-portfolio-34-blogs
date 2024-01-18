import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import PostAuthor from '../components/PostAuthor';
//import Thumbnail from '../images/blog22.jpg';
import { UserContext, useCheckUserLogged } from '../context/userContext';
import Loader from '../components/Loader';
import DeletePost from './DeletePost';
import axios from 'axios';


const PostDetail = () => {
    useCheckUserLogged();

    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const getPost = async () => {
            setIsLoading(true);

            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
                //console.log(response.data);
                setPost(response.data);
            } catch (err) {
                setError(err);
            }

            setIsLoading(false);
        };

        getPost();
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className='post-detail'>
            {error && (
                <p className='error'>{error}</p>
            )}
            {post && (
                <div className="container post-detail__container">
                    <div className="post-detail__header">
                        <PostAuthor creator={post?.creator} createdAt={post?.createdAt} />
                        {currentUser?.id === post?.creator && (
                            <div className="post-detail__buttons">
                                <Link to={`/posts/${id}/edit`} className='btn sm primary'>
                                    Edit
                                </Link>
                                <DeletePost postId={id} />
                            </div>
                        )}
                    </div>

                    <h1>{post.title}</h1>

                    <div className="post-detail__thumbnail">
                        <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`} alt="post" />
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
                </div>
            )}
        </section>
    );
};

export default PostDetail;
