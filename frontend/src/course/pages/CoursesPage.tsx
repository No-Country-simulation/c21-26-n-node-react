import { useEffect, useState } from "react";
import { getCourses } from "../../api/course";
import { Course } from "../../shared/types/courseInterfaces";
import { Alert, Card, CardContent, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface MessageData{
  status:number;
  message:string;
}

const NivelDificultad = ({ nivel }: { nivel: string }) => {
  const color =
    nivel === "Beginner"
      ? "bg-green-100 text-green-800"
      : nivel === "Intermediate"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
  return (
    <span
      className={`${color} text-xs font-semibold mr-2 px-2.5 py-0.5 rounded`}
    >
      {nivel}
    </span>
  );
};

const CursoCardFeatured = ({ curso }: { curso: Course }) => (
  <a
    href={`/courses/details/${curso._id}`}
    className="bg-white w-full md:w-[500px] rounded-lg shadow-md overflow-hidden"
  >
    <img
      src={curso.images[0]}
      alt={`Imagen del curso ${curso.title}`}
      className="w-full h-64 object-cover"
    />
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">{curso.title}</h3>
      <div className="flex items-center mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="text-lg">{curso.teacher.username}</span>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <NivelDificultad nivel={curso.level} />
      </div>
    </div>
  </a>
);

const CursoCard = ({ curso }: { curso: Course }) => (
  <a
    href={`/courses/details/${curso._id}`}
    className="bg-white rounded-lg shadow-md overflow-hidden"
  >
    <img
      src={curso.images[0]}
      alt={`Imagen del curso ${curso.title}`}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">{curso.title}</h3>
      <div className="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span className="text-sm">{curso.teacher.username}</span>
      </div>
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <NivelDificultad nivel={curso.level} />
      </div>
    </div>
  </a>
);

export const CoursesPage = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [alertMessage, setAlertMessage] = useState<MessageData | null>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    if (location.state) {
      setAlertMessage(location.state);
      navigate(location.pathname,{replace:true})
    }
    setIsLoading(true);
    const getAllCourses = async () => {
      const response = await getCourses();
      setCourses(response.data);
      setIsLoading(false);
    };
    getAllCourses();
  }, [location.pathname, location.state, navigate]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Card sx={{ minWidth: 350 }} variant="outlined">
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "InfoText", fontSize: 14, textAlign: "center" }}
            >
              Cargando cursos disponibles
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {!isLoading && (
        <div className="container mx-auto mt-8 px-4 py-8">
          {alertMessage && (
            <Alert onClose={() => setAlertMessage(null)} severity={ alertMessage.status === 500 ? "error" : 'success'}>
              {alertMessage.message}
            </Alert>
          )}
          <h1 className="text-4xl font-bold mb-8 text-center">
            Nuestros Cursos
          </h1>
          <section className="mb-12 w-full">
            <h2 className="text-2xl font-semibold mb-6">Cursos Destacados</h2>
            <div className="w-full flex flex-col md:flex-row justify-evenly gap-10">
              {courses.map((curso) => (
                <CursoCardFeatured key={curso._id} curso={curso} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Todos los Cursos</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((curso) => (
                <CursoCard key={curso._id} curso={curso} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};
