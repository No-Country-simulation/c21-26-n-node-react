import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { resetPassword } from "../api/auth";
function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    resetPassword(values);
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
