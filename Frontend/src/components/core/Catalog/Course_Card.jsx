import RatingStars from '@/components/common/RatingStars';
import GetAvgRating from '@/utilis/avgRating';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Course_Card({course,Height}) {
    const [avgRatingCount,setAvgRatingCount] = useState(0);

    useEffect( () => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgRatingCount(count);
    },[course]);

    
    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div className=' flex flex-col gap-4'>
                    <div>
                        <img src={course?.thumbnail} alt="" 
                        className={`${Height ?? ""} w-full object-cover rounded-xl`}/>
                    </div>
                    <div className=' flex flex-col gap-2'>
                        <p className=' text-richblack-5 text-xl'>{course?.courseName}</p>
                        <p className=' text-richblack-500'>by {course?.instructor?.firstName + " " + course?.instructor?.lastName}</p>
                        <div className=' flex gap-2 items-center'>
                            <span className=' text-yellow-100'>{avgRatingCount}</span>
                            <RatingStars Review_Count={avgRatingCount}/>
                            <span className=' text-richblack-500'>{course?.ratingAndReviews.length} Ratings</span>
                        </div>
                        <p className=' flex font-semibold text-2xl text-richblack-5'>₹ {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Course_Card;