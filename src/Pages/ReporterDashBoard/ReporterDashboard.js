import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { NewsCatagoryContext } from '../../Context/NewssContext';
import { AuthContext } from '../../Context/UserContext';
import PostReportModal from '../PostReportModal/PostReportModal';

const ReporterDashboard = () => {
    const [modalOpen, setModalOpen] = useState('')
    const { user } = useContext(AuthContext)
    const { news } = useContext(NewsCatagoryContext)
    console.log(news);


    const reporternews = news?.filter(singlenews => singlenews?.author?.email === user.email)
    console.log(reporternews)
    return (
        <section className='grid grid-cols-2 gap-5'>
            <div>
                <div className='backdrop-blur-md rounded-md p-4 bg-black/50'>
                    <h1 className='text-xl text-white font-semibold'>Notifications</h1>
                </div>
                <div className='mt-6 p-3 flex items-center justify-between rounded-md bg-gradient-to-r from-cyan-500 to-blue-500'>
                    <h1 className='text-xl text-white font-semibold'>Post Your New Report</h1>
                    <label onClick={() => setModalOpen(user)} htmlFor="post-report" className='px-4 py-2 font-semibold rounded-md text-white bg-gray-900'>POST</label>

                </div>
            </div>
            <div className='backdrop-blur-md rounded-md h-full  p-4 bg-slate-900'>
                <h1 className='text-xl text-white font-semibold'>Your Top Posts {reporternews?.length}</h1>
                <div>
                    {
                        reporternews?.map(singleNews => <div className='flex shadow-lg rounded my-4 justify-between items-center ' key={singleNews._id}>
                            <div className='flex justify-start gap-2 items-center'>
                                <img src={singleNews.image_url} className='rounded w-20 ' alt="" />
                                <h1 className='text-white font-semibold'>{singleNews.title}</h1>
                            </div>
                            <div className="dropdown my-0 dropdown-end py-0 p-0 m-0">
                                <label tabIndex={0} className="mx-1 py-0 my-0 "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                                </label>
                                <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a className='text-white' href='/'>Edit</a></li>
                                    <li><a className='text-white' href='/'>Delete</a></li>
                                </ul>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            {
                modalOpen &&
                <PostReportModal
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                ></PostReportModal>
            }
        </section>
    );
};

export default ReporterDashboard;