import React from 'react';
import { FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/common/Footer';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '@/components/common/ReviewSlider';


function Home(props) {
    return (
        <div>
            {/* Section 1 */}
            <div className=' flex flex-col items-center justify-between w-10/12 mx-auto relative text-white max-w-maxContent'>
                <Link to={"/signup"}>
                    <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 text-richblack-200 
                    font-bold transition-all duration-200 hover:scale-95'>
                        <div className=' flex justify-center items-center gap-2 rounded-full px-10 py-[5px]
                         group-hover:bg-richblack-900  transition-all duration-200'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className=' flex flex-col gap-4 mt-11 mb-11'>
                    <div className=' text-center text-4xl font-semibold'>
                        Empower Your Future with <HighlightText text={"Coding Skills"}/>
                    </div>
                    <div className='w-[70%] text-center text-richblack-300 mx-auto'>
                        <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a
                        wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>    
                    </div>                    
                </div>

                <div className=' flex gap-6'>
                    <CTAButton active={true} linkTo={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton linkTo={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className='mx-4 my-12 shadow-[-5px_-5px_5px_0px_#118AB2] '>
                    <video muted autoPlay loop className=' h-[30rem] shadow-[20px_20px_0px_0px_#F5F5F5]'>
                        <source src={Banner} type='video/mp4'/>
                    </video>
                </div>
                
                <div>
                    <CodeBlocks 
                        position={"lg:flex-row"}
                        heading={
                            <div className=' text-4xl font-semibold'>
                                Unlock your 
                                <HighlightText text={"coding potential"}/> 
                                with our online courses.
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        cta1={
                            {
                                btnText: "Try it YourSelf",
                                linkTo: "/signup",
                                active: true
                            }
                        }
                        cta2={
                            {
                                btnText: "Learn More",
                                linkTo: "/login",
                                active: false
                            }
                        }
                        codeBlock={
                            `<!DOCTYPE html> 
                            <html> 
                            <head><title>Example</ 
                            title><link > rel= href= "stylesheet" "styles.css" 
                            /head> 
                            <body> 
                            <h1><a href="/">Header </a>
                            /h1> 
                            nav><a href="one/">One</a> <a href="two/">Two</
                            a><a href="three/">Three</a>/nav>`
                        }
                        codeColor={"text-[#E7BC5B]"}
                        bgGradient={"var(--Gradient-02, linear-gradient(124deg, #8A2BE2 -6.46%, #FFA500 59.04%, #F8F8FF 124.53%))"}

                    />
                    <CodeBlocks 
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className=' text-4xl font-semibold'>
                                Start
                                <HighlightText text={"coding in seconds"}/> 
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        cta1={
                            {
                                btnText: "Continue Lesson",
                                linkTo: "/signup",
                                active: true
                            }
                        }
                        cta2={
                            {
                                btnText: "Learn More",
                                linkTo: "/login",
                                active: false
                            }
                        }
                        codeBlock={
                            `<!DOCTYPE html> 
                            <html> 
                            <head><title>Example</ 
                            title><link > rel= href= "stylesheet" "styles.css" 
                            /head> 
                            <body> 
                            <h1><a href="/">Header </a>
                            /h1> 
                            nav><a href="one/">One</a> <a href="two/">Two</
                            a><a href="three/">Three</a>/nav>`
                        }
                        codeColor={"text-[#F37290]"}
                        bgGradient={"var(--Gradient-05, linear-gradient(118deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%))"}
                    />
                </div>

                <ExploreMore />
            </div>
            {/* Section 2 */}
            <div className=' bg-pure-greys-5'>
                <div className=' h-[310px] '>
                    <div className=' w-11/12 max-w-maxContent flex flex-col items-center justify-center gap-5 mx-auto'>
                        <div className=' h-[150px]'></div>
                        <div className=' flex gap-6 items-center justify-center'>
                            <CTAButton active={true} linkTo={"/signup"}>
                                Explore Full Catalog
                                <FaArrowRight />
                            </CTAButton>
                            <CTAButton active={false} linkTo={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                        

                    </div>
                </div>

                <div className=' w-11/12 max-w-maxContent flex flex-col items-center mx-auto justify-between gap-7'>

                    <div className=' flex gap-5 px-1 py-4 items-start justify-center mb-8 mt-24'>
                        <div className=' w-[45%] text-4xl font-bold'>
                            Get the skills you need for a <HighlightText text={"job that is in demand."}/>
                        </div>
                        <div className=' flex flex-col w-[45%] gap-10 items-start '>
                            <p className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <CTAButton active={true} linkTo={"/login"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                    <TimeLineSection />
                    <LearningLanguageSection />
                </div>
            </div>

            {/* Section 3 */}
            <div className=' flex flex-col w-11/12 mx-auto items-center gap-8 justify-between max-w-maxContent
                 bg-richblack-900 text-white '>
                <InstructorSection />
                <ReviewSlider />
            </div>
            
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Home;

