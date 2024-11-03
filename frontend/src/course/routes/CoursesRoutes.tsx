import { Navigate, Route, Routes } from "react-router-dom";
// import ProtectedRoute from "../../shared/routes/ProtectedRoute"
import { CoursesPage } from "../pages/CoursesPage";
import { CourseDetails } from "../pages/CourseDetails";
import Navbar from "@/components/Navbar";
// import { RegisterCoursePage } from "../pages/RegisterCoursePage"

export const CoursesRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes >
        <Route path="/" element={<CoursesPage />} />
        <Route path="/details/:id" element={<CourseDetails />} />
        {/* <Route element={<ProtectedRoute />}>
      <Route path="/register" element={<RegisterCoursePage />}/>
      </Route> */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
