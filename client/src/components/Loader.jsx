import React from 'react';

import loadingGif from '../images/loader.gif';

function Loader() {
    return (
        <div className='loader'>
            <div className="loader__image">
                <img src={loadingGif} alt="loader" />
            </div>
        </div>
    );
};

export default Loader;
