import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const NewsCard = ({ signleNews, user, refetch }) => {

    const [like, setLike] = useState(false)
    const [disLike, setDislike] = useState(false)

    const {
        details,
        image_url,
        title,
        author,
        upVote,
        downVote,
        _id
    } = signleNews




    const handleLike = (id) => {
        const userData = {
            userName: user?.displayName,
            userEmail: user?.email
        }
        fetch(`http://localhost:5000/likepost/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch()
            })
    }
    const handledilike = (id) => {
        const userData = {
            userName: user?.displayName,
            userEmail: user?.email
        }
        fetch(`http://localhost:5000/dislikepost/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                refetch()
            })
    }

    useEffect(() => {
        console.log('start')


        const likedpost = upVote.find(votes => votes.userEmail === user?.email)
        console.log('likedpost', likedpost)
        const dislikePost = downVote.find(votes => votes.userEmail === user?.email)
        if (likedpost) {

            setLike(true)
            console.log('liked');
            return
        }
        else if (dislikePost) {
            setDislike(true)
            return
        }

        else {
            setLike(false)
            setDislike(false)
            console.log('false');
            return
        }

    }, [user?.email, downVote, upVote])


    console.log(signleNews);

    return (
        <div className='my-3 bg-gray-800   rounded-md shadow-lg'>
            <div className='relative rounded-md overflow-hidden' >
                <img className='w-full transition-all hover:opacity-90 hover:scale-105  z-10' src={image_url} alt="" />
                <div className='h-40 rounded-md w-full absolute bottom-0 z-20 bg-gradient-to-b from-transparent to-black'>
                    <h1 className='text-xl md:text-4xl p-2  absolute bottom-0 z-20   font-bold text-white'>{title}</h1>

                </div>
            </div>
            <div className='px-2 py-2'>
                <div className=' flex justify-between items-center my-2'>

                    <p className='text-gray-200 text-normal  md:font-xl  my-2'>{details.slice(0, 150)}..</p>
                    <p className='text-sm text-white' >
                        Published Date : {author.published_date}
                    </p>
                </div>
                <div className='flex px-2 justify-between items-center'>

                    <div className='flex items-center  gap-x-4'>
                        <div className='flex items-center'>

                            <p className='text-2xl'>{upVote?.length}</p>

                            <button disabled={ disLike} className='disabled:text-gray-800 disabled:cursor-not-allowed' onClick={() => handleLike(_id)} >

                                <svg xmlns="http://www.w3.org/2000/svg" className={`w-10  h-10   ${like ? 'text-blue-800' : 'text-blue-100'}`} viewBox="0 0 24 24"><path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12H15z" /></svg>
                            </button>

                        </div>

                        <div className='flex items-center'>
                            <p className='text-2xl'>{downVote?.length}</p>
                            <button disabled={ like} className='disabled:text-gray-800 disabled:cursor-not-allowed' onClick={() => handledilike(_id)}>
                                <svg  xmlns="http://www.w3.org/2000/svg" className={`w-10   h-10 rotate-180 ${disLike ? 'text-blue-800' : 'text-blue-100'} `} viewBox="0 0 24 24"><path fill="currentColor" d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601L17.919 12H15z" /></svg>
                            </button>


                        </div>
                    </div>
                    <div className=''>
                        <Link to={`/news/${signleNews._id}`} className='flex px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500  relative text-white font-semibold items-center  space-x-3 rounded-md'>
                            {/* <div className='bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md transition-all p-1 duration-300 w-8 hover:w-24'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </div> */}

                            <span className=''>Details</span>
                        </Link>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default NewsCard;