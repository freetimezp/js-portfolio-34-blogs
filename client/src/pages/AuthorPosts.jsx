import React, { useState } from 'react';

import { DUMMY_POSTS } from '../data';

import PostItem from '../components/PostItem';

const AuthorPosts = () => {
    const [posts, setPosts] = useState(DUMMY_POSTS);

    return (
        <section className='posts'>
            {posts.length > 0 ? (
                <div className="container posts__container">
                    {posts.map(({ id, thumbnail, title, desc, category, authorID }) => (
                        <PostItem key={id}
                            postId={id}
                            thumbnail={thumbnail}
                            title={title}
                            desc={desc}
                            category={category}
                            authorID={authorID}
                        />
                    ))}
                </div>
            ) : <h2 className='center'>No posts found..</h2>}
        </section>
    )
}

export default AuthorPosts
