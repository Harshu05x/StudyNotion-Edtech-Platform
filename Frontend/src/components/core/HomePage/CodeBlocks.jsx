import React from 'react';
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';
import { FaArrowRight } from "react-icons/fa"
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({
    position, heading, subheading, cta1, cta2, codeBlock, bgGradient, codeColor
}) {

    return (
        <div className={` flex ${position} justify-between gap-12 my-20 px-28 py-20 bg-transparent`}
        >

            <div className=' w-[50%] flex flex-col gap-8'>
                {heading}
                <div className='text-richblack-300 mx-auto'>
                    {subheading}
                </div>
                <div className=' flex gap-7 mt-7'>
                    <CTAButton active={cta1.active} linkTo={cta1.linkTo}>
                        <div className=' flex items-center gap-2'>
                            {cta1.btnText} <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={cta2.active} linkTo={cta2.linkTo}>
                        {cta2.btnText}
                    </CTAButton>
                </div>
            </div>

            <div className=' h-fit flex w-[100%] justify-center lg:w-[500px] py-4 relative'
                style={
                    {
                        border: "1px solid rgba(255, 255, 255, 0.22)",
                        background: "linear-gradient(112deg, rgba(14, 26, 45, 0.24) -1.4%, rgba(17, 30, 50, 0.38) 104.96%)",
                        backdropFilter: "blur(126px)"
                    }
                }
            >
                <div className=' flex flex-col text-richblack-400 text-center w-[10%] justify-center items-center font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation 
                        sequence={[codeBlock, 2000, ""]}
                        omitDeletionAnimation={true}
                        repeat={Infinity}
                        style={
                            {
                                whiteSpace: "pre-line",
                                display: "block"
                            }
                        }
                    />
                </div>

                <div className=' absolute -left-1 -right-4 w-80 h-64'
                    style={
                        {
                            borderRadius: "23.30931rem",
                            opacity: "0.2",
                            background: `${bgGradient}`,
                            filter: "blur(34px)"

                        }
                    }
                >

                </div>
            </div>
            
        </div>
    );
}

export default CodeBlocks;