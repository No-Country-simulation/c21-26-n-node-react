import { useAuth } from "../context/AuthContext";

function Profile() {
  const { logout } = useAuth();
  return (
    <div>
      <div>Ruta protegida profile</div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Profile;
