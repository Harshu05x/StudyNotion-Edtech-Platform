import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';
import ConutryCode from "@/data/countrycode.json";
import { apiConnector } from '@/services/apiConnector';
import { contactUsEndpoint } from '@/services/apis';
import toast from 'react-hot-toast';

function ContactUsForm(props) {
    const {
        register,
        handleSubmit,
        reset, 
        formState:{errors,isSubmitSuccessful}
    } = useForm();
    
    const submitHandler = async(data) => {
        const toastId = toast.loading("Sending...");
        try {
            const response = await apiConnector("POST", contactUsEndpoint.CONTACT_US_API,data);
            if(response.data.sucesss === false)
                throw new Error(response?.data?.message);
            toast.success("Message Sent");
            toast.dismiss(toastId);
            
        } catch (error) {
            toast.dismiss(toastId);
            console.log(error.message);
            toast.error("Message not sent");
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful){
            reset( {
                firstName: "",
                lastName: "",
                email: "",
                phoneNo: "",
                message: ""
            })
        }
    },[reset,isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(submitHandler)}
            className=' flex flex-col gap-6'
        >
            <div className=' flex gap-4 flex-col lg:flex-row'>
                <div className=' flex flex-col w-full'>
                    <Input 
                        label="First Name"
                        type="text"
                        placeholder="Enter first name"
                        {...register("firstName", { required: true})}
                    />
                    {
                        errors.firstName && 
                        <span className='mt-2 text-sm text-destructive'>
                            Please enter first name
                        </span>
                    }
                </div>
                <div className=' flex flex-col w-full'>
                    <Input 
                        label="Last Name"
                        type="text"
                        placeholder="Enter last name"
                        {...register("lastName")}
                    />
                </div>
            </div>
            <div className=' flex flex-col'>
                <Input 
                    label="Email"
                    type="text"
                    placeholder="Enter email address"
                    {...register("email", { required: true})}
                />
                {
                    errors.email && 
                    <span className='mt-2 text-sm text-destructive' >
                        Please enter valid email address
                    </span>
                }
            </div>

            <div className=' flex flex-col items-start justify-center gap-1 w-full'>
                <label className=' text-richblack-300 text-base'
                    htmlFor={"phoneno"}>
                    Phone No.
                </label>
                <div className=' flex gap-2 w-full'>
                    <select name="" id="" {...register("countryCode", { required: true})}
                        className=' w-[12%] rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200'
                        style={
                            {
                                boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                            }
                        }
                        >
                        {
                            ConutryCode.map( (ele,i) => (
                                <option value={ele.code} key={i} className=' '>
                                    {ele.code} - {ele.country}
                                </option>
                            ))
                        }
                    </select>
                    <input
                        type='number'
                        id='phoneno'
                        placeholder="Enter phone no"
                        {...register("phoneNo", 
                            { required: true,
                            maxLength: {value: 10, message: "Invalid Phone Number"},
                            minLength: {value: 8, message: "Invalid Phone Number"},
                        })}
                        className='w-full px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200'
                        style={
                            {
                                boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                            }
                        }
                    />
                </div>
                {
                    errors.phoneNo && 
                    <span className='mt-2 text-sm text-destructive' >
                        {`${errors.phoneNo.message || "Please enter phone no"}`}
                    </span>
                }
            </div>

            <div className=' flex flex-col items-start justify-center gap-1'>
                <label className=' text-richblack-300 text-base'
                    htmlFor={"message"}>
                    Message
                </label>
                <textarea
                    id='message'
                    placeholder="Enter message"
                    {...register("message", { required: true})}
                    className=' px-3 py-2 rounded-md bg-richblack-800 text-white outline-none focus:bg-gray-50 duration-200 w-full'
                    style={
                        {
                            boxShadow: "0px -1px 0px 0px rgba(255, 255, 255, 0.18) inset"
                        }
                    }
                >
                </textarea>
                {
                    errors.message && 
                    <span className='mt-2 text-sm text-destructive' >
                        Please enter message
                    </span>
                }
            </div>

            <button
                className=' text-center text-[14px] px-6 py-3 rounded-md font-bold flex 
                justify-center items-center gap-2 bg-yellow-50 text-black
                hover:scale-95 transition-all duration-200'
                type='submit'
            >
                Send Message
            </button>
        </form>
    );
}

export default ContactUsForm;