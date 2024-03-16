import React from 'react';
import { timeLine } from '../../../data/timeLine';
import timeLineImg from "../../../assets/Images/TimelineImage.png";

function TimeLineSection(props) {
    return (
        <div className=' mb-20'>
            <div className=' flex gap-14 items-center'>
                <div className=' flex flex-col gap-10 w-[45%]'>
                    {
                        timeLine.map( (ele,i) => (
                            <div className=' flex gap-8 relative' key={i}>
                                <div className=' flex justify-center items-center bg-white rounded-full w-[50px] h-[50px]'> 
                                    <img src={ele.logo} alt="Logo" className=''/>
                                </div>

                                <div className=' flex flex-col'>
                                    <h2 className=' text-lg font-semibold'>{ele.heading}</h2>
                                    <p className=' text-base'>{ele.description}</p>
                                </div>
                               {
                                    timeLine.length-1 !== i && 
                                    <div className=' absolute h-[2.625rem] w-[0.0625rem] bg-[#AFB2BF]
                                    translate-y-[110%] left-[5.5%] 
                                    '> </div>
                               }
                            </div>
                        ))
                    }
                </div>
                <div className=' relative shadow-blue-200'>
                    <img src={timeLineImg} className=' h-fit object-cover shadow-[-5px_-5px_20px_0px_#118AB2]'/>
                    <div className=' absolute flex bg-caribbeangreen-700 text-white uppercase px-8 py-7 gap-6
                     left-[50%] translate-x-[-50%] translate-y-[-50%] 
                    '>
                        <div className=' flex items-center justify-center gap-4 border-r-2 border-r-caribbeangreen-300 pr-7'>
                            <p className=' text-3xl font-bold'>10</p>
                            <p className=' text-sm text-caribbeangreen-300'>YEARS EXPERIENCES</p>
                        </div>
                        <div className='flex items-center justify-center gap-4 pl-7'>
                            <p className=' text-3xl font-bold'>250</p>
                            <p className=' text-sm text-caribbeangreen-300'>types of courses</p>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    );
}

export default TimeLineSection;