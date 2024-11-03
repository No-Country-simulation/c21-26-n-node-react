// import { Button, MenuItem, TextField } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// export const RegisterCoursePage = () => {

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const navigate = useNavigate();

//   const onSubmit = handleSubmit(async (values) => {
//     navigate('/auth/login',{replace:true})
//   });


//   return (
//     <div className="w-full min-h-screen flex justify-center items-center">
//       <form className="flex flex-col gap-4 items-center" onSubmit={onSubmit}>
//       <h3 className="text-center font-semibold font-Roboto text-2xl my-4">
//           Registra un nuevo curso
//         </h3>
//         <TextField
//           className="w-full md:w-96"
//           error={errors.titulo ? true : false}
//           label={errors.titulo ? "Titulo requerido" : "Titulo del curso"}
//           {...register("titulo", { required: true })}
//           variant="outlined"
//         />
//         <TextField
//           className="w-full md:w-96"
//           error={errors.description ? true : false}
//           label={errors.description ? "Descripción requerida" : "Descripción del curso"}
//           {...register("description", { required: true })}
//           variant="outlined"
//         />
//         <TextField
//           className="w-full md:w-96"
//           type="file"
//           error={errors.email ? true : false}
//           {...register("email", { required: true })}
//           variant="outlined"
//         />
//         <Button variant="contained" type="submit">
//           Registrar nuevo curso
//         </Button>
//       </form>
//     </div>
//   )
// }
