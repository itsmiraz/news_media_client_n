import React from 'react';
import Stats from './Stats';

const Home = () => {
	return (
		<div className='pl-8 pr-5 py-3 z-20'>
			<div className="bg-gradient-to-r from-violet-600 to-pink-500 z-30 relative rounded-2xl shadow-2xl w-full text-gray-100">
				<div className="container flex flex-col justify-center p-6 mx-auto py-8 lg:flex-row lg:justify-between">
					<div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
						<h1 className="text-3xl font-bold md:text-4xl ">
							<span className='text-6xl font-mono'>Stay informed and engaged</span>
							<br />
							with the latest news <span className='text-blue-400'>updates</span> on our website
						</h1>
						<p className="mt-6 mb-4 text-lg">Subscribe for our Daily News Letter
							{/* <br className="hidden md:inline lg:hidden">turpis pulvinar, est scelerisque ligula sem */}
						</p>
						<div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
							<button rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded bg-gray-800 text-gray-100">Subscribe</button>
						</div>
					</div>
					
				</div>
			</div>
			<Stats></Stats>
			
		</div>
	);
};

export default Home;