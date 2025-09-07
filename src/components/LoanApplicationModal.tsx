import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import emailjs from "@emailjs/browser";
import { CheckCircle, Clock, X } from "lucide-react";

export default function LoanApplicationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    bvn: "",
    nin: "",
    utilityBillLink: "",
    bankStatementLink: "",
    passportPhotoLink: "",
    guarantor: "",
    guarantorIdLink: "",
  });

  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      bvn: "",
      nin: "",
      guarantor: "",
      guarantorIdLink: "",
      utilityBillLink: "",
      bankStatementLink: "",
      passportPhotoLink: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidUrl = (url: string) =>
      url.startsWith("http://") || url.startsWith("https://");

    const links = [
      "utilityBillLink",
      "bankStatementLink",
      "passportPhotoLink",
      "guarantorIdLink",
    ];

    for (const key of links) {
      if (!isValidUrl(formData[key as keyof typeof formData])) {
        alert(`Invalid or missing URL for ${key.replace(/([A-Z])/g, " $1")}`);
        return;
      }
    }

    const templateParams = {
      bvn: formData.bvn,
      nin: formData.nin,
      utility_bill_link: formData.utilityBillLink,
      bank_statement_link: formData.bankStatementLink,
      passport_photo_link: formData.passportPhotoLink,
      guarantor: formData.guarantor,
      guarantor_id_link: formData.guarantorIdLink,
    };

    setIsSubmitting(true);
    setIsError(false);
    setIsSent(false);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_IDI!,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );
      setIsSent(true);
      alert("Form submitted successfully. We'll be in touch shortly.");
      resetForm();
      onClose();
    } catch (error) {
      console.error("Submission failed", error);
      setIsError(true);
      alert("There was a problem submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="w-full max-w-2xl transform rounded-2xl bg-white p-6 shadow-xl transition-all border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    Get Started with Your Loan
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 transform hover:scale-110 active:scale-95"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg font-semibold mb-2">Borrower's Details</p>
                      <input
                        name="bvn"
                        type="text"
                        placeholder="BVN"
                        required
                        className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
                        onChange={handleChange}
                        value={formData.bvn}
                      />
                      <input
                        name="nin"
                        type="text"
                        placeholder="NIN"
                        required
                        className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
                        onChange={handleChange}
                        value={formData.nin}
                      />
                      <input
                        name="utilityBillLink"
                        type="url"
                        placeholder="Utility Bill Link"
                        required
                        className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
                        onChange={handleChange}
                        value={formData.utilityBillLink}
                      />
                      <input
                        name="bankStatementLink"
                        type="url"
                        placeholder="Bank Statement Link (Within 6 Months)"
                        required
                        className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
                        onChange={handleChange}
                        value={formData.bankStatementLink}
                      />
                      <input
                        name="passportPhotoLink"
                        type="url"
                        placeholder="Passport Photo Link"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        onChange={handleChange}
                        value={formData.passportPhotoLink}
                      />
                    </div>

                    <div>
                      <p className="text-lg font-semibold mb-2">Guarantor's Details</p>
                      <input
                        name="guarantor"
                        type="text"
                        placeholder="Guarantor Full Name"
                        required
                        className="w-full mb-3 px-4 py-3 border border-gray-300 rounded-lg"
                        onChange={handleChange}
                        value={formData.guarantor}
                      />
                      <input
                        name="guarantorIdLink"
                        type="url"
                        placeholder="Guarantor BVN/NIN Link"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        onChange={handleChange}
                        value={formData.guarantorIdLink}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium transition-all hover:bg-indigo-700 disabled:opacity-70"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </div>

                  {isSent && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-green-600 flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Application sent successfully!</span>
                      </div>
                    </div>
                  )}

                  {isError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="text-red-600 flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span className="font-medium">Failed to send application</span>
                      </div>
                    </div>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
