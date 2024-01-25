import React from 'react'

const commentsData= [
    {
        name: "Murali Manohar",
        text:"Lorem ipsum hello hi",
        replies:[],
    },
    {
        name: "Murali Manohar",
        text:"Lorem ipsum hello hi",
        replies:[
            {
                name: "Murali Manohar",
                text:"Lorem ipsum hello hi",
                replies:[],
            },
            {
                name: "Murali Manohar",
                text:"Lorem ipsum hello hi",
                replies:[
                    {
                        name: "Murali Manohar",
                        text:"Lorem ipsum hello hi",
                        replies:[],
                    },
                    {
                        name: "Murali Manohar",
                        text:"Lorem ipsum hello hi",
                        replies:[],
                    },
                ],
            },
        ],
    },
    {
        name: "Murali Manohar",
        text:"Lorem ipsum hello hi",
        replies:[

        ],
    },
    {
        name: "Murali Manohar",
        text:"Lorem ipsum hello hi",
        replies:[

        ],
    },
    {
        name: "Murali Manohar",
        text:"Lorem ipsum hello hi",
        replies:[

        ],
    },
    {
        name: "Murali Manohar",
        text:"Lorem ipsum hello hi",
        replies:[

        ],
    },
    
];

const Comment=({data})=>{
    const {name,text,replies}= data;
    return (
    <div className='flex shadow-sm bg-gray-100 p-2 rounded-lg my-2'>
        <img className="w-8 h-8" alt="user" src="https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"  />
        <div className='px-3'>
            <p className='font-bold'>{name}</p>
            <p>{text}</p>
        </div>
    </div>
    );
};

const CommentsList= ({comments})=>{
    return comments.map((comment,index)=>
    <div key={index}>
      <Comment data={comment}/>
        <div className='pl-5 border border-l-black ml-5'>
            <CommentsList comments={comment.replies} />
        </div>
      </div>
     );
};

const CommentsContainer = () => {
  return (
    <div className='m-5 p-2'>
        <h1 className='font-bold text-2xl'>Comments:</h1>
        <CommentsList comments={commentsData}/>
        {/* <Comment data={commentsData[0]} /> */}
    </div>

  );
};



export default CommentsContainer;