import React from 'react';

import { useCheckUserLogged } from '../context/userContext';
import { Link } from 'react-router-dom';

const DeletePost = () => {
    useCheckUserLogged();

    return (
        <Link to={`/posts/werwer/delete`} className='btn sm danger'>
            Delete
        </Link>
    );
};

export default DeletePost;
