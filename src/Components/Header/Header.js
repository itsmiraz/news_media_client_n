import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className=' my-2 text-white items-center md:px-10 px-4 py-3 flex justify-between w-full'>

            <h1 className='text-3xl z-10 font-bold'>News Media </h1>

            <div>
                <ul className={`md:flex items-center font-semibold right-0 z-0 md:bg-base-100 bg-slate-800 w-full text-white text-center justify-center md:static duration-300 ease-linear absolute ${open ? 'top-12' : 'top-[-150px]'}`}>
                    <li className='font-semibold mr-4'>
                        <Link>Home</Link>
                    </li>
                    <li className='font-semibold mr-4'>
                        <Link>News</Link>
                    </li>
                    <li className='font-semibold mr-4'>
                        <Link>About</Link>
                    </li>
                    <li>

                        <Link to='/auth/login'>
                        <button className="border border-purple-500 px-4 py-1 md:my-0 my-1 text-white  mr-4 ">Sign In</button>
                        
                        </Link>
                    </li>
                    <li>
                        <button className="  md:my-0 my-1  bg-purple-500 mr-4 px-4 py-1 text-white ">Sign Up</button>
                    </li>

                </ul>
                <div onClick={() => setOpen(!open)} className="h-6  bg-slate-800 text-white w-6 md:hidden" >
                    {open ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>

                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                    }
                </div>
            </div>
        </div >
    );
};

export default Header;