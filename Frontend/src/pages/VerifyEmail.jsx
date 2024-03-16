import React, { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import OTPInput from 'react-otp-input';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP, signup } from '@/services/operations/authApis';

function VerifyEmail(props) {
    const [otp, setOtp] = useState('');
    const {signupData} = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        if(!signupData)
            navigate("/signup");
    },[]);

    function submitHandler(e) {
        e.preventDefault();

        if(otp === "" || otp.length !== 6)
            toast.error("Please Enter OTP.");
        else
            dispatch(signup(signupData,otp,navigate));
    }

    return (
    <div className=' flex justify-center items-center my-auto'>
        <div className=' flex flex-col w-9/12 sm:w-6/12 lg:w-4/12 mx-auto gap-7 lg:px-8'>
            <h1 className=' flex text-3xl text-richblack-5 font-semibold text-center mx-auto'>
                Verify email
            </h1>
            <p className=' text-richblack-100 text-base'>
                Almost done. Enter your new password and youre all set.A verification code has been sent to you. Enter the code below
            </p>
            <form onSubmit={submitHandler}
            className=' flex flex-col items-start justify-center gap-6 w-full'>

                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => (
                        <input
                          {...props}
                          placeholder="-"
                          style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                          }}
                          className="w-full border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                        />
                    )}
                    containerStyle={{
                        justifyContent: "space-between",
                        gap: "0 6px",
                    }}
                />
                
                <button type='submit' 
                className='w-full text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2
                hover:scale-95 transition-all duration-200 bg-yellow-50 text-black'>
                    Verify Email
                </button>
                
            </form>
            <div className=' flex justify-between items-center'>
                <Link to={"/login"} className=' flex text-richblack-5 text-base items-center gap-2'>
                    <FaArrowLeftLong />
                    <p>Back to Login</p>
                </Link>
                <button className=' text-blue-100 text-base items-center gap-2'
                    onClick={ () => dispatch(sendOTP(signupData,navigate))}
                >
                    <div className=' flex items-center gap-1'>
                        <PiClockCounterClockwiseBold /> Resend it
                    </div>
                </button>
            </div>
        </div>
    </div>
    );
}

export default VerifyEmail;