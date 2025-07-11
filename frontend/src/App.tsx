import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home/HomePage";
import MealDashboard from "./pages/Dashboard/MealDashboardPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/meal" index element={<MealDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
