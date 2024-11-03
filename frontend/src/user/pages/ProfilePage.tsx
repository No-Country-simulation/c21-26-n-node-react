/* import { Button } from "@mui/material";

import { useAuth } from "../../shared/context/AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  return (
    <div className="w-full min-h-screen flex justify-center items-center px-5">
      <div className="flex flex-col sm:flex-row border p-4 rounded-xl gap-10">
        <div className="flex flex-col gap-4 items-center">
          <img
            src="/images/not-found-image.webp"
            alt="not-found-image"
            className="rounded-full shadow-lg w-52"
          />
          <h3 className="text-center uppercase text-xl text-red-500 font-semibold">
            {user?.username}
          </h3>
          <Button variant="contained" color="warning">
            Enviar mensaje
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <span>Información del usuario:</span>
          <h1 className="text-lg">
            <span className="font-semibold text-blue-400">
              {user?.role == "student"
                ? "Estudiante"
                : user?.role == "teacher"
                ? "Profesor"
                : "Padre"}
            </span>
          </h1>
          <h1 className="text-lg">
            <span className="font-semibold text-blue-400">{user?.email}</span>
          </h1>
          <Button variant="contained" color="primary" className="w-52">
            Ver calificaciones
          </Button>
          <Button variant="contained" color="primary" className="w-52">
            Ver plan de estudio
          </Button>
          <Button variant="contained" color="primary" className="w-52">
            Editar perfil
          </Button>
          <Button
            onClick={logout}
            variant="contained"
            color="primary"
            className="w-52"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
 */

import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Chip,
  Divider,
  IconButton,
  Typography,
  Box,
  Paper,
  useTheme,
} from "@mui/material";
import { Mail, Edit, School, Person, Logout, Home, BackHandOutlined } from "@mui/icons-material";
import { useAuth } from "../../shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GiReturnArrow } from "react-icons/gi";

function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const theme = useTheme();

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "student":
        return "Estudiante";
      case "teacher":
        return "Profesor";
      default:
        return "Padre";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "student":
        return "primary";
      case "teacher":
        return "success";
      default:
        return "warning";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        p: { xs: 2, md: 4 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.grey[100],
      }}
    >
      <Card
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "900px",
          position: "relative",
          overflow: "visible",
        }}
      >
        <CardHeader
          action={
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="primary">
                <Mail />
              </IconButton>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Box>
          }
        />
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Chip
                    label={getRoleLabel(user?.role || "")}
                    color={getRoleColor(user?.role || "") as any}
                    size="small"
                    sx={{ fontSize: "0.75rem" }}
                  />
                }
              >
                <Avatar
                  src="/images/not-found-image.webp"
                  sx={{
                    width: { xs: 120, md: 150 },
                    height: { xs: 120, md: 150 },
                    border: `4px solid ${theme.palette.background.paper}`,
                    boxShadow: theme.shadows[3],
                  }}
                />
              </Badge>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {user?.username}
                  {user?.name}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {user?.email}
                </Typography>
              </Box>
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />

            <Box sx={{ flex: 1, width: "100%" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Información Académica
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<School />}
                  fullWidth
                  size="large"
                >
                  Ver calificaciones
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Person />}
                  fullWidth
                  size="large"
                >
                  Ver plan de estudio
                </Button>
              </Box>

              <Typography variant="h6" gutterBottom fontWeight="bold">
                Estadísticas
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: theme.palette.grey[50],
                  }}
                >
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    12
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cursos Completados
                  </Typography>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: theme.palette.grey[50],
                  }}
                >
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    15
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cursos Inscritos
                  </Typography>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: theme.palette.grey[50],
                  }}
                >
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    3
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cursos Faltantes
                  </Typography>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: theme.palette.grey[50],
                  }}
                >
                  <Typography variant="h4" fontWeight="bold" color="primary">
                    98%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Promedio
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            bgcolor: theme.palette.grey[50],
            p: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            alignContent: 'center',
            justifyContent: 'center'
          }}
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            onClick={logout}
          >
            Cerrar sesión
          </Button>
          <Button
            variant="contained"
            color="info"
            startIcon={<GiReturnArrow />}
            onClick={()=>navigate('/courses',{replace:true})}
          >
            Volver al inicio
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default Profile;
