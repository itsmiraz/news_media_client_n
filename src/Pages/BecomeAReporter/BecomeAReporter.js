import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../Context/UserContext';
import BecomeAReporterModal from './BecomeAReporterModal';

const BecomeAReporter = () => {
    const { user } =useContext(AuthContext)
    const [open, setOpen] = useState('')

    return (
        <div>
            <section className="py-6  backdrop-blur-md bg-black/40 rounded-md text-gray-100">
                <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
                    <h1 className="text-5xl font-bold leading-none text-center">Become a Reporter ?</h1>
                    <p className="pt-2 font-semibold text-center">If you want to be a reporter for us you have to provide your some personal details. And Our Moderator's will verify that.</p>

                    <label onClick={()=>setOpen(user)}  htmlFor="my-modal-3" className="px-8 py-3 text-lg font-semibold rounded bg-gray-800 text-gray-50">Get Started</label>
                </div>
            </section>
            {
                open &&
                <BecomeAReporterModal
                        open={open}
                setOpen={setOpen}
                ></BecomeAReporterModal>
            }

        </div>


    );
};

export default BecomeAReporter;