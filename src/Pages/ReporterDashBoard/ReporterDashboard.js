import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { NewsCatagoryContext } from '../../Context/NewssContext';
import { AuthContext } from '../../Context/UserContext';
import PostReportModal from '../PostReportModal/PostReportModal';

const ReporterDashboard = () => {
    const [modalOpen, setModalOpen] = useState('')
    const {user}= useContext(AuthContext)
    const { news } = useContext(NewsCatagoryContext)
    console.log(news); 

    return (
        <section className='grid grid-cols-2 gap-5'>
            <div>
                <div className='backdrop-blur-md rounded-md p-4 bg-black/50'>
                    <h1 className='text-xl text-white font-semibold'>Notifications</h1>
                </div>
                <div className='mt-6 p-3 flex items-center justify-between rounded-md bg-gradient-to-r from-cyan-500 to-blue-500'>
                    <h1 className='text-xl text-white font-semibold'>Post Your New Report</h1>
                    <label onClick={()=>setModalOpen(user)} htmlFor="post-report" className='px-4 py-2 font-semibold rounded-md text-white bg-gray-900'>POST</label>

                </div>
            </div>
            <div className='backdrop-blur-md rounded-md h-full  p-4 bg-black/50'>
                <h1 className='text-xl text-white font-semibold'>Your Top Posts { news?.length}</h1>
                <div>
                  
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