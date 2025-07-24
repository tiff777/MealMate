import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { routeConfig } from "./config/routes";
import MainLayout from "./Layout/MainLayout";
import LoadingSpinner from "./components/UI/LoadingSpinner";

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner message="Loading..." />}>
        <Routes>
          <Route element={<MainLayout />}>
            {routeConfig.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
