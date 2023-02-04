import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import useReporter from '../../Hooks/UseReporter/useReporter';

const Header = () => {
    const [open, setOpen] = useState(false)

    const { user } = useContext(AuthContext)
    const [isReporter] = useReporter(user?.email)

    return (
        <div className='z-50 my-2 text-white  items-center md:px-10 px-4 py-3 flex justify-between w-full'>

            <h1 className='text-3xl z-50 font-bold relative'>News Media </h1>

            <div className='z-50'>
                <ul className={`md:flex items-center font-semibold right-0  md:bg-base-100 bg-slate-800 w-full text-white text-end pr-4 md:py-0 py-2 pt-14 justify-center md:static duration-300 ease-linear absolute ${open ? 'top-0' : 'top-[-400px]'}`}>
                    <li className='font-semibold mr-4'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='font-semibold mr-4'>
                        <Link to='/news'>News</Link>
                    </li>
                    <li className='font-semibold mr-4'>
                        <Link>About</Link>
                    </li>
                    {
                        user?.uid &&
                        <>
                            {
                                !isReporter &&
                                <li className='font-semibold mr-4'>
                                    <Link to='/becomeaReporter'>
                                        Become a Reporter ?
                                    </Link>
                                </li>
                            }
                        </>
                    }
                    <li>

                        {
                            !user?.uid &&

                            <>
                                <Link to='/auth'>
                                    <button className="border  border-purple-500 px-4 py-1 md:my-0 my-1 text-white  mr-4 ">Sign In </button>

                                </Link>
                            </>
                        }
                    </li>


                </ul>
                <div onClick={() => setOpen(!open)} className="h-6  relative z-50 text-white w-6 md:hidden" >
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