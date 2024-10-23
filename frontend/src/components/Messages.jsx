import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllMessage from '@/hooks/useGetAllMessage';
import useGetRTM from '@/hooks/useGetRTM';

const Messages = ({ selectedUser }) => {
    useGetRTM();
    useGetAllMessage();
    const {user} = useSelector(store=>store.auth)
    const {messages} = useSelector(store=>store.chat)
    return (
        <>
            <div className='overflow-y-auto flex-1 p-4'>
                <div className='flex justify-center'>
                    <div className='flex flex-col items-center justify-center'>
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={selectedUser?.profilePicture} alt="profile"></AvatarImage>
                        <AvatarFallback><img src="https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png" alt="" /></AvatarFallback>
                    </Avatar>
                 <span>{selectedUser?.username}</span>
                 <Link to={`/profile/${selectedUser?._id}`}> <Button className="h-8 my-2" variant="secondary">View profile</Button></Link>
                    </div>
                
                </div>
                <div className='flex flex-col gap-3'>
                  {
                     messages && messages.map((msg)=>{
                       return(
                        <div className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'} `}>
                            <div className={`p-2 rounded-lg max-w-xs break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black' }`}>
                                {msg.message}
                            </div>
                        </div>
                       ) 
                      })
                  }
                </div>
            </div>
        </>
    )
}

export default Messages;