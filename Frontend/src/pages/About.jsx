import HighlightText from '@/components/core/HomePage/HighlightText';
import React from 'react';
import aboutus1 from "@/assets/Images/aboutus1.webp";
import aboutus2 from "@/assets/Images/aboutus2.webp";
import aboutus3 from "@/assets/Images/aboutus3.webp";
import Quote from '@/components/core/AboutPage/Quote';
import FoundingStory from "@/assets/Images/FoundingStory.png";
import StatsComponent from '@/components/core/AboutPage/StatsComponent';
import LearningGrid from '@/components/core/AboutPage/LearningGrid';
import ContactUsFormSection from '@/components/core/AboutPage/ContactUsFormSection';
import Footer from '@/components/common/Footer';
import ReviewSlider from '@/components/common/ReviewSlider';

function About(props) {
    return (
        <div className='mx-auto text-white flex flex-col items-center'>
            {/* section 1  */}
            <div className=' flex bg-richblack-800 justify-center items-center'>
                <div className=' w-10/12 relative mt-24'>
                    <header className=' mb-60 flex flex-col text-center text-4xl font-semibold w-8/12 mx-auto gap-4'>
                        <p className=' text-lg text-richblack-200 mb-8'>About us</p>
                        <p>
                            Driving Innovation in Online Education for a 
                            <HighlightText text={"Brighter Future"}/>
                        </p>
                        <p className=' text-richblack-300 text-base mt-4'>
                            Studynotion is at the forefront of driving innovation in online education. 
                            We're passionate about creating a brighter future by offering cutting-edge courses, 
                            leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </header>
                    <div className=' absolute flex gap-x-8 justify-center items-center -bottom-32'>
                        <img src={aboutus1} alt="about-us-img1" className=' w-96 h-72 aspect-square'/>
                        <img src={aboutus2} alt="about-us-img2" className=' w-96 h-72 aspect-square'/>
                        <img src={aboutus3} alt="about-us-img3" className=' w-96 h-72 aspect-square'/>
                    </div>
                </div>
            </div>

            {/* section 2  */}
            <div className=' w-10/12 flex flex-col mb-10 py-4'>
                <div className=' mx-auto mt-60'>
                    <Quote />
                </div>
            </div>
            
            {/* Section 3  */}
            <div className=' w-full flex flex-col mt-10 py-20 border-t border-t-richblack-700'>    
                <div className=' flex flex-col w-9/12 mx-auto my-10'>
                    <div className=' flex gap-24'>
                        <div className=' flex flex-col items-start gap-6 px-2 py-2 w-[50%]'>
                            <h1 className=' text-3xl py-2'
                                style={
                                    {
                                        background: "var(--Gradient-04, linear-gradient(118deg, #833AB4 -2.4%, #FD1D1D 52.25%, #FCB045 106.89%))",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",                    
                                    }
                                }
                            >
                                Our Founding Story
                            </h1>
                            <p className=' text-base text-richblack-300'>
                                Our e-learning platform was born out of a shared vision and passion for transforming education. 
                                It all began with a group of educators, technologists, and lifelong learners who recognized the need for 
                                accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p className=' text-base text-richblack-300'>
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of 
                                traditional education systems. We believed that education should not be confined to the walls of a 
                                classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these 
                                gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>
                        <div  className=' flex items-center justify-center '>
                            <img src={FoundingStory} alt=""
                            className=' shadow-[2px_2px_5px_0px_#EC008C,-2px_-2px_5px_0px_#EC008C]'/>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-col w-9/12 mx-auto my-10'>
                    <div className=' flex gap-24'>
                        <div className=' flex flex-col items-start gap-6 px-2 py-2 w-[50%]'>
                            <h1 className=' text-3xl py-2'
                                style={
                                    {
                                        background: "var(--Gradient-08, linear-gradient(118deg, #E65C00 -6.05%, #F9D423 106.11%))",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",                    
                                    }
                                }
                            >
                                Our Vision
                            </h1>
                            <p className=' text-base text-richblack-300'>
                                With this vision in mind, we set out on a journey to create an e-learning platform that would 
                                revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop 
                                a robust and intuitive platform that combines cutting-edge technology with engaging content, 
                                fostering a dynamic and interactive learning experience.
                            </p>
                        </div>
                        <div className=' flex flex-col items-start gap-6 px-2 py-2 w-[50%]'>
                            <h1 className=' text-3xl py-2'
                                style={
                                    {
                                        background: "var(--Gradient-05, linear-gradient(118deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%))",
                                        backgroundClip: "text",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",                    
                                    }
                                }
                            >
                                Our Mission
                            </h1>
                            <p className=' text-base text-richblack-300'>
                                our mission goes beyond just delivering courses online. We wanted to create a vibrant community of 
                                learners, where individuals can connect, collaborate, and learn from one another. We believe
                                that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit 
                                of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <div className=' bg-richblack-800 w-full'>
                <StatsComponent />
            </div>
            
            {/* Section 4  */}
            <div>
                <LearningGrid />
            </div>

            <div className=' my-20'>
                <ContactUsFormSection />
            </div>
                                
            <ReviewSlider />

            <div className=' w-full'>
                <Footer />
            </div>
        </div>
    );
}

export default About;