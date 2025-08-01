import LoginForm from "../../components/Form/LoginForm";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../hook/api";
import axios from "axios";

function LoginPage() {
  const { loginUser, showError } = useContext(AppContext);
  const navigate = useNavigate();

  // Handle form submission
  async function handleLogin(
    email: string,
    password: string,
    isRemember: boolean
  ) {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      // If successful, log the user in and navigate to /meal
      if (response.data.user) {
        loginUser(response.data.user, response.data.token, isRemember);
        navigate("/meal");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = (error.response?.data as any)?.message || error.message;
        showError(`Login failed: ${msg}`);
      } else {
        showError("Login failed: Unknown error");
      }
    }
  }
  return <LoginForm onSubmit={handleLogin} />;
}

export default LoginPage;
