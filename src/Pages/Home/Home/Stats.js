import React from 'react';

const Stats = () => {
    return (
        <div>
            <section className="p-6 my-8 rounded-b-xl dark:bg-gray-800 dark:text-gray-100">
                <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">1050+</p>
                        <p className="text-sm sm:text-base">Clients</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">89K</p>
                        <p className="text-sm sm:text-base">Followers on social media</p>
                    </div>
                    <div className="flex flex-col justify-start m-2 lg:m-6">
                        <p className="text-4xl font-bold leading-none lg:text-6xl">3</p>
                        <p className="text-sm sm:text-base">Published books</p>
                    </div>
                  
                </div>
            </section>
        </div>
    );
};

export default Stats;