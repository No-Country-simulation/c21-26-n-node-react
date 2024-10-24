import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../api/auth";
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    resetPassword(values);
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h3 className="text-center font-semibold font-Roboto text-2xl my-5">
              Recupera tu contraseña!
      </h3>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <TextField
          className="w-full md:w-96"
          type="email"
          error={errors.email ? true : false}
          {...register("email", { required: true })}
          label={
            errors.email
              ? "Correo electrónico requerido"
              : "Correo electrónico"
          }
          variant="outlined"
        />
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
