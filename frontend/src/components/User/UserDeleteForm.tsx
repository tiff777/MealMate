import ButtonFactory from "../Button/ButtonFactory";
import { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";

function UserDeleteForm({
  handleDeleteAccount,
}: {
  handleDeleteAccount: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setIsModalOpen(false);
    handleDeleteAccount();
  };

  const closeModal = () => {
    if (!isDeleting) {
      setIsModalOpen(false);
    }
  };
  return (
    <>
      <div className="space-y-4 sm:space-y-6 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-semibold text-red-600 dark:text-red-400 mb-3 sm:mb-4 transition-colors duration-200">
          Delete Account
        </h2>

        <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 sm:p-6 bg-red-50 dark:bg-red-900/20 transition-colors duration-200">
          <h3 className="text-base sm:text-lg font-medium text-red-800 dark:text-red-200 mb-2 transition-colors duration-200">
            Delete Account
          </h3>
          <p className="text-sm sm:text-base text-red-700 dark:text-red-300 mb-3 sm:mb-4 leading-relaxed transition-colors duration-200">
            After deleting your account, all your data will be permanently
            removed, including:
          </p>

          <ul className="list-disc list-inside text-sm sm:text-base text-red-700 dark:text-red-300 mb-4 sm:mb-6 space-y-1 sm:space-y-1.5 transition-colors duration-200">
            <li className="pl-1">Personal profile and settings</li>
            <li className="pl-1">All chat history</li>
            <li className="pl-1">Friends list and connections</li>
            <li className="pl-1">Created groups and events</li>
            <li className="pl-1">Uploaded photos and files</li>
          </ul>

          <div className="flex items-start space-x-2 mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 dark:bg-red-800/30 rounded-lg border-l-4 border-red-500 dark:border-red-400 transition-colors duration-200">
            <span className="text-red-600 dark:text-red-400 text-lg sm:text-xl flex-shrink-0 mt-0.5">
              ⚠️
            </span>
            <p className="text-sm sm:text-base text-red-700 dark:text-red-300 font-medium leading-relaxed transition-colors duration-200">
              This action cannot be undone! Please make sure you have backed up
              any important data.
            </p>
          </div>

          <div className="flex justify-start">
            <ButtonFactory
              type="delete"
              message="Delete Account"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          <DeleteModal
            isOpen={isModalOpen}
            title="Are you sure you want to delete your account?"
            onClose={closeModal}
            onConfirm={handleDelete}
            isLoading={isDeleting}
          />
        </div>
      </div>
    </>
  );
}

export default UserDeleteForm;
