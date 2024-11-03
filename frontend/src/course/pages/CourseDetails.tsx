import { useEffect, useState } from "react";
import { Course } from "../../shared/types/courseInterfaces";
import { assignCourse, getCourseById } from "../../api/course";
import { useNavigate, useParams } from "react-router-dom";
import { FiClock, FiUser, FiBook } from "react-icons/fi";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useAuth } from "../../shared/context/AuthContext";
import axios from "axios";

export const CourseDetails = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [course, setCourse] = useState<Course>();
  const { id } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleInscription = async (id: string) => {
    try {
      const response = await assignCourse(id);
      navigate('/courses', { state: { status: response.status, message: 'Curso asignado con éxito' } });
    } catch (error) {
      if(axios.isAxiosError(error)){
        const status = error.response?.status || 500; // Si no hay status, se asigna 500 por defecto
        navigate('/courses', { state: { status, message: 'Ya estás inscrito en este curso' } });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const getCourse = async () => {
      const response = await getCourseById(id!);
      setCourse(response.data);
      setIsLoading(false);
    };
    getCourse();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Card sx={{ minWidth: 350 }} variant="outlined">
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "InfoText", fontSize: 14, textAlign: "center" }}
            >
              Cargando información
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="px-10">
          {"Inscripción al curso en proceso"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="px-10">
            Estas seguro de enrolarte a este curso, es posible que si no tienes
            las bases necesarias este pueda tener un nivel demasiado alto para
            ti.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex flex-row justify-center items-center">
          <Button
            variant="contained"
            onClick={() => handleInscription(id!)}
          >
            Inscribirse
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            autoFocus
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      {!isLoading && (
        <div className="max-w-4xl my-16 mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {course?.title}
          </h1>

          <div className="mb-6">
            <img
              src={course?.images[0]}
              alt={`Course cover for ${course?.title}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center">
              <FiClock className="mr-2 text-primary" aria-hidden="true" />
              <span>Duration: {course?.duration} hours</span>
            </div>
            <div className="flex items-center">
              <FiUser className="mr-2 text-primary" aria-hidden="true" />
              <span>Teacher: {course?.teacher.username}</span>
            </div>
            <div className="flex items-center">
              <FiBook className="mr-2 text-primary" aria-hidden="true" />
              <span>Level: {course?.level}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{course?.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Modules</h2>
            <ul className="list-disc pl-5">
              {course?.modules.map((module, index) => (
                <li key={index}>{module}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Prerequisites</h2>
            <p>{course?.prerequisites}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Additional Resources</h2>
            <div className="flex flex-wrap gap-2">
              {course?.additionalResources.map((resource, index) => (
                <span
                  key={index}
                  className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm"
                >
                  {resource}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Course Status</h2>
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                course?.status === "active"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {course?.status}
            </span>
          </div>

          <div className="flex flex-row gap-5 md:gap-20 items-center justify-center">
            <a
              href="/courses"
              className="bg-red-500 hover:bg-red-500/90 text-primary-foreground font-bold py-2 px-4 rounded"
            >
              Volver
            </a>
            {user?.role == "student" && (
              <button
                className="bg-blue-600 hover:bg-blue-600/90 text-primary-foreground font-bold py-2 px-4 rounded"
                onClick={() => handleClickOpen()}
              >
                Inscribirse
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
