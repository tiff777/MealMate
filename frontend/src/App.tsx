import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home/HomePage";
import MealDashboard from "./pages/Meal/MealDashboardPage";
import BuddyPage from "./pages/Buddy/BuddyPage";
import LoginPage from "./pages/Login/LoginPage";
import ResgisterPage from "./pages/Register/RegisterPage";
import MyMealPage from "./pages/MyMeal/MyMealPage";
import CreateMealPage from "./pages/Meal/CreateMealPage";
import UpdateMealPage from "./pages/Meal/ModifyMealPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/meal" index element={<MealDashboard />} />
          <Route path="/buddy" index element={<BuddyPage />} />
          <Route path="/my-meals" index element={<MyMealPage />} />
          <Route path="/messages" index element={<Home />} />
          <Route path="/profile" index element={<Home />} />
          <Route path="/login" index element={<LoginPage />} />
          <Route path="/register" index element={<ResgisterPage />} />
          <Route path="/create-meals" index element={<CreateMealPage />} />
          <Route path="/update-meal/:mid" element={<UpdateMealPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
