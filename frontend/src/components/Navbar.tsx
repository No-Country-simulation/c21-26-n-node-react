import { Home, GraduationCap, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:top-0 md:bottom-auto">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around md:justify-end items-center h-16 gap-8">
          <Link
            to="/"
            className={`flex flex-col md:flex-row items-center gap-1 text-sm ${
              location.pathname === "/"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/courses"
            className={`flex flex-col md:flex-row items-center gap-1 text-sm ${
              location.pathname.includes("/courses")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <GraduationCap className="h-5 w-5" />
            <span>Courses</span>
          </Link>
          <Link
            to="/user/profile"
            className={`flex flex-col md:flex-row items-center gap-1 text-sm ${
              location.pathname.includes("/user/profile")
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
