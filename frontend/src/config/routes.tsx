import { lazy } from "react";
import ProtectedRoute from "../components/RouteProtection/ProtectedRoute";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const MealPage = lazy(() => import("../pages/Meal/MealDashboardPage"));
const BuddyPage = lazy(() => import("../pages/Buddy/BuddyPage"));
const LoginPage = lazy(() => import("../pages/Login/LoginPage"));
const RegisterPage = lazy(() => import("../pages/Register/RegisterPage"));
const MyMealsPage = lazy(() => import("../pages/MyMeal/MyMealPage"));
const MessagesPage = lazy(() => import("../pages/Chat/ChatRoomPage"));
const SettingsPage = lazy(() => import("../pages/Setting/SettingPage"));
const PublicUserProfilePage = lazy(() => import("../pages/Buddy/ProfilePage"));
const CreateMealPage = lazy(() => import("../pages/Meal/CreateMealPage"));
const UpdateMealPage = lazy(() => import("../pages/Meal/ModifyMealPage"));
const ResetPasswordPage = lazy(() => import("../pages/Setting/ResetUserPage"));

export const routeConfig = [
  {
    path: "/",
    element: <HomePage />,
    type: "public",
  },

  {
    path: "/login",
    element: (
      <ProtectedRoute redirectWhenAuth={true} redirectTo="/">
        <LoginPage />
      </ProtectedRoute>
    ),
    type: "guest",
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute redirectWhenAuth={true} redirectTo="/">
        <RegisterPage />
      </ProtectedRoute>
    ),
    type: "guest",
  },
  {
    path: "/forgot-password",
    element: (
      <ProtectedRoute redirectWhenAuth={true} redirectTo="/">
        <ResetPasswordPage />
      </ProtectedRoute>
    ),
    type: "guest",
  },

  {
    path: "/meal",
    element: (
      <ProtectedRoute requireAuth={false}>
        <MealPage />
      </ProtectedRoute>
    ),
    type: "public",
  },
  {
    path: "/buddy",
    element: (
      <ProtectedRoute requireAuth={false}>
        <BuddyPage />
      </ProtectedRoute>
    ),
    type: "public",
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute requireAuth={false}>
        <PublicUserProfilePage />
      </ProtectedRoute>
    ),
    type: "public",
  },
  {
    path: "/my-meals",
    element: (
      <ProtectedRoute requireAuth={true}>
        <MyMealsPage />
      </ProtectedRoute>
    ),
    type: "protected",
  },
  {
    path: "/messages",
    element: (
      <ProtectedRoute requireAuth={true}>
        <MessagesPage />
      </ProtectedRoute>
    ),
    type: "protected",
  },
  {
    path: "/setting",
    element: (
      <ProtectedRoute requireAuth={true}>
        <SettingsPage />
      </ProtectedRoute>
    ),
    type: "protected",
  },
  {
    path: "/create-meals",
    element: (
      <ProtectedRoute requireAuth={true}>
        <CreateMealPage />
      </ProtectedRoute>
    ),
    type: "protected",
  },
  {
    path: "/update-meal/:mid",
    element: (
      <ProtectedRoute requireAuth={true}>
        <UpdateMealPage />
      </ProtectedRoute>
    ),
    type: "protected",
  },
];
