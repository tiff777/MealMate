import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import LandingPage from "./pages/Home/LandingPage";
import MealDashboard from "./pages/Meal/MealDashboardPage";
import BuddyPage from "./pages/Buddy/BuddyPage";
import LoginPage from "./pages/Login/LoginPage";
import ResgisterPage from "./pages/Register/RegisterPage";
import MyMealPage from "./pages/MyMeal/MyMealPage";
import CreateMealPage from "./pages/Meal/CreateMealPage";
import UpdateMealPage from "./pages/Meal/ModifyMealPage";
import SettingsPage from "./pages/Setting/SettingPage";
import ResetPasswordPage from "./pages/Setting/ResetUserPage";
import ChatRoomPage from "./pages/Chat/ChatRoomPage";
import PublicUserProfilePage from "./pages/Buddy/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/meal" index element={<MealDashboard />} />
          <Route path="/buddy" index element={<BuddyPage />} />
          <Route path="/profile/:id" element={<PublicUserProfilePage />} />
          <Route path="/my-meals" index element={<MyMealPage />} />
          <Route path="/messages" index element={<ChatRoomPage />} />
          <Route path="/setting" index element={<SettingsPage />} />
          <Route path="/login" index element={<LoginPage />} />
          <Route path="/register" index element={<ResgisterPage />} />
          <Route path="/create-meals" index element={<CreateMealPage />} />
          <Route path="/update-meal/:mid" element={<UpdateMealPage />} />
          <Route path="/forgot-password" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
