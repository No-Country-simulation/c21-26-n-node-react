import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <form
        className="flex flex-col gap-2 mx-auto max-w-52 mt-10 rounded-md p-4 bg-gray-500 text-black font-bold"
        onSubmit={handleSubmit(async (values) => {
          const response = await registerRequest(values);
          console.log(response);
        })}
      >
        <input
          type="text"
          placeholder="username"
          {...register("username", { required: true })}
        />

        <input
          placeholder="password"
          type="password"
          {...register("password", { required: true })}
        />
        <input
          placeholder="email"
          type="email"
          {...register("email", { required: true })}
        />
        <select {...register("role", { required: true })}>
          <option value="father">Father</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default RegisterPage;
