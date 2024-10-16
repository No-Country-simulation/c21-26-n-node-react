import { useAuth } from "../../shared/context/AuthContext";

function Profile() {
  const { logout, user } = useAuth();
  console.log(user);
  return (
    <div>
      <div className="flex flex-col mx-auto justify-center items-center">
        Ruta protegida profile
        <h1>{user?.email}</h1>
        <h2>{user?.name}</h2>
        <h3>{user?.role}</h3>
        <button className="bg-red-600 text-black mt-10" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
