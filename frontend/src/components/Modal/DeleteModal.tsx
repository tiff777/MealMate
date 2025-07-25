import { title } from "process";
import React, { useState } from "react";
import { IoWarning, IoClose } from "react-icons/io5";
import LoadingSpinner from "../UI/LoadingSpinner";

interface DeleteModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  isLoading = false,
}: DeleteModalProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50 bg-opacity-50 overflow-y-auto overflow-x-hidden"
      onClick={handleBackdropClick}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 transition-colors duration-200">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoClose className="w-3 h-3" />
            <span className="sr-only">Close modal</span>
          </button>

          {/* Modal Content */}
          <div className="p-4 md:p-5 text-center">
            {/* Warning Icon */}
            <IoWarning className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />

            {/* Title */}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-center">
              {/* Confirm Button */}
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isLoading}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner message="Deleting..." />
                  </>
                ) : (
                  "Delete"
                )}
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="py-2.5 px-5 sm:ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
