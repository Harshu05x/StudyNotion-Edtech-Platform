import React from "react"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Setting from "./components/core/Dashboard/Settings/Setting";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses/EnrolledCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Error from "./pages/Error";
import Catalog from "./pages/Catalog";
import Cart from "./components/core/Dashboard/Cart";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import { ACCOUNT_TYPE } from "./utilis/constants";
import { useSelector } from "react-redux";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {
    const { user } = useSelector((state) => state.profile)

    return (
        <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
           <Navbar />
           <Routes>
                <Route path="/" element={ <Home /> }/>
                <Route path="/about" element={ <About /> }/>
                <Route path="/contact" element={ <ContactUs />}/>
                <Route path="/catalog/:catalog" element={ <Catalog />}/>
                <Route path="/login" element={ <Login /> }/>
                <Route path="/signup" element={ <Signup /> }/>
                <Route path="/forgot-password" element={ <ForgotPassword /> }/>
                <Route path="/update-password/:token" element={ <UpdatePassword /> }/>
                <Route path="/verify-email" element={ <VerifyEmail />}/>
                <Route path="/courses/:courseId" element={ <CourseDetails />} />
                <Route path="/view-course/:courseId" element={ <ViewCourse />} />

                <Route element={
                    <PrivateRoute>
                         <Dashboard />
                    </PrivateRoute>
                }>
                    <Route path="/dashboard/my-profile" element={ <MyProfile />}/>
                    <Route path="/dashboard/settings" element={ <Setting /> }/>
                    <Route path="/dashboard/enrolled-courses" element={ <EnrolledCourses /> }/>
                    <Route path="/dashboard/add-course" element={ <AddCourse /> }/>
                    <Route path="/dashboard/my-courses" element={ <MyCourses /> }/>
                    <Route path="/dashboard/edit-course/:courseId" element={ <EditCourse /> }/>
                    <Route path="/dashboard/cart" element={ <Cart /> }/>
                    <Route path="/dashboard/instructor" element={ <Instructor /> }/>
                </Route>

                <Route element={
                    <PrivateRoute>
                        <ViewCourse />
                    </PrivateRoute>
                }>
                    <Route
                        path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                        element={<VideoDetails />}
                    />
                </Route>

                {/* <Route path="/dashboard/enrolled-courses" element={ <Dashboard /> } />
                <Route path="/dashboard/cart" element={ <Dashboard /> } /> */}
                    <Route path="*" element={ <Error /> }/>
            </Routes>
        </div>        
    )
}

export default App
