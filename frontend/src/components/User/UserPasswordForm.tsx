import { useState } from "react";
import { FiLock } from "react-icons/fi";
import PasswordInput from "../Form/PasswordInput";
import ButtonFactory from "../Button/ButtonFactory";
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

  const oldPasswordCheck = async () => {
    const valid = await handleOldPasswordCheck(passwordData.current);
    setIsOldPasswordValid(valid);
  };

  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Change Password
      </h2>

      {!isOldPasswordValid && (
        <div>
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
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={passwordData.new}
            onChange={(val) =>
              setPasswordData((prev) => ({ ...prev, new: val }))
            }
            show={showPasswords.new}
            setShow={(val) =>
              setShowPasswords((prev) => ({ ...prev, new: val }))
            }
          />

          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm new password"
            value={passwordData.confirm}
            onChange={(val) =>
              setPasswordData((prev) => ({ ...prev, confirm: val }))
            }
            show={showPasswords.confirm}
            setShow={(val) =>
              setShowPasswords((prev) => ({ ...prev, confirm: val }))
            }
          />

          <ButtonFactory
            type="view"
            message="Update Password"
            onClick={() => handleChangePassword(passwordData.new)}
          />
        </>
      )}
    </div>
  );
}

export default UserPasswordForm;
