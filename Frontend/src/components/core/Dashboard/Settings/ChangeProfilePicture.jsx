import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ChangeProfilePicture(props) {
    const { user } = useSelector(state => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    return (
        <div className=' bg-richblack-800 flex justify-between items-start px-6 py-6 rounded-lg'>
            <div className=' flex justify-start items-center gap-2 w-full'>
                <Avatar>
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className=' flex flex-col items-start justify-center'>
                    <p className=' text-richblack-5 text-xl font-semibold'>
                        Change Profile Picture
                    </p>
                <div>
                        <input type='file' 
                            placeholder='Select'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeProfilePicture;