import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Avatar,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import StarIcon from "@mui/icons-material/Star";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/context/AuthContext";
import Navbar from "../../components/Navbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4a90e2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const testimonios = [
  {
    nombre: "María González",
    rol: "Estudiante",
    texto:
      "En la plataforma Edutech he transformado mi vida. Los cursos son de primera calidad y el apoyo de los profesores es increíble. ¡Gracias!",
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    nombre: "Carlos Rodríguez",
    rol: "Estudiante",
    texto:
      "Gracias a Edutech, pude cambiar mi estilo de vida y conseguir mi trabajo soñado. Los cursos prácticos y las tareas planteadas me dieron las habilidades que necesitaba para destacar.",
    avatar: "https://i.pravatar.cc/150?img=53",
  },
  {
    nombre: "Ana Martínez",
    rol: "Estudiante",
    texto:
      "La flexibilidad de Edutech me permitió aprender a mi propio ritmo mientras trabajaba a tiempo completo. Los profesores son expertos en su campo y el contenido siempre está actualizado.",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const handleLogin = () => {
    navigate("/auth/login", { replace: true });
  };
  const handleLoggedIn = () => {
    navigate("/courses", { replace: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <AppBar position="fixed">
          <Toolbar className="justify-between">
            <Typography
              variant="h6"
              component="div"
              className="flex items-center"
            >
              <SchoolIcon className="mr-2" />
              EduTech
            </Typography>
            {isAuthenticated ? (
              <div>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/courses", { replace: true });
                  }}
                >
                  Cursos
                </Button>
                <Button
                  color="inherit"
                  onClick={() => {
                    navigate("/user/profile", { replace: true });
                  }}
                >
                  Perfil
                </Button>
              </div>
            ) : (
              <div>
                <Button color="inherit" onClick={handleLogin}>
                  Iniciar Sesión
                </Button>
                <Button color="inherit" onClick={handleLogin}>
                  Registrarse
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>

        <main className="flex-grow">
          <section className="bg-gradient-to-r min-h-screen flex justify-center items-center from-blue-500 to-indigo-600 text-white py-20">
            <Container
              maxWidth="md"
              className="text-center flex flex-col gap-10 items-center"
            >
              <Typography
                variant="h2"
                component="h1"
                className="mb-4 font-bold"
              >
                Potencia Tu Viaje de Aprendizaje
              </Typography>
              <Typography variant="h5" component="p" className="mb-8">
                Descubre un mundo de conocimiento con nuestra plataforma de
                educación en línea de vanguardia
              </Typography>
              {isAuthenticated ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleLoggedIn}
                  className="px-8 py-3 text-lg"
                >
                  Comienza a Aprender Ahora
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleLogin}
                  className="px-8 py-3 text-lg"
                >
                  Comienza a Aprender Ahora
                </Button>
              )}
            </Container>
          </section>

          <section className="py-16 bg-gray-100 min-h-screen flex justify-center items-center">
            <Container maxWidth="lg" className="flex flex-col gap-10">
              <Typography
                variant="h3"
                component="h2"
                className="text-center mb-12 font-semibold"
              >
                ¿Por qué elegir PlataformaEdu?
              </Typography>
              <Grid container spacing={4}>
                {[
                  {
                    title: "Catálogo de Cursos Diverso",
                    description:
                      "Accede a miles de cursos en diversas disciplinas, desde programación hasta artes.",
                    icon: (
                      <SchoolIcon fontSize="large" className="text-blue-500" />
                    ),
                  },
                  {
                    title: "Instructores Expertos",
                    description:
                      "Aprende de profesionales de la industria y académicos reconocidos de todo el mundo.",
                    icon: (
                      <PersonIcon fontSize="large" className="text-green-500" />
                    ),
                  },
                  {
                    title: "Aprendizaje Interactivo y Flexible",
                    description:
                      "Interactúa con compañeros e instructores a través de foros, sesiones en vivo y proyectos colaborativos.",
                    icon: (
                      <GroupIcon fontSize="large" className="text-purple-500" />
                    ),
                  },
                  {
                    title: "Control personalizado",
                    description:
                      "Realiza control de tus notas, también disponible para los padres y asi tengan conocimiento de tu rendimiento académico.",
                    icon: (
                      <StarIcon fontSize="large" className="text-yellow-500" />
                    ),
                  },
                ].map((caracteristica, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card className="h-full flex flex-col items-center text-center p-6">
                      {caracteristica.icon}
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          className="font-bold"
                        >
                          {caracteristica.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {caracteristica.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </section>

          <section className="py-16 bg-gray-100 min-h-screen flex justify-center items-center">
            <Container maxWidth="md" className="flex flex-col gap-10">
              <Typography
                variant="h3"
                component="h2"
                className="text-center mb-12 font-semibold"
              >
                Lo que Dicen Nuestros Estudiantes
              </Typography>
              <Carousel
                animation="slide"
                interval={6000}
                navButtonsAlwaysInvisible={true}
              >
                {testimonios.map((testimonio, index) => (
                  <Card
                    key={index}
                    className="bg-white shadow-lg flex flex-col gap-10 rounded-lg overflow-hidden"
                  >
                    <CardContent className="p-8">
                      <Typography
                        variant="body1"
                        className="mb-4 text-lg italic"
                      >
                        "{testimonio.texto}"
                      </Typography>
                      <Box className="flex items-center">
                        <Avatar src={testimonio.avatar} className="mr-4" />
                        <div>
                          <Typography
                            variant="subtitle1"
                            className="font-semibold"
                          >
                            {testimonio.nombre}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonio.rol}
                          </Typography>
                        </div>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Carousel>
            </Container>
          </section>

          <section className="bg-gray-900 text-white py-16 min-h-screen flex justify-center items-center">
            <Container
              maxWidth="md"
              className="text-center flex flex-col gap-10 items-center"
            >
              <Typography
                variant="h3"
                component="h2"
                className="mb-4 font-bold"
              >
                ¿Listo para Comenzar tu Viaje de Aprendizaje?
              </Typography>
              <Typography variant="h6" component="p" className="mb-8">
                ¡Únete a miles de estudiantes y mejora tus habilidades hoy!
              </Typography>
              {isAuthenticated ? (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleLoggedIn}
                  className="px-8 py-3 text-lg"
                >
                  Comienza a Aprender Ahora
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleLogin}
                  className="px-8 py-3 text-lg"
                >
                  Ingresa y estudia con nosotros
                </Button>
              )}
            </Container>
          </section>
        </main>

        <footer className="bg-gray-800 text-white py-12">
          <Typography variant="body2" className="text-center mt-8">
            © {new Date().getFullYear()} PlataformaEdu. Todos los derechos
            reservados.
          </Typography>
        </footer>
      </div>
    </ThemeProvider>
  );
};
