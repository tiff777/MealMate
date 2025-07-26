import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FeaturedSection from "../../components/Landing/FeactureSection";
import type { Meal } from "../../types";
import { apiClient } from "../../hook/api";
import HeroSection from "../../components/Landing/HeroSection";
import CTASection from "../../components/Landing/CTASection";
import MealMeetingSection from "../../components/Landing/MealMeetingSection";
import { AppContext } from "../../context/AppContext";

function HomePage() {
  const [currentMealIndex, setCurrentMealIndex] = useState(0);
  const { isAuthenticated, showError } = useContext(AppContext);
  const navigate = useNavigate();

  const [latestMeals, setLatestMeals] = useState<Meal[]>();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/meal", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const fetchLatestMeal = async () => {
    try {
      const response = apiClient.get("/meal/latest");
      const mealData = (await response).data;
      setLatestMeals(mealData);
    } catch (error) {
      showError("Error in fetching the latest meal");
    }
  };
  useEffect(() => {
    fetchLatestMeal();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  useEffect(() => {
    if (!latestMeals || latestMeals.length === 0) return;
    const interval = setInterval(() => {
      setCurrentMealIndex((prev) => (prev + 1) % latestMeals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [latestMeals]);

  if (!latestMeals) {
    return;
  }

  const currentMeal = latestMeals[currentMealIndex];

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
        {/* Hero Section */}
        <HeroSection
          currentMeal={currentMeal}
          latestMeals={latestMeals}
          currentMealIndex={currentMealIndex}
          setCurrentMealIndex={setCurrentMealIndex}
          navigate={navigate}
        />

        {/* Features Section */}
        <FeaturedSection />

        {/* Meal Meetings Showcase */}
        <MealMeetingSection meals={latestMeals} />
        {/* CTA Section */}
        <CTASection />
      </div>
    </div>
  );
}

export default HomePage;
