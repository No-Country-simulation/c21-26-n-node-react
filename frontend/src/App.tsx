import { AppRoutes } from "./AppRoutes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pb-16 md:pb-0 md:pt-16">
          <AppRoutes />
        </main>
      </div>
    </>
  );
}

export default App;
