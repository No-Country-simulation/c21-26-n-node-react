import { Course } from "../shared/types/courseInterfaces";
import axios from "./axios";

export const getCourses = () => axios.get<Course[]>(`/courses`);
export const registerCourse = (course: Course) =>
  axios.post(`/courses`, course);
export const assignCourse = (id:string) => 
  axios.post(`/courses/assign`, {_id:id}, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}})
export const getCourseById = (id: string) => axios.get(`/courses/${id}`);
export const updateCourse = (id: string, course: Course) =>
  axios.patch(`/courses/${id}`, course);
export const removeCourse = (id: string) => axios.delete(`/courses/${id}`);
