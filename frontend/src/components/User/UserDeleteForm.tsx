import ButtonFactory from "../Button/ButtonFactory";

const UserDeleteForm = ({
  handleDeleteAccount,
}: {
  handleDeleteAccount: () => void;
}) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Account</h2>

    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
      <h3 className="text-lg font-medium text-red-800 mb-2">Delete Account</h3>
      <p className="text-red-700 mb-4">
        After deleting your account, all your data will be permanently removed,
        including:
      </p>

      <ul className="list-disc list-inside text-red-700 mb-6 space-y-1">
        <li>Personal profile and settings</li>
        <li>All chat history</li>
        <li>Friends list and connections</li>
        <li>Created groups and events</li>
        <li>Uploaded photos and files</li>
      </ul>

      <p className="text-red-700 mb-4 font-medium">
        ⚠️ This action cannot be undone! Please make sure you have backed up any
        important data.
      </p>

      <ButtonFactory
        type="delete"
        message="Delete Account"
        onClick={handleDeleteAccount}
      />
    </div>
  </div>
);

export default UserDeleteForm;
