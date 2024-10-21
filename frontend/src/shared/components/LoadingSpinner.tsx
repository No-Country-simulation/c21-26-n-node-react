import { CircularProgress } from "@mui/material"

export const LoadingSpinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center px-4 sm:px-2 md:px-0">
      <div className="w-full px-20 py-10 sm:w-72 md:w-96 flex justify-center items-center gap-5 border rounded-2xl">
        <span className="text-xl font-semibold text-gray-400 font-Roboto">Cargando</span> <CircularProgress color="primary" />
      </div>
    </div>
  )
}
