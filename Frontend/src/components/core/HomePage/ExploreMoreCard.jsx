import React from 'react';
import { RxAvatar } from "react-icons/rx";
import { FaNetworkWired } from "react-icons/fa";

function ExploreMoreCard({heading,description,level,lessionNumber,currenCard}) {
    return (
        // 2rem 1.5rem 3.25rem 1.5rem;
        <div className={`flex flex-col ${currenCard ? " bg-white" : " bg-richblack-800"}
         rounded-sm ${currenCard && "shadow-[10px_10px_0px_0px_#FFD60A]"} w-fit`}>
            <div className=' px-6 pt-8 pb-12'>
                <div className=' flex flex-col gap-3'>
                    <h2 className={` text-xl font-semibold
                        ${currenCard ? "text-richblack-800" : "text-richblack-25"}
                    `}>
                        {heading}
                    </h2>
                    <p className={` text-sm
                        ${currenCard ? "text-richblack-500" : "text-richblack-400"}
                    `}>
                        {description}
                    </p>
                </div>
            </div>
            <div className={` flex justify-between items-center px-5 py-4 border-t border-dashed 
                    ${currenCard ? "border-t-richblack-50" : "border-t-richblack-600"}
                `}>
                <div className={` ${currenCard ? " text-blue-50" : " text-richblack-300"} flex gap-2 items-center`}>
                    <RxAvatar />
                    <p>{level}</p>
                </div>
                <div className={` ${currenCard ? " text-blue-50" : " text-richblack-300"} flex gap-2 items-center`}>
                    <FaNetworkWired />
                    <p>{lessionNumber} lessons</p>
                </div>
            </div>
        </div>
    );
}

export default ExploreMoreCard;