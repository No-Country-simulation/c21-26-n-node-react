import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, MenuItem, TextField } from "@mui/material";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp, isAuthenticated, errors: AuthErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      alert("You are already logged in");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
    navigate('login',{replace:true})
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5 px-4 py-2 border items-center bg-white rounded-xl"
      >
        <h3 className="text-center font-semibold font-Roboto text-2xl my-4">
          Formulario de registro
        </h3>
        <TextField
          className="w-full md:w-96"
          error={errors.username ? true : false}
          label={errors.username ? "Usuario requerido" : "Usuario"}
          {...register("username", { required: true })}
          variant="outlined"
        />
        <TextField
          className="w-full md:w-96"
          type="password"
          error={errors.password ? true : false}
          label={errors.password ? "Contraseña requerida" : "Contraseña"}
          {...register("password", { required: true })}
          variant="outlined"
        />
        <TextField
          className="w-full md:w-96"
          type="email"
          error={errors.email ? true : false}
          label={
            errors.email ? "Correo electrónico requerido" : "Correo electrónico"
          }
          {...register("email", { required: true })}
          variant="outlined"
        />
        <TextField
          className="w-full md:w-96"
          select
          error={errors.role ? true : false}
          label={errors.role ? "Seleccione un rol" : "Rol del usuario"}
          {...register("role", { required: true })}
          defaultValue="student"
        >
          <MenuItem key="father" value="father">
            Padre
          </MenuItem>
          <MenuItem key="student" value="student">
            Estudiante
          </MenuItem>
          <MenuItem key="teacher" value="teacher">
            Profesor
          </MenuItem>
        </TextField>
        <Button variant="contained" type="submit">
          Registrar
        </Button>
        <div className="w-full max-w-md">
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 Eduflex. Todos los derechos reservados.
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
