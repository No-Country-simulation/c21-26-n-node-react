import { Button } from "@mui/material";

import { useAuth } from "../../shared/context/AuthContext";

function Profile() {
  const { user } = useAuth();
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
        </div>
      </div>
    </div>
  );
}

export default Profile;
