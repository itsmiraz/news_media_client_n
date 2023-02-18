import {  motion } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';

const LogAndReg = () => {

    const [animation, setAnimation] = useState(true)
    console.log(animation);

    const change = () => {
        console.log('clicked')
        return setAnimation(!animation)
    }

    return (
        <section className='relative overflow-hidden h-full lg:h-screen'>
            <motion.div
                transition={{
                    duration: 0.5
                }}
                animate={{
                    scale: animation ? 1 : 0,
                    opacity: animation ? 1 : 0
                }}
                className={`lg:absolute   left:0 lg:left-40 top-0 lg:top-10 ${animation ? 'z-50' : 'z-0 '}`}>
                <Login change={change} animation={animation} setAnimation={setAnimation}></Login>

            </motion.div>
            <motion.div
                transition={{
                    duration: 0.5
                }}
                initial={{
                    opacity:0,
                }}
                animate={{
                    scale: animation ? 0 : 1,
                    opacity: animation ? 0 : 1
                }}
                className={`absolute  lg:right-40 top-0  lg:top-10 ${animation ? 'z-0 ' : 'z-50 '}`}>

                <Register change={change} animation={animation} setAnimation={setAnimation}></Register>
            </motion.div>
            <motion.div
                animate={{

                    opacity: animation ? 0 : 1
                }}
                initial={{
                    opacity:0
                }}
                // transition={{
                //     duration:1
                // }}
                className='lg:block lg:absolute hidden  z-40 top-40 left-32'
            >

                <h1 className='text-5xl font-bold text-white'>Please Register </h1>
                <h1 className='text-3xl font-bold text-white'>If You are a New User</h1>
                <p className='text-font-semibold w-96 my-2 text-white'>
                    News Media is a news website. It is better known for its authentic news and updates. We post daily news about politics, entertainment, sports, art etc. And We allow that any user can be a reporter for us*.

                </p>
            </motion.div>
            <motion.div
                animate={{

                    opacity: animation ? 1 : 0
                }}
                
                className=' lg:block lg:absolute hidden z-40 top-40 right-60'
            >

                <h1 className='text-5xl font-bold text-white'>Please Login </h1>
                <p className='text-font-semibold w-96 my-2 text-white'>
                    News Media is a news website. It is better known for its authentic news and updates. We post daily news about politics, entertainment, sports, art etc. And We allow that any user can be a reporter for us*.

                </p>
            </motion.div>
            <motion.div
                animate={{
                    x: animation ? '250px' : '-400px',
                    rotate: animation ? 60 : 180
                }}
                initial={{
                    rotate:  60,
                    y: '-100px',
                    x:'250px'
                }}
                transition={{
                    duration: 1
                }}
                className={`w-[1200px] lg:block hidden  z-10  `}>
                <img src="https://i.ibb.co/ZcbsDGF/blob-haikei.png" className='w-full' alt="" />

            </motion.div>
        </section>
    );
};

export default LogAndReg;