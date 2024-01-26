import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/chatSlice';
 import { generateRandomName } from '../utils/helper';
import { makeRandomMessage } from '../utils/helper';
import { useState } from 'react';
const LiveChat = () => {

const [liveMessage,setLiveMessage]= useState("");

const dispatch= useDispatch();

const chatMessages= useSelector(store=>store.chat.messages);


    useEffect(()=>{
       const i=  setInterval(()=>{
        //api polling is done using useEffect()
        console.log('API POLLING');
        //every 2 sec this msg is pushed into our store
        dispatch(addMessage({
            name: generateRandomName(),
            message: makeRandomMessage(20),
        })
        );
        },3000);

        return ()=> clearInterval(i); 
    },[]);

  return (
    <>
    <div className=' flex flex-col-reverse ml-2 w-full h-[600px] p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll '>
       <div>
        {
       chatMessages.map((c,i)=>(<ChatMessage    name={c.name} message={c.message} key={i}/>
       ))
        }        
      </div>
      </div>
      <form className='w-full p-2 ml-2 border border-black'
       onSubmit={(e)=>{
          e.preventDefault();
          dispatch(addMessage({
            name:"siva",
            message: liveMessage,
          })
          );
          setLiveMessage("");
       }}>
        <input  className='w-96 px-2' type="text" value={liveMessage}
        onChange={(e)=>{
            setLiveMessage(e.target.value);
        }}/>
        <button className='px-2 x-2 bg-green-100'>Send</button>
      </form>
    </>
  );
};

export default LiveChat