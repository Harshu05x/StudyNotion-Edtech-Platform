import React from 'react';
import HighlightText from "./HighlightText"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import CTAButton from './CTAButton';

function LearningLanguageSection(props) {
    return (
        <div className=' mt-16'>
            <div className=' flex flex-col gap-5 items-center'>
                <div className=' text-4xl font-semibold text-center'>
                    Your swiss knife for <HighlightText text={"learning any language"}/>
                </div>
                <div className=' text-center text-richblack-700 mx-auto text-base font-medium w-[70%]'>
                    Using spin making learning multiple languages easy. with 20+ languages 
                    realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className=' flex justify-center items-center'>
                    <img src={Know_your_progress} className=' object-cover -mr-32'/>
                    <img src={Compare_with_others} className=' object-cover'/>
                    <img src={Plan_your_lessons} className=' object-cover -ml-36'/>
                </div>

                <div className=' flex justify-center items-center my-12'>
                    <CTAButton active={true} linkTo={"/login"}> Learn More</CTAButton>
                </div>
            </div>
        </div>
    );
}

export default LearningLanguageSection;