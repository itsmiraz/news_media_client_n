import React from 'react';
import { useContext } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import NewsCard from '../../Components/NewsCard/NewsCard';
import { NewsCatagoryContext } from '../../Context/NewssContext';
import { AuthContext } from '../../Context/UserContext';

const News = () => {

    const { isLoading, animation, allnews, refetch } = useContext(NewsCatagoryContext)
    const { user } = useContext(AuthContext)

    return (
        <section className='px-2'>
            <div>

                {
                    isLoading || animation ?
                        <>

                            <div>
                                <h1 className='text-start px-2 text-white text-4xl font-semibold'>Loading</h1>

                                <div className="flex flex-col my-6 rounded-md shadow-md animate-pulse ">
                                    <div className="h-[400px] rounded-md bg-gray-700"></div>
                                    <div className=" px-4  py-8 space-y-4 bg-slate-800">
                                        <div className="w-full h-6 rounded bg-gray-700"></div>
                                        <div className="w-full h-6 rounded bg-gray-700"></div>
                                        <div className="w-3/4 h-6 rounded bg-gray-700"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col my-6 rounded-md shadow-md animate-pulse ">
                                    <div className="h-[400px] rounded-md bg-gray-700"></div>
                                    <div className=" px-4  py-8 space-y-4 bg-slate-800">
                                        <div className="w-full h-6 rounded bg-gray-700"></div>
                                        <div className="w-full h-6 rounded bg-gray-700"></div>
                                        <div className="w-3/4 h-6 rounded bg-gray-700"></div>
                                    </div>
                                </div>
                                <div className="flex flex-col my-6 rounded-md shadow-md animate-pulse ">
                                    <div className="h-[400px] rounded-md bg-gray-700"></div>
                                    <div className=" px-4  py-8 space-y-4 bg-slate-800">
                                        <div className="w-full h-6 rounded bg-gray-700"></div>
                                        <div className="w-full h-6 rounded bg-gray-700"></div>
                                        <div className="w-3/4 h-6 rounded bg-gray-700"></div>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>

                            {
                                allnews?.length === 0 ?
                                    <div>

                                        <h1 className='text-white font-semibold text-center text-4xl'>This Catagory Has 0 Result</h1>

                                    </div>
                                    :
                                    <div>
                                        <h1 className='text-start sticky top-0 z-40 bg-slate-900/40 backdrop-blur-lg py-2 rounded-b-md px-2 text-white text-xl md:text-4xl font-semibold'>{allnews?.length} Results Found</h1>

                                        {
                                            allnews?.map(signleNews => <NewsCard
                                                key={signleNews._id}
                                                signleNews={signleNews}
                                                user={user}
                                                refetch={refetch}
                                            ></NewsCard>)
                                        }
                                    </div>
                            }

                        </>
                }

            </div>
            <ScrollRestoration></ScrollRestoration>
        </section>
    );
};

export default News;