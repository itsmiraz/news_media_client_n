import React from 'react';
import { toast } from 'react-hot-toast';

const BecomeAReporterModal = ({ setOpen,open }) => {
    const handleConfirm = (e) => {
        e.preventDefault()
        const userdata = {
            userPhone: e.target.phone.value
        }
        console.log(userdata);
        fetch(`https://new-media-server.vercel.app/becomereporter?email=${open?.email}`, {
            method: 'PUT',
            headers: {
                'content-type':'application/json'
            },
            body:JSON.stringify(userdata)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                toast.success('Congratulations You Become a Reporter')
                setOpen('')
        })
        
    }
  
  
    return (
        <div className='relative'>

            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal bg-transparent">
                <form onSubmit={handleConfirm} className="modal-box text-white rounded relative">
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <span className='font-semibold'>Become A Reporter</span>
                   
                    <input readOnly defaultValue={open?.displayName} type="text" placeholder="Your Name" className="input input-bordered w-full my-2" />
                    <input readOnly defaultValue={open?.email} type="text" placeholder="Your Email" className="input input-bordered w-full my-2" />
                    <input required name='phone' type="text" placeholder="Your Phone Number" className="input input-bordered w-full my-2" />
                    <div className="form-control my-2">
                        <label className="flex items-center gap-x-4 cursor-pointer">
                            <input required type="checkbox" className="checkbox" />
                            <span className="label-text underline">Accept Term and Contdition</span>
                        </label>
                    </div>
                    <button type='submit' className='px-4 w-full bg-blue-500 my-2 py-2 font-semibold rounded'>Confirm</button>
                </form>
            </div>
        </div>
    );
};

export default BecomeAReporterModal;