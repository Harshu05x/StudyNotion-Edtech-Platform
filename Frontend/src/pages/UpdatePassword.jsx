import { resetPassword } from '@/services/operations/authApis';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function UpdatePassword(props) {
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [newPasswordFlag, setNewPasswordFlag] = useState(false);
    const dispacth = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    function submitHandler(e) {
        e.preventDefault();

        if(password === "" || confirmPassword === "")
            toast.error("Both fields are required");
        else if(password !== confirmPassword)
            toast.error("Password don't match");
        else{
            const token = location.pathname.split("/").at(-1);
            console.log(token);
            dispacth(resetPassword(password,confirmPassword,token,navigate));
        }
        
    }
    return (
        <div className=' flex justify-center items-center my-auto'>
            <div className=' flex flex-col w-9/12 sm:w-6/12 lg:w-4/12 mx-auto gap-7 lg:px-8'>
                <h1 className=' flex text-3xl text-richblack-5 font-semibold text-center mx-auto'>
                  Choose New Password
                </h1>
                <p className=' text-richblack-100 text-base'>
                    Almost done. Enter your new password and youre all set.
                </p>
                <form onSubmit={submitHandler}
                className=' flex flex-col items-start justify-center gap-6 w-full'>
                    <div className=' flex flex-col items-start justify-center gap-1 w-full relative'>
                        <label className=' text-richblack-300 text-base '
                            htmlFor={"password"}>
                            New Password <sup className=' text-destructive'>*</sup>
                            <span
                                onClick={() => setPasswordFlag((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    passwordFlag ? 
                                    (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : 
                                    (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )
                                }
                            </span>
                        </label>
                        <input
                            id='password'
                            placeholder="Enter New Password"
                            type={`${!passwordFlag ? "password" : "text"}`}
                            name="password"
                            value={password}
                            onChange={ (e) => setPassword(e.target.value)}
                            className=' px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
                    </div>
                    <div className=' flex flex-col items-start justify-center gap-1 w-full relative'>
                        <label className=' text-richblack-300 text-base'
                            htmlFor={"newPassword"}>
                            Confirm New Password <sup className=' text-destructive'>*</sup>
                            <span
                                onClick={() => setNewPasswordFlag((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {
                                    newPasswordFlag ? 
                                    (
                                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : 
                                    (
                                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )
                                }
                            </span>
                        </label>
                        <input
                            id='newPassword'
                            placeholder="Confirm New Password"
                            type={`${!newPasswordFlag ? "password" : "text"}`}
                            name="newPassword"
                            value={confirmPassword}
                            onChange={ (e) => setConfirmPassword(e.target.value)}
                            className=' px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                            style={
                                {
                                    boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                }
                            }
                        />
                    </div>
                    <button type='submit' 
                    className='w-full text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2
                    hover:scale-95 transition-all duration-200 bg-yellow-50 text-black'>
                        Reset Password
                    </button>
                    
                </form>
                <Link to={"/login"} className=' flex text-richblack-5 text-base items-center gap-2'>
                    <FaArrowLeftLong />
                    <p>Back to Login</p>
                </Link>
            </div>
        </div>
    );
}

export default UpdatePassword;