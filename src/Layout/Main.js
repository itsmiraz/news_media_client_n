import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import { NewsCatagoryContext } from '../Context/NewssContext';
import { AuthContext } from '../Context/UserContext';
import useReporter from '../Hooks/UseReporter/useReporter';

const Main = () => {
    const catagories = useLoaderData()

    const { setCatagoryId, setAnimation, refetch } = useContext(NewsCatagoryContext)
    const [collapse, setCollapse] = useState(false)
    const { user, logOut, userfromDB, isLoading } = useContext(AuthContext)
    const [isReporter] = useReporter(user?.email)

    const [show, setshow] = useState(false)

console.log(show);
    const handlelogOut = () => {
        logOut()
            .then(() => {
                console.log('Log Outed');
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleClick = id => {
        setCatagoryId(id)
        console.log(id);
        setAnimation(true)
        refetch()
    }

    return (
        <div className=''>
            <Header></Header>
            <button className='absolute bg-white rounded-full lg:hidden text-black p-1 right-2 top-20 hover:cursor-pointer z-40' onClick={()=>setshow(!show)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`w-6 h-6 transition-all ${show ? 'rotate-0': 'rotate-180'}`}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
            </button>
            <div className='grid z-30 relative grid-cols-6 '>
                <div className={`absolute lg:relative ease-in-out duration-500  lg:left-0  w-60 z-50 ${show ? 'left-0':'left-[-1000px]'}`}>
                    <div className="h-screen select-none sticky top-0 z-10 col-span-0 md:col-span-1  p-3 space-y-2  backdrop-blur-md bg-black/10 md:bg-white/10 rounded-lg dark:text-gray-100">
                        {
                            user?.uid &&
                            <>
                                <div className="flex items-center p-2 space-x-4">
                                    {
                                        isLoading ?
                                            <>
                                                <div className="flex-shrink-0 w-12 h-12 animate-pulse rounded-full dark:bg-gray-700"></div>
                                            </>
                                            :
                                            <div className=' h-12  overflow-hidden rounded-full'>

                                                <img src={`${userfromDB[0].img ? `${userfromDB[0].img}` : 'https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg'}`} alt="" className="w-12  rounded-full dark:bg-gray-500" />
                                            </div>
                                    }

                                    <div>
                                        <h2 className="text-lg font-semibold">{user?.displayName}</h2>
                                        <span className="flex items-center space-x-1">
                                            <Link to='/userprofile' className="text-xs hover:underline dark:text-gray-400">View profile</Link>
                                        </span>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="divide-y divide-gray-700">
                            <ul className="pt-2 pb-4 space-y-1 text-sm">
                                <li className="bg-base-100 dark:text-gray-50">
                                    <Link to='/' rel="noopener noreferrer" href="/" className="flex items-center p-2 space-x-3 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>

                                        <span>Search</span>
                                    </Link>
                                </li>

                                {
                                    isReporter &&
                                    <li>
                                        <Link onClick={() => handleClick('08')} to='/reporterdashboard' className="flex items-center p-2 space-x-3 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                                            </svg>


                                            <span>DashBoard</span>
                                        </Link>
                                    </li>

                                }
                                <li>
                                    <Link to='/news' onClick={() => handleClick('08')} className="flex items-center p-2 space-x-3 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                        </svg>

                                        <span>News</span>
                                    </Link>
                                </li>

                                <li>

                                    <div className="hover:cursor-pointer ease-in duration-500 rounded-box">
                                        <div onClick={() => setCollapse(!collapse)} className=" flex items-center p-2 space-x-3 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class={`w-6 h-6 transition-all ${collapse ? 'rotate-360' : 'rotate-180'}`}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>

                                            <p>Catagory</p>

                                        </div>
                                        <div className={`${collapse ? 'block ' : 'hidden'} overflow-hidden ease-in-out duration-200 transition-all px-3 `}>
                                            {
                                                catagories.map(catagory => <Link to='/news' onClick={() => handleClick(catagory.id)} key={catagory._id} className='text-normal block my-2'>{catagory.name}</Link>)
                                            }

                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="/" className="flex items-center p-2 space-x-3 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                            <path d="M203.247,386.414,208,381.185V355.4L130.125,191H93.875L16,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42A124.343,124.343,0,0,0,203.247,386.414ZM176,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,48,369.667V362.6l64-135.112L176,362.6Z"></path>
                                            <path d="M418.125,191h-36.25L304,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42a124.343,124.343,0,0,0,91.369-40.607L496,381.185V355.4ZM464,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,336,369.667V362.6l64-135.112L464,362.6Z"></path>
                                            <path d="M272,196.659A56.223,56.223,0,0,0,309.659,159H416V127H309.659a55.991,55.991,0,0,0-107.318,0H96v32H202.341A56.223,56.223,0,0,0,240,196.659V463H136v32H376V463H272ZM232,143a24,24,0,1,1,24,24A24,24,0,0,1,232,143Z"></path>
                                        </svg>
                                        <span>Orders</span>
                                    </a>
                                </li>
                                <li>
                                    <a rel="noopener noreferrer" href="/" className="flex items-center p-2 space-x-3 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                            <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                        </svg>
                                        <span>Wishlist</span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="pt-4 pb-2 space-y-1 text-sm">
                                <li>
                                    <a rel="noopener noreferrer" href="/" className="flex items-center p-2 space-x-3 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-400">
                                            <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                                            <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                                        </svg>
                                        <span>Settings</span>
                                    </a>
                                </li>
                                {
                                    user?.uid &&
                                    <>

                                        <li>
                                            <button onClick={handlelogOut} className="flex items-center p-2 space-x-3 rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                                </svg>

                                                <span>Logout</span>
                                            </button>
                                        </li>

                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='col-span-12  md:col-span-4 ml-0 md:ml-8 z-40 relative'>
                    <Outlet ></Outlet>

                </div>


                <div className="p-3 col-span-1 z-40 absolute lg:relative left-[-1000px] lg:left-0">

                    <div>
                        <div className="flex flex-col shadow-2xl items-center p-4 rounded-md  sm:px-12 bg-gradient-to-b from-slate-800 to-indigo-500 dark:text-gray-100">
                            <div className="text-center">
                                <h2 className="text-xl font-semibold">Dubai</h2>
                                <p className="text-sm dark:text-gray-400">July 29</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-32 h-32 p-6 dark:text-yellow-400 fill-current">
                                <path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"></path>
                                <rect width="32" height="48" x="240" y="16"></rect>
                                <rect width="32" height="48" x="240" y="448"></rect>
                                <rect width="48" height="32" x="448" y="240"></rect>
                                <rect width="48" height="32" x="16" y="240"></rect>
                                <rect width="32" height="45.255" x="400" y="393.373" transform="rotate(-45 416 416)"></rect>
                                <rect width="32.001" height="45.255" x="80" y="73.373" transform="rotate(-45 96 96)"></rect>
                                <rect width="45.255" height="32" x="73.373" y="400" transform="rotate(-45.001 96.002 416.003)"></rect>
                                <rect width="45.255" height="32.001" x="393.373" y="80" transform="rotate(-45 416 96)"></rect>
                            </svg>
                            <div className="mb-2 text-3xl font-semibold"> 32°
                                <span className="mx-1 font-normal">/</span>20°
                            </div>
                            <p className="dark:text-gray-400">Partly cloudy</p>
                        </div>
                        <div className='p-5 rounded-lg mt-8 bg-gradient-to-b from-slate-800 to-blue-500'>
                            <h1 className='text-4xl font-semibold text-white'>Upgrade To Premium?</h1>
                            <button className='px-4 py-1 bg-gray-900 text-white font-semibold my-2'>Vist</button>
                        </div>

                    </div>
                </div>

            </div>
            <div className='absolute pink_blur opacity-25 z-10 top-0 left-0 w-[30%] h-[60%]  rounded-full'></div>
            <div className='absolute blue__gradient opacity-25 z-10 top-16 right-0 w-[50%] h-[100%]  rounded-full'></div>
            <Footer></Footer>
        </div>
    );
};

export default Main;