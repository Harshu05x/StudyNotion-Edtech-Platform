import { fetchInstructorCourses } from '@/services/operations/courseDetailsApis';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CourseTable from './InstructorCourses/CourseTable';

function MyCourses(props) {
    const {token} = useSelector(state => state.auth);
    const [courses,setCourses] = useState([]);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);

    const fetchCourses = async() => {
        setLoading(true);
        const result = await fetchInstructorCourses(token);
        
        if(result)
        setCourses(result);
        setLoading(false);
    }

    useEffect( () => {
        fetchCourses();
    },[])

    return (
        <div className=' flex flex-col lg:w-10/12 mx-auto gap-4 justify-center items-center relative'>
            <div className=' flex items-center justify-between w-full'>
                <h1 className=' text-4xl text-richblack-5 font-medium'>My Courses</h1>
                <button
                    onClick={ () => navigate("/dashboard/add-course")}
                    className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                    bg-yellow-50 text-black hover:scale-95 transition-all duration-200"
                    style={
                        {
                            boxShadow: "-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                        }
                    }
                    >
                        Add Course + 
                </button>
            </div>
            {
                loading ? 
                <div className=' absolute flex justify-center items-center top-[500%]'>
                    <div className="loader flex" ></div> 
                </div>
                :
                <CourseTable 
                        courses={courses}
                        setCourses={setCourses}
                    />
            }
        </div>
    );
}

export default MyCourses;