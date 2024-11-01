import { useForm } from "react-hook-form";
import { useAuth } from "../../shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, MenuItem, TextField } from "@mui/material";
import { RegisterUser } from "../../shared/types/authInterfaces";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>();

  const { signUp} = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values:RegisterUser) => {
    signUp(values);
    navigate('/auth/login',{replace:true})
  });

  const goHome = ()=> {
    navigate('/',{replace:true})
  }

  return (
    <div className="min-h-screen flex px-10 md:px-0 items-center justify-center bg-gray-300">
      <form
        onSubmit={onSubmit}
        className="w-full md:w-auto flex flex-col gap-5 px-4 py-2 border items-center bg-white rounded-xl"
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
          <MenuItem key="parent" value="parent">
            Padre
          </MenuItem>
          <MenuItem key="student" value="student">
            Estudiante
          </MenuItem>
          <MenuItem key="teacher" value="teacher">
            Profesor
          </MenuItem>
        </TextField>
        <div className="flex flex-row items-center justify-center gap-4">
        <Button variant="contained" type="submit">
          Registrar
        </Button>
         <Button variant="contained" color="error" onClick={()=>goHome()}>
          Cancelar
        </Button>
        </div>
        <div className="w-full max-w-md">
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 EduTech. Todos los derechos reservados.
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
