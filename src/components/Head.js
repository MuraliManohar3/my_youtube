import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { useState } from 'react';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';
const Head = () => {

    //BINDING INPUT BOX WITH STATE VARIABLE
    const [searchQuery,setSearchQuery] = useState("");

    //for search list state variable
    const [suggestions,setSuggestions]= useState([]);
    // console.log(searchQuery);

    const [showSuggestions,setShowSuggestions]= useState(false);


    const searchCache= useSelector((store)=>store.search);

    useEffect(()=>{
     //API call
     //make an api call after every key press but if the difference between e api calls is <200ms decline the api call
   const timer= setTimeout(()=> {


    if(searchCache[searchQuery]){
        setSuggestions(searchCache[searchQuery]);
    }
    else{
        getSearchSuggestions()
    }
    },200);

   return ()=>{
    clearTimeout(timer);
   };
   },[searchQuery]);

  /*
  key-i 
    -render the component
    useEffect();
    start timer=> make api call after 200ms


    key-ip
   reconcialiation triggers,...destroy the component (useEffect return method)
   re-render the component
   useEffect()
   start timer -> make api call after 200ms




  setTimeout(200)



  */
    const getSearchSuggestions =async ()=>{
        // console.log("API CALL"+searchQuery);

        const data= await fetch(YOUTUBE_SEARCH_API+searchQuery);
        const json =await data.json();
        // console.log(json[1]);
        setSuggestions(json[1]);
        // //update cache
        dispatch(cacheResults({
            [searchQuery] : json[1],
        }));


    }


    const dispatch = useDispatch(); //from react-redux
    const toggleMenuHandler=()=>{
        dispatch(toggleMenu())
    }

  return (
    <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
        <div className='flex col-span-1'>
            <img 
            onClick={()=> toggleMenuHandler()}

            className='h-8 cursor-pointer'
            alt="menu" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8iICGSkZIkHyEPDA3z8vIyMTEhGx40MDEeHB4jICEeHR4AAAAxMTEgHh4gHB3W1tYtKyyXlpe6uroKBQhzcnJ+fX7CwsKysrJmZWX19fXk5OQYFhc5ODgoJidta2xUVFRfXV7Kysqsq6yjo6MHDa+eAAAB8UlEQVR4nO3c3VLaQBgGYJY/IQtE1Iogrfbn/q+xCaQ2TqtFm222+jwHDC8MMO8EdjnY+QYDAAAAAAAAAAAAAAAAeI/OL4Z5uDhP0m+yXYwzcbX4cJug4d045GN8Pem84GYd+67VUq6/dN7wou9Sjy1u0jQcjUZ9V2skaHhZfUuLbBrGYtN5w8F2HLNpGFOsNIPddlo3XGUgTK9T7BbVFzWbHX+zS1IQAAAAAAAAAABeZJKHVPXO76dHs9msul1OH+JfpOmr0ufuz15Wbhb78uzBvJzPWym2U/XU6Sk+lc6eTnEfv3Zf8PZjeTib2AihnYpwOJl5Qhp1kULY33d/1Pvbp9XTDcO/bhjGl503HD5uUX/Mn1PxTPr964pTUkhygra+hj9U16V10LS6+/pUtFLxTAo/00GCa1j/DhtFDw2Lxw1T/A7rtTRWS+ZhES2rdS3O22lep/qBX1LZSmetFI+pfvzk1HximrW03g9ns4edadboIy2XafbDWt9/Zhqp6gEAAAAAAAAAwAu89Zl7u+00xFXse2ZiLdHcxO24PLx7DpLMvrxcHy9f3+WOUswvHYZVRg2TTNktqnqjTCa0Jmm4WZcZNUwxC3pwd5VPwyLJlN3JdnHV9zD2RqKZ7G9/rj4AAAAAAAAAAAAAAAD8T74DVhZG6MsBqOQAAAAASUVORK5CYII=" />
            <a href='/'>
            <img 
            className='h-8 mx-2'
            alt="youtube-logo" src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"  />
            </a>
        </div>
        <div className='col-span-10 px-10'>
            <div>
            <input className=' px-5 w-1/2 border border-gray-400 p-2 rounded-l-full' type="text" value={searchQuery}
            onChange={(e)=>setSearchQuery(e.target.value)}
            onFocus={()=> setShowSuggestions(true)}
            onBlur={()=> setShowSuggestions(false)}
            />
            <button className='border border-gray-400 py-2 px-5 rounded-r-full bg-gray-100'>🔍</button> 
            </div>
            {showSuggestions && <div className='absolute bg-white px-5 py-2 w-[37rem] border shadow-lg border-gray-100 rounded-lg'>
                <ul>
                    {suggestions.map(s=><li key={s} className='py-2 px-3 shadow-sm hover:bg-gray-100'>🔍{s}</li>)}
                </ul>
            </div>}
        </div>
        
        <div className='col-span-1'>
            <img
            className='h-8'
            alt="user" src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
        </div>
    </div>
    
  );
}



export default Head