import React from 'react';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LogAndReg = () => {

    const [animation,setAnimation]= useState(true)
console.log(animation);
    return (
        <section className='relative overflow-hidden h-screen'>
            <div  className='absolute  left-40 top-10'>
                <Login animation={animation} setAnimation={setAnimation}></Login>

            </div>
            <div className='absolute  right-40 top-10'>

                <Register animation={animation} setAnimation={setAnimation}></Register>
            </div>
            <div className={`w-[1500px] overflow-hidden transition-all rotate-180 absolute z-10  top-[-50px] ${animation ? 'right-[-400px]':'left-[-400px]'}`}>
            <img src="https://i.ibb.co/ZcbsDGF/blob-haikei.png" className='w-full' alt="" />
            
            </div>
        </section>
    );
};

export default LogAndReg;