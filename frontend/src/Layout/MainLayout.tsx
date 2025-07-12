import { Outlet } from "react-router-dom";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";

function MainLayout() {
  const showFooter = location.pathname == "/";
  return (
    <>
      <NavBar />

      <main className="flex-1 dark:bg-[#334155] text-[#213547] dark:text-[#f1f5f9] transition-colors">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </>
  );
}

export default MainLayout;
