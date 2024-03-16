import React, { useState } from 'react';
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import ExploreMoreCard from './ExploreMoreCard';

const tabNames = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

function ExploreMore(props) {
    const [currentTab,setCurrentTab] = useState(tabNames[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currenCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (val) => {
        setCurrentTab(val);
        const result = HomePageExplore
                            .filter( (course) => course.tag == val)
                            .flatMap(course => course.courses);
        setCourses(result);
        setCurrentCard(result[0].heading);
    }

    return (
        <div className=' relative w-11/12'>
            <div className=' flex flex-col gap-2'>
                <div className=' text-4xl font-semibold text-center'>
                    Unlock the <HighlightText text={"Power of Code"}/>
                </div>
                <p className=' text-center text-richblack-300 '>Learn to Build Anything You Can Imagine</p>
            </div>

            
            <div className=' flex gap-6 text-richblack-300 bg-richblack-800 rounded-full px-4 py-2 mt-14 mb-52 mx-auto w-fit'>
                {
                    tabNames.map( (ele,i) => (
                        <div
                            key={i}
                            className={`${ele === currentTab && "text-white bg-richblack-900"} rounded-full cursor-pointer px-4 py-2`}
                            onClick={ () => setMyCard(ele)}
                        >
                            {ele}
                        </div>
                    ))
                }
            </div>
            <div className=' flex gap-10 justify-center items-start 
                 translate-y-[-60%] w-full mx-auto absolute 
            '>
                {
                    courses.map( (course,i) => (
                        <ExploreMoreCard 
                            heading={course.heading}
                            description={course.description}
                            level={course.level}
                            lessionNumber={course.lessionNumber}
                            currenCard={ currenCard === course.heading}
                            key={i}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ExploreMore;