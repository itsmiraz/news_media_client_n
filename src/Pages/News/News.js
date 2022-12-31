import React from 'react';
import { useContext } from 'react';
import NewsCard from '../../Components/NewsCard/NewsCard';
import { NewsCatagoryContext } from '../../Context/NewssContext';

const News = () => {

    const { news, isLoading, animation } = useContext(NewsCatagoryContext)


    return (
        <section>
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
                            <h1 className='text-start px-2 text-white text-4xl font-semibold'>{news?.length} Results Found</h1>

                            {
                                news?.map(signleNews => <NewsCard
                                    key={signleNews._id}
                                    signleNews={signleNews}
                                ></NewsCard>)
                            }

                        </>
                }

            </div>
        </section>
    );
};

export default News;