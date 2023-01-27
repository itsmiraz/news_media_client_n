import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/UserContext';
const UserProfile = () => {
    const { user, userfromDB, isLoading, refetch } = useContext(AuthContext)
    const [animation, setAnimation] = useState(false)
    const [fileList, setFileList] = useState([]);
    const imgHostKey = process.env.REACT_APP_imgbbKey
    const [editName, setEditName] = useState(false)
    const [userImage, setUserImage] = useState('')

    useEffect(() => {
        if (fileList?.target?.files[0]) {

            const filesize = fileList?.target?.files.item(0).size
            const filemb = filesize / 1024
            if (filemb > 500) {
                alert('Please Upload a photo under 500kb')
            }
            else {

                const image = fileList?.target?.files[0];
                console.log(image)
                setAnimation(true)
                const formData = new FormData();
                formData.append('image', image);
                const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`
                fetch(url, {
                    method: 'POST',
                    body: formData,
                })
                    .then(res => res.json())
                    .then(imgData => {
                        console.log(imgData)
                        setUserImage(imgData?.data?.url)
                        setAnimation(false)
                    })

            }




        }


    }, [fileList?.target?.files, imgHostKey])

    // 

    const handleEdit = () => {
        console.log('clicked');

        const updateDoc = {
            img: userImage

        }

        fetch(`https://new-media-server.vercel.app/updateUser?email=${user?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateDoc)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch()
                setUserImage('')
                toast.success('Updated')
            })

    }

    console.log(userfromDB)

    return (
        <div>
            {
                isLoading ?
                    <div className=' '>
                        <div className="py-4 rounded shadow-md w-72 sm:w-80 animate-pulse dark:bg-gray-900">
                            <div className="flex justify-center p-4 space-x-4 sm:px-8">
                                <div className="flex-shrink-0 w-32 h-32 rounded-full dark:bg-gray-700"></div>

                            </div>
                            <div className="p-4 space-y-4 sm:px-8">
                                <div className="w-full h-4 rounded dark:bg-gray-700"></div>
                                <div className="w-full h-4 rounded dark:bg-gray-700"></div>
                                <div className="w-3/4 h-4 rounded dark:bg-gray-700"></div>
                            </div>
                        </div>

                    </div>
                    :
                    <div className=' flex '>
                        <div className="py-4 relative rounded shadow-md w-72 sm:w-80  dark:bg-gray-900">
                            <div className="flex p-4 space-x-4 sm:px-8">
                                {
                                    animation ?
                                        <>
                                            <div className="flex-shrink-0 w-32 h-32 rounded-full dark:bg-gray-700"></div>

                                        </>
                                        :
                                        <>
                                            {
                                                userImage ?
                                                    <div className='overflow-hidden h-32 rounded-full'>
                                                        <img className='w-32 rounded-full ' src={userImage} alt="" />
                                                    </div>
                                                    :
                                                    <div className='overflow-hidden h-32 rounded-full'>
                                                        <img className='w-32 rounded-full' src={`${userfromDB[0]?.img ? `${userfromDB[0].img}` : 'https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg'}`} alt="" />

                                                    </div>
                                            }
                                        </>
                                }
                            </div>
                            <div className="dropdown absolute top-0 right-2  dropdown-end">
                                <label tabIndex={0} className=" m-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>
                                </label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-600 rounded-box w-52">
                                    <li><div className='relative'>
                                        Update Avater
                                        <input onChange={setFileList} className='absolute opacity-0' type="file" />
                                    </div></li>
                                </ul>
                            </div>
                            <div className="p-4 ">
                                <div className="w-full ">
                                    <div className='flex items-center text-white gap-2'>
                                        {
                                            editName ?
                                                <>
                                                    <input type="text" defaultValue={user?.displayName} className='text-gray-900 px-2 py-1' />
                                                    <button onClick={() => setEditName(!editName)}>Save</button>
                                                    <button onClick={() => setEditName(!editName)}>Cancel</button>
                                                </>
                                                :
                                                <>
                                                    <p className='text-xl '>{user?.displayName}</p>
                                                    <button onClick={() => setEditName(!editName)}>
                                                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                        </svg>
                                                        </span>
                                                    </button>
                                                </>
                                        }

                                    </div>
                                    <p className='my-2'>{user?.email}</p>
                                    {
                                        userImage &&
                                        <>

                                            <button onClick={handleEdit} className='px-4 py-1 bg-white text-gray-900 rounded'>Save</button>
                                        </>
                                    }
                                </div>
                            </div>

                        </div>

                    </div>
            }
        </div>
    );
};

export default UserProfile;