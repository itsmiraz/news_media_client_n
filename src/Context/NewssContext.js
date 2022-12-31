import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';


export const NewsCatagoryContext = createContext()

const NewssContext = ({ children }) => {
    const [animation, setAnimation] = useState(false)
    const [catagoryId, setCatagoryId] = useState('08')
    const { data: news, isLoading, refetch } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/catagory/${catagoryId}`)
            const data = await res.json()
            setAnimation(false)
            return data
        }
    })


    const handleCatagoryId = (id) => {
        console.log(id);
        setAnimation(true)
        setCatagoryId(id)
        refetch()
      
    }



    const newsData = {
        news,
        handleCatagoryId,
        isLoading,
        animation
    }
    return (
        <NewsCatagoryContext.Provider value={newsData}>
            {
                children
            }
        </NewsCatagoryContext.Provider>
    );
};

export default NewssContext;