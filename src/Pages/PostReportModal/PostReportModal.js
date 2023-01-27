import { useQuery } from '@tanstack/react-query';
import { format, getDate } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { AuthContext } from '../../Context/UserContext';

const PostReportModal = ({ modalOpen, setModalOpen }) => {
    const data = new Date()
    const newDate = format(data,'PP')
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState('')
    const imgHostKey = process.env.REACT_APP_imgbbKey
    const { userfromDB } = useContext(AuthContext)
    const [animation, setAnimation] = useState(false)

    const date = getDate(new Date())
    console.log(date)

    const { data: catagories, isLoading } = useQuery({
        queryKey: ['catagories'],
        queryFn: async () => {
            const res = await fetch('https://new-media-server.vercel.app/catagory')
            const data = await res.json()
            return data
        }
    })

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        else {
            const objectUrl = URL.createObjectURL(selectedFile)
            setPreview(objectUrl)

            // free memory when ever this component is unmounted
            return () => URL.revokeObjectURL(objectUrl)
        }
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        else {
            const filesize = e?.target?.files.item(0).size
            const filemb = filesize / 1024
            if (filemb > 500) {
                toast.error('Please Upload a photo under 500kb')
            }
            else {
                setSelectedFile(e.target.files[0])
            }
        }
    }


    console.log(selectedFile);

    const handleAddPost = e => {
        e.preventDefault()
        // setModalOpen('')
        setAnimation(true)
        const image = selectedFile
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
                setAnimation(false)
                const form = e.target
                const category_id = form.catagory_id.value;
                const author = {
                    name: modalOpen?.displayName,
                    published_date: newDate,
                    email:modalOpen?.email,
                    img: userfromDB[0]?.img,

                }
                const post = {
                    author,
                    category_id,
                    image_url: imgData.data.url,
                    title: form.title.value,
                    details: form.details.value,
                    upVote: 0,
                    downVote: 0,
                    comments:[],


                }
               

                fetch('https://new-media-server.vercel.app/postnews', {
                    method: 'POST',
                    headers: {
                        'content-type':'application/json',
                    },
                    body:JSON.stringify(post)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        toast.success('Posted')
                        setModalOpen('')
                        navigate('/reporterdashboard')
                })
               
            })



    }
    console.log(newDate);
    return (
        <div>

            <input type="checkbox" id="post-report" className="modal-toggle" />
            <div className="modal bg-black/40">
                <div className="modal-box text-white rounded-md relative">
                    <label htmlFor="post-report" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg mb-2 font-bold">Post Your Report</h3>

                    <form onSubmit={handleAddPost} className='relative'>
                        {
                            preview ?
                                <div className='relative'>
                                    <img src={preview} className='rounded' alt="" />
                                    <button onClick={() => setPreview(undefined)} className='absolute bg-gray-100 text-gray-900 rounded-full w-6 h-6 top-4 left-4'>✕</button>
                                </div>
                                :
                                <>
                                    <div className=' relative flex flex-col justify-center items-center bg-gray-700 shadow-lg rounded-md py-4'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                        <input required type="file" onChange={onSelectFile} className='w-full h-full  opacity-0 bg-red-500 absolute' />
                                        <p>Upload Photo</p>
                                    </div>
                                </>
                        }
                        <div className="form-control w-full ">
                           
                            <input required name='title' type="text" placeholder="Title" className=" border-b p-2 my-2 border-gray-400 bg-transparent w-full " />

                        </div>
                       

                        <div className="form-control w-full ">
                          
                            <textarea required type="text" name='details' placeholder="Description" className="bg-transparent border-b border-gray-400 my-4 input-bordered h-24 p-2 w-full " />

                        </div>
                        {
                            isLoading ?
                                <>
                                </>
                                :
                                <>
                                    <div className="form-control my-2 w-full max-w-xs">
                                       
                                        <select required name='catagory_id' className="select w-full rounded select-bordered">
                                            <option disabled selected>Select Catagory</option>
                                            {
                                                catagories.slice(0,7).map(catagory => <option value={catagory.id} key={catagory._id}>{catagory.name}</option>)
                                            }
                                        </select>

                                    </div>
                                </>

                        }
                        <button type='submit' className='w-full py-2 font-semibold text-white bg-blue-500 mt-4 rounded-md'>Post</button>

                        {
                            animation &&
                            <>
                                <div className='flex justify-center w-full h-full absolute top-0 items-center'>
                                    <HashLoader color="#ffffff" />
                                    <div className='bg-gray-700 w-full top-0 rounded-md opacity-40 absolute h-full'>

                                    </div>
                                </div>

                            </>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostReportModal;