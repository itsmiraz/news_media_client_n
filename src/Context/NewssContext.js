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
        queryKey: ['news','catagoryId','upVote','newsDetails'],
        queryFn: async () => {
            const res = await fetch(`https://new-media-server.vercel.app/news`)
            const data = await res.json()
            setAnimation(false)
            return data
        }
    })

   
    useEffect(() => {
       
        if (catagoryId === "08") {
           setAllNews(news)
        }
        else {
            const newsData = news?.filter(cataNews => cataNews.category_id === catagoryId)
            setAllNews(newsData)
        }



   },[catagoryId,news])

//    value.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    const seachClick = (search) => {
        const filteredData = news?.filter(singleNews=>singleNews.title.toLowerCase().includes(search.toLowerCase()))
        setAllNews(filteredData)
        return
    } 
    

console.log(catagoryId);
    const newsData = {
        news,
        setCatagoryId,
        setAnimation,
        seachClick,
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