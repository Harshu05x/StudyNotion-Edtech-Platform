import VideoDetailSidebar from '@/components/core/ViewCourse/VideoDetailSidebar';
import { getFullDetailsOfCourse } from '@/services/operations/courseDetailsApis';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setLoading, setTotalNoOfLectures } from '@/slices/viewCourseSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

function ViewCourse(props) {
    const {courseId} = useParams();
    const {token} = useSelector( state => state.auth);
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.viewCourse);

    const setCourseSpecificDetails = async() => {
        dispatch(setLoading(true));
        const courseData = await getFullDetailsOfCourse(courseId,token);
        dispatch(setEntireCourseData(courseData?.courseDetails));
        dispatch(setCourseSectionData(courseData?.courseDetails?.coursesContent));
        dispatch(setCompletedLectures(courseData?.completedVideos));
        
        let lectures = 0;
        courseData?.courseDetails?.coursesContent.forEach(sec => {
            lectures += sec.subSection?.length;
        });
        dispatch(setTotalNoOfLectures(lectures));
        dispatch(setLoading(false));
    };

    useEffect( () => {
        setCourseSpecificDetails();
    },[]);
    
    if(loading){
        return <div className=' flex justify-center items-center m-auto'>
            <div className=' loader'>
            </div>
        </div>
    }

    return (
        <div className=' flex relative min-h-[calc(100vh-3.5rem)]'>
            <VideoDetailSidebar />
            <div className='w-[90%] mx-auto'>
                <div className=' mx-auto w-10/12 max-w-[1100px] py-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default ViewCourse;