import React from 'react';

const stats = [
    { count: "5K", label: "Active Students"},
    { count: "10+", label: "Mentors"},
    { count: "200+", label: "Courses"},
    { count: "50+", label: "Awards"},
]

function StatsComponent(props) {
    return (
        <div className=' flex w-10/12 mx-auto justify-center items-center'>
            {
                stats.map( (stat,i) => (
                    <div key={i} className=' flex flex-col justify-center items-center px-20 py-10 gap-2'>
                        <h1 className=' text-2xl font-bold'>{stat.count}</h1>
                        <p className=' text-sm text-richblack-500 font-semibold'>{stat.label}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default StatsComponent;