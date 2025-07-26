import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { apiClient } from "../../hook/api";
import { FiMail } from "react-icons/fi";
import PasswordInput from "../../components/Form/PasswordInput";
import ButtonFactory from "../../components/Button/ButtonFactory";
import TextInput from "../../components/Form/TextInput";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [passwordData, setPasswordData] = useState({
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [step, setStep] = useState(1);

  const { loginUser, showError, showSuccess } = useContext(AppContext);

  //  Get reset token by verifying email
  const handleGetToken = async () => {
    try {
      const response = await apiClient.post("/auth/forgot-password", { email });

      const token = response.data;

      setToken(token);
      setStep(2);
    } catch (err) {
      showError("Fail to reset");
    }
  };

  //  Reset the password using token
  const handleResetPassword = async () => {
    try {
      const response = await apiClient.post("/auth/reset-password", {
        token,
        newPassword: passwordData.new,
      });

      if (response.status !== 200) {
        showError("Fail to reset");
      }

      loginUser(response.data.user, response.data.token);

      showSuccess("Password reset successful");
    } catch (err) {
      showError("Fail to reset");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>

      {step === 1 && (
        <>
          <TextInput
            label="Email"
            placeholder="Enter your login email"
            value={email}
            onChange={(val) => setEmail(val)}
            icon={<FiMail />}
          />

          <button
            onClick={handleGetToken}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Verify Email
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={passwordData.new}
            onChange={(val) =>
              setPasswordData((prev) => ({ ...prev, new: val }))
            }
            show={showPassword.new}
            setShow={(val) =>
              setShowPassword((prev) => ({ ...prev, new: val }))
            }
          />

          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm new password"
            value={passwordData.confirm}
            onChange={(val) =>
              setPasswordData((prev) => ({ ...prev, confirm: val }))
            }
            show={showPassword.confirm}
            setShow={(val) =>
              setShowPassword((prev) => ({ ...prev, confirm: val }))
            }
          />

          <ButtonFactory
            type="view"
            message="Update Password"
            onClick={() => handleResetPassword()}
          />
        </>
      )}
    </div>
  );
}
