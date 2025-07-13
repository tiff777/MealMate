import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Register/RegisterForm";
import { apiClient } from "../../hook/api";
import type { RegisterUser } from "../../types";
import { AppContext } from "../../context/AppContext";

function ResgisterPage() {
  const { loginUser } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterUser>({
    name: "",
    email: "",
    password: "",
    university: "",
    major: "",
    bio: "",
    interests: [],
    preferredCuisines: [],
    avatar: "",
  });

  const handleNext = () => {
    if (currentPage === 1) {
      setCurrentPage(2);
    }
  };

  const handleBack = () => {
    if (currentPage === 2) {
      setCurrentPage(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up data:", formData);

    try {
      const response = await apiClient.post("/user", formData);
      if (!response) {
        throw new Error("Regiter failed");
      }
      console.log("Test response: ", response.data);

      if (response.data.user) {
        loginUser(response.data.user, response.data.token);
        navigate("/meal");
      }
    } catch (error) {
      console.log("Error in register: ", error);
    }
  };

  return (
    <RegisterForm
      currentPage={currentPage}
      handleNext={handleNext}
      handleBack={handleBack}
      formData={formData}
      setFormData={setFormData}
      handleSubmit={handleSubmit}
    />
  );
}

export default ResgisterPage;
