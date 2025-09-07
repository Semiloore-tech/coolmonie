import React from 'react';
import { CheckCircle } from 'lucide-react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500 h-12 w-12" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Message Sent</h2>
        <p className="text-gray-600 mb-6">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
        <button
          onClick={onClose}
          className="bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
