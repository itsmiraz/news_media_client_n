import { useState } from 'react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import LoadingAnimation from './Components/LoadingAnimation/LoadingAnimation';
import { router } from './Routes/Routes';

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // simulate loading time
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  if (!loading) {
    // return the loading animation component if the app is still loading
    return <LoadingAnimation/>;
  }

  return (
    <div className='max-w-[1200px] mx-auto'>
      <RouterProvider router={router}></RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}


export default App;
