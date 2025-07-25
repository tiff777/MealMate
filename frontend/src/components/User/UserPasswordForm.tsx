import { useState } from "react";
import { usePasswordValidation } from "../../hook/usePasswordValidation";
import PasswordInput from "../Form/PasswordInput";
import ButtonFactory from "../Button/ButtonFactory";
import PasswordValidationFeedback from "./PasswordValidationFeedback";
import ConfirmPasswordFeedback from "./ConfirmationPasswordFeedback";
interface UserPasswordFormProps {
  handleChangePassword: (password: string) => void;
  handleOldPasswordCheck: (password: string) => Promise<boolean>;
}

function UserPasswordForm({
  handleChangePassword,
  handleOldPasswordCheck,
}: UserPasswordFormProps) {
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isOldPasswordValid, setIsOldPasswordValid] = useState(false);

  const {
    password,
    confirmPassword,
    passwordValidation,
    matchValidation,
    isPasswordValid,
    setPassword,
    setConfirmPassword,
  } = usePasswordValidation();

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmedPasswordFocused, setIsConfirmedPasswordFocused] =
    useState(false);

  const oldPasswordCheck = async () => {
    const valid = await handleOldPasswordCheck(passwordData.current);
    setIsOldPasswordValid(valid);
  };

  const handlePasswordBlur = () => {
    setIsConfirmedPasswordFocused(false);
    if (isPasswordValid) {
      setPasswordData((prev) => ({ ...prev, new: password }));
    } else {
      setPasswordData((prev) => ({ ...prev, new: "" }));
    }
  };

  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
        Change Password
      </h2>

      {!isOldPasswordValid && (
        <div className="flex flex-col gap-4">
          <PasswordInput
            label="Current Password"
            placeholder="Enter current password"
            value={passwordData.current}
            onChange={(val) =>
              setPasswordData((prev) => ({ ...prev, current: val }))
            }
            show={showPasswords.current}
            setShow={(val) =>
              setShowPasswords((prev) => ({ ...prev, current: val }))
            }
          />
          <ButtonFactory
            type="view"
            message="Check "
            onClick={oldPasswordCheck}
          />
        </div>
      )}

      {isOldPasswordValid && (
        <>
          {/* New Password with Validation */}
          <div>
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              value={password}
              onChange={setPassword}
              show={showPasswords.new}
              setShow={(val) =>
                setShowPasswords((prev) => ({ ...prev, new: val }))
              }
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            {isPasswordFocused && password && (
              <PasswordValidationFeedback
                password={password}
                passwordValidation={passwordValidation}
              />
            )}
          </div>

          {/* Confirm Password with Validation */}
          <div>
            <PasswordInput
              label="Confirm New Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showPasswords.confirm}
              setShow={(val) =>
                setShowPasswords((prev) => ({ ...prev, confirm: val }))
              }
              onFocus={() => setIsConfirmedPasswordFocused(true)}
              onBlur={handlePasswordBlur}
            />
            {isConfirmedPasswordFocused && confirmPassword && (
              <ConfirmPasswordFeedback
                confirmPassword={confirmPassword}
                matchValidation={matchValidation}
              />
            )}
          </div>

          <ButtonFactory
            type="view"
            message="Update Password"
            onClick={() => {
              if (isPasswordValid) {
                handleChangePassword(password);
              }
            }}
          />
        </>
      )}
    </div>
  );
}

export default UserPasswordForm;
