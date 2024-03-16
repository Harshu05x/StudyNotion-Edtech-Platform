import React from 'react';
import HighlightText from './HighlightText';
import InstructorImage  from "../../../assets/Images/Instructor.png";
import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa';

function InstructorSection(props) {
    return (
        <div className='my-20'>
            <div className=' flex items-center gap-20'>
                <div className=' w-[50%]'>
                    <img src={InstructorImage} alt="InstructorImage" className=' shadow-[-20px_-20px_0px_0px_#F5F5F5]'/>
                </div>
                <div className=' w-[40%]  max-w-maxContent flex flex-col items-start justify-between'>
                    <div className=' text-4xl font-semibold w-[50%]'>Become an <HighlightText text={"instructor"}/></div>
                    <div className='text-richblack-300 font-medium w-[80%] mt-5'>
                        Instructors from around the world teach millions of students on StudyNotion. 
                        We provide the tools and skills to teach what you love.
                    </div>
                    <div className=' flex mt-16'>
                        <CTAButton active={true} linkTo={"/signup"}>
                            <div className=' flex items-center gap-2'>
                                Start Teaching Today <FaArrowRight />
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructorSection;