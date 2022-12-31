import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const NewsDetails = () => {

    const data = useLoaderData()
    console.log(data);
    const {
        details,
        image_url,
        title,
        author,
        published_date,
    } = data
    return (
        <div>
            <div className='my-3 bg-gray-800  rounded-md shadow-lg'>
                <div className='relative rounded-md overflow-hidden' >
                    <img className='w-full transition-all hover:opacity-90 hover:scale-105  z-10' src={image_url} alt="" />
                    <div className='h-40 rounded-md w-full absolute bottom-0 z-20 bg-gradient-to-b from-transparent to-black'>
                        <h1 className='text-4xl p-2  absolute bottom-0 z-20   font-bold text-white'>{title}</h1>

                    </div>
                </div>
                <div className='px-2 py-2'>
                    <div className='flex text-white my-2  space-x-4 items-center'>
                        <img className='w-10 rounded-full' src={author?.img ? `${author.img}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="" />
                        <p>{author.name ? `${author.name}` : 'Unknown'}</p>
                    </div>
                    <p className='text-gray-200 font-xl  my-2'>{details}</p>
                    <div className='flex  justify-between items-center'>
                        <Link to={data._id} className='flex relative text-white font-semibold items-center  space-x-3 rounded-md'>
                            <div className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md transition-all p-1 duration-300 w-8 hover:w-24'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </div>

                            <span className='absolute left-6'>Details</span>
                        </Link>
                        <p className='text-sm text-white' >
                            Published Date : {author.published_date}
                        </p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default NewsDetails;