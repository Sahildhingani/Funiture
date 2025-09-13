import { useContext } from "react";
import Nav1 from "./Compnents/Nav1";
import Nav2 from "./Compnents/Nav2";
import Footer from "./Compnents/Footer";
import { Outlet } from "react-router-dom";
import { NotifyContext, Notify } from "./ContextApi/Context";

function AppContent() {
  const { dark } = useContext(Notify);

  return (
    <div
      className={`flex flex-col min-h-screen w-screen transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Navbars */}
      <Nav1 />
      <Nav2 />

      {/* Main content grows to fill available space */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer always at the bottom */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <NotifyContext>
      <AppContent />
    </NotifyContext>
  );
}

export default App;
