import React from 'react';
import { HashLoader } from 'react-spinners';

const LoadingAnimation = () => {
    return (
        <div className='h-screen flex justify-center items-center'>
            <HashLoader color="#3684d6" />
        </div>
    );
};

export default LoadingAnimation;