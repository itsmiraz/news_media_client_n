import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import { NewsCatagoryContext } from '../Context/NewssContext';
import { AuthContext } from '../Context/UserContext';
import useReporter from '../Hooks/UseReporter/useReporter';



const Main = () => {
    const catagories = useLoaderData()
    const [weather, setweather] = useState({})
    const apiKey = process.env.REACT_APP_OPENWHETHER_API
    const { setCatagoryId, setAnimation, refetch, seachClick } = useContext(NewsCatagoryContext)
    const [searchTerm,setsearchTerm] = useState('')
    const [collapse, setCollapse] = useState(false)
    const { user, logOut, userfromDB, isLoading } = useContext(AuthContext)
    const [isReporter] = useReporter(user?.email)
    const [lat, setlat] = useState('')
    const [long, setlong] = useState('')
    const date = new Date()
    const formatDate = format(date, 'MM-dd')
    const minTemp = Math.floor((weather?.main?.temp_min - 273.15))
    const maxTemp = Math.floor((weather?.main?.temp_max - 273.15))
    console.log(minTemp, maxTemp)
    useEffect(() => {

        navigator.geolocation.getCurrentPosition((position) => {
            setlat(position.coords.latitude)
            setlong(position.coords.longitude)
            console.log(position);
        })

        if (lat && long) (
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setweather(data)
                })
        )

    }, [lat, long, apiKey])




    const [show, setshow] = useState(false)

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



    console.log()
    return (
        <div className=''>
            <Header></Header>
            <button className='absolute bg-white rounded-full lg:hidden text-black p-1 right-2 top-20 hover:cursor-pointer z-40' onClick={() => setshow(!show)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`w-6 h-6 transition-all ${show ? 'rotate-0' : 'rotate-180'}`}>
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
            </button>
            <div className='grid z-30 relative grid-cols-6 '>
                <div className={`absolute lg:relative ease-in-out duration-500  lg:left-0  w-60 z-50 ${show ? 'left-0' : 'left-[-1000px]'}`}>
                    <div className="h-screen select-none sticky top-0 z-10 col-span-0 md:col-span-1  p-3 space-y-2  backdrop-blur-md bg-black/10 md:bg-white/10 rounded-lg text-gray-100">
                        {
                            user?.uid &&
                            <>
                                <div className="flex items-center p-2 space-x-4">
                                    {
                                        isLoading ?
                                            <>
                                                <div className="flex-shrink-0 w-12 h-12 animate-pulse rounded-full bg-gray-700"></div>
                                            </>
                                            :
                                            <div className=' h-12  overflow-hidden rounded-full'>

                                                <img src={`${userfromDB[0].img ? `${userfromDB[0].img}` : 'https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg'}`} alt="" className="w-12  rounded-full bg-gray-500" />
                                            </div>
                                    }

                                    <div>
                                        <h2 className="text-lg font-semibold">{user?.displayName}</h2>
                                        <span className="flex items-center space-x-1">
                                            <Link to='/userprofile' className="text-xs hover:underline text-gray-400">View profile</Link>
                                        </span>
                                    </div>
                                </div>
                            </>
                        }
                        <div className="divide-y divide-gray-700">
                            <ul className="pt-2 pb-4 space-y-1 text-sm">
                                <li className="bg-base-100 text-gray-50">
                                    <p className="flex items-center p-2 space-x-3 rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                        </svg>
                                        <input type="text"  onChange={(e)=>setsearchTerm(e.target.value)} className='w-full bg-transparent focus:outline-none ' />
                                        <Link to='/news' onClick={()=>seachClick(searchTerm)}>Search</Link>
                                    </p>
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


                            </ul>
                            <ul className="pt-4 pb-2 space-y-1 text-sm">

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
                        <div className="flex flex-col shadow-2xl items-center p-4 rounded-md  sm:px-12 bg-gradient-to-b from-slate-800 to-indigo-500 text-gray-100">
                            <div className="text-center">
                                <h2 className=" font-semibold">{weather?.name}</h2>
                                <p className="text-sm text-gray-100">Date: {formatDate}</p>
                            </div>
                            {
                                weather?.weather && <p className=" text-3xl font-bold text-gray-100">{weather.weather[0]?.main}</p>
                            }
                            <div className="mb-2 text-3xl font-semibold">{minTemp}°
                                <span className="mx-1 font-normal">/</span>{maxTemp}°
                            </div>

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