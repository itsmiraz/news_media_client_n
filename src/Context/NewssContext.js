import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';


export const NewsCatagoryContext = createContext()

const NewssContext = ({ children }) => {
    const [allnews, setAllNews] = useState([])
    const [animation, setAnimation] = useState(false)
    const [catagoryId, setCatagoryId] = useState('08')
   
   
    const { data: news, isLoading, refetch } = useQuery({
        queryKey: ['news','catagoryId'],
        queryFn: async () => {
            const res = await fetch(`https://new-media-server.vercel.app/news`)
            const data = await res.json()
            setAnimation(false)
            return data
        }
    })
//   https://new-media-server.vercel.app/catagory/${catagoryId}
   
    useEffect(() => {
       
        const newsData = news?.filter(cataNews => cataNews.category_id === catagoryId)
        setAllNews(newsData)



   },[catagoryId,news])


    

console.log(catagoryId);
    const newsData = {
        news,
        setCatagoryId,
        setAnimation,
        allnews,
        isLoading,
        refetch,
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