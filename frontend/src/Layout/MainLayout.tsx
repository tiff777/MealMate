import { Outlet } from "react-router-dom";
import NavBar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";

function MainLayout() {
  return (
    <>
      <NavBar />

      <main className="flex-1 dark:bg-[#334155] text-[#213547] dark:text-[#f1f5f9] transition-colors">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
