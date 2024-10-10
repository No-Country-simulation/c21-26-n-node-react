import { Navigate, Route, Routes } from "react-router-dom"
import { HomeRoutes } from "./home/routes/HomeRoutes"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoutes/>} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  )
}
