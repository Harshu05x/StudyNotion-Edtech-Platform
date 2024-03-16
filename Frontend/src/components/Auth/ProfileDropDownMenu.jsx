import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '@/services/operations/authApis';


  

function ProfileDropDownMenu(props) {
    const {user} = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className=" ">
                    <Avatar>
                        <AvatarImage src={user.image} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" text-lg">
                    <DropdownMenuLabel className=" text-base hover:bg-richblack-50 rounded-md ">
                        <button onClick={ () => navigate("/dashboard/my-profile")}>
                            Dashboard
                        </button>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className=" bg-richblack-200"/>
                    <DropdownMenuLabel className=" text-base hover:bg-destructive rounded-md hover:text-white
                        transition-all duration-200 ">
                        <Link className=' flex items-center justify-between'
                            onClick={ () => dispatch(Logout(navigate))}
                        >
                            Log Out <FaArrowRightFromBracket />
                        </Link>
                    </DropdownMenuLabel>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default ProfileDropDownMenu;