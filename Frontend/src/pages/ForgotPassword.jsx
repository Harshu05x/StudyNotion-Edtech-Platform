import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getResetPasswordToken } from '@/services/operations/authApis';
import toast from 'react-hot-toast';

function ForgotPassword(props) {
    const { loading } = useSelector(state => state.auth);
    const [email,setEmail] = useState("");
    const [emailSent,setEmailSent] = useState(false);
    const dispacth = useDispatch();

    function submitHandler(e) {
        e.preventDefault();
        if(email === "")
            toast.error("Please enter valid email address");
        else
            dispacth(getResetPasswordToken(email,setEmailSent));
    }

    return (
        <div className=' flex items-center justify-center my-auto'>
            <div className=' flex flex-col w-9/12 sm:w-6/12 lg:w-4/12 mx-auto gap-7 lg:px-8'>
                <h1 className=' flex text-3xl text-richblack-5 font-semibold text-center mx-auto'>
                    {
                        !emailSent ? "Reset your password" : "Check email"
                    }
                </h1>
                <p className=' text-richblack-100 text-base'>
                    {
                        !emailSent ?
                        "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                        `We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={submitHandler}
                className=' flex flex-col items-start justify-center gap-6 w-full'>
                    {
                        !emailSent &&
                            <div className=' flex flex-col items-start justify-center gap-1 w-full'>
                                <label className=' text-richblack-300 text-base'
                                    htmlFor={"email"}>
                                    Email <sup className=' text-destructive'>*</sup>
                                </label>
                                <input
                                    id='email'
                                    placeholder="Enter Your Email Address"
                                    type='email'
                                    name="email"
                                    value={email}
                                    onChange={ (e) => setEmail(e.target.value)}
                                    className=' px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                                    style={
                                        {
                                            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                                        }
                                    }
                                />
                            </div>
                    }
                    <button type='submit' 
                    className='w-full text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2
                    hover:scale-95 transition-all duration-200 bg-yellow-50 text-black'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
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

export default ForgotPassword;