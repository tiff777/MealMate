import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";

function MainLayout() {
  const location = useLocation();
  const showFooter = location.pathname === "/";
  return (
    <>
      <div className="min-h-screen flex flex-col dark:bg-[#334155] bg-gray-50 transition-colors text-[#213547] dark:text-[#f1f5f9]">
        <NavBar />

        <main className="flex-1 text-[#213547] dark:text-[#f1f5f9] transition-colors">
          <Outlet />
        </main>

        {showFooter && <Footer />}
      </div>
    </>
  );
}

export default MainLayout;
