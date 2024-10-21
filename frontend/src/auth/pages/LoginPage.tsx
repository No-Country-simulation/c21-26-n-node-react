import { useForm } from "react-hook-form";
import { useAuth } from "../../shared/context/AuthContext";
import { useEffect } from "react";
import { Button, Divider, Link, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuthenticated, errors: authErrors, login } = useAuth();

  const navigate = useNavigate();


  const onSubmit = handleSubmit(async (values) => {
    login(values);
    navigate('/',{replace:true})
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-5 border rounded-xl">
        <div className="w-full md:w-96">
          <img
            src="/images/education.webp"
            alt="education_login"
            className="h-full object-fill w-full"
          />
        </div>
        <div className="flex flex-col gap-4">
          <form
            onSubmit={onSubmit}
            className="flex flex-col items-center gap-5 px-2 py-3"
          >
            <h3 className="text-center font-semibold font-Roboto text-2xl my-4">
              Iniciar Sesión
            </h3>
            <TextField
              className="w-full md:w-96"
              type="email"
              error={errors.email ? true : false}
              {...register("email", { required: true })}
              label={
                errors.password
                  ? "Correo electrónico requerido"
                  : "Correo electrónico"
              }
              variant="outlined"
            />
            <TextField
              className="w-full md:w-96"
              type="password"
              error={errors.password ? true : false}
              {...register("password", { required: true })}
              label={errors.password ? "Contraseña requerida" : "Contraseña"}
              variant="outlined"
            />
            <Button variant="contained" type="submit">
              Ingresar
            </Button>
          </form>
          <Divider variant="middle" />
          <div className="w-full flex flex-col md:flex-row justify-evenly mb-4 items-center">
            <span>
              Eres nuevo?{" "}
              <Link href="/auth/register" underline="hover">
                Registrate
              </Link>{" "}
            </span>
            <Divider variant="middle" orientation="vertical" />
            <Link href="/auth/forgot" underline="hover">
              Olvidaste tu contraseña?{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
