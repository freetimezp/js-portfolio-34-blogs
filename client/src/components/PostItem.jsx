import React from 'react';
import { Link } from 'react-router-dom';

import PostAuthor from './PostAuthor';

const PostItem = ({ postId, title, desc, category, authorID, thumbnail }) => {
    const shortDescription = desc.length > 145 ? desc.substr(0, 145) + '...' : desc;
    const shortTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

    return (
        <article className='post'>
            <div className="post__thumbnail">
                <img src={thumbnail} alt="post" />
            </div>
            <div className="post__content">
                <Link to={`/posts/${postId}`}>
                    <h3>{shortTitle}</h3>
                </Link>
                <p>{shortDescription}</p>
                <div className="post__footer">
                    <PostAuthor />
                    <Link tp={`/posts/categories/${category}`} className='btn category'>
                        {category}
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default PostItem;
