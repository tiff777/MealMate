import LoginForm from "../../components/Form/LoginForm";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import apiClient from "../../hook/api";

function LoginPage() {
  const { loginUser } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogin(email: string, password: string) {
    console.log("Login attempt with email in page:", email);
    console.log("Login attempt with password in page:", password);

    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      if (response.data.user) {
        loginUser(response.data.user);
        navigate("/meal");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  }
  return <LoginForm onSubmit={handleLogin} />;
}

export default LoginPage;
