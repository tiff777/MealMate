import { Outlet } from "react-router-dom";
import NavBar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";

function MainLayout() {
  return (
    <>
      <NavBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
