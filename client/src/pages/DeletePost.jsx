import React from 'react';

import { useCheckUserLogged } from '../context/userContext';

const DeletePost = () => {
    useCheckUserLogged();

    return (
        <div>

        </div>
    );
};

export default DeletePost;
