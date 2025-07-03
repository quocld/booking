"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface AddContactModalProps {
  open: boolean;
  onClose: () => void;
  onAddContact?: (contact: ContactFormValues) => void; // optional callback for parent
}

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  additionalPhone: string;
  notes: string;
}

export default function AddContactModal({ open, onClose, onAddContact }: AddContactModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, submitCount },
    reset,
    watch,
    setError,
    clearErrors,
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      additionalPhone: "",
      notes: "",
    },
    mode: "onChange",
  });

  const watchedName = watch("name");
  const watchedEmail = watch("email");
  const watchedPhone = watch("phone");
  const watchedAdditionalPhone = watch("additionalPhone");

  // Custom validation for at least one contact field
  const isContactValid =
    watchedEmail.trim() !== "" ||
    watchedPhone.trim() !== "" ||
    watchedAdditionalPhone.trim() !== "";

  // Error state for contact fields
  const showContactError =
    submitCount > 0 && !!watchedName.trim() && !isContactValid;

  const onSubmit = async (data: ContactFormValues) => {
    if (!isContactValid) {
      setError("email", { type: "manual", message: "Please enter at least one field: email or phone number." });
      setError("phone", { type: "manual", message: "Please enter at least one field: email or phone number." });
      setError("additionalPhone", { type: "manual", message: "Please enter at least one field: email or phone number." });
      return;
    }
    clearErrors(["email", "phone", "additionalPhone"]);
    if (onAddContact) {
      await onAddContact(data);
    }
    reset();
    onClose();
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <Dialog.Panel className="fixed right-0 top-0 h-full w-full max-w-md md:max-w-md bg-gray-900 p-6 shadow-xl border-l border-gray-700 flex flex-col z-50 text-gray-100 pointer-events-auto">
              {/* Close (X) button */}
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 focus:outline-none"
                onClick={() => { reset(); onClose(); }}
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Dialog.Title className="text-xl font-bold text-gray-100 mb-2">Add Contact</Dialog.Title>
              <p className="text-sm text-gray-400 mb-4">Please enter at least one field: email or phone number.</p>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1 flex flex-col">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full name"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${errors.name ? 'border-[#FF4D4F]' : 'border-gray-700'} text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    {...register("email", {
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${showContactError ? 'border-[#FF4D4F]' : 'border-gray-700'} text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {showContactError && <p className="text-[#FF4D4F] text-xs mt-1">Please enter at least one field: email or phone number.</p>}
                  {errors.email && errors.email.type === 'pattern' && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Primary phone number"
                    {...register("phone")}
                    className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${showContactError ? 'border-[#FF4D4F]' : 'border-gray-700'} text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {showContactError && <p className="text-[#FF4D4F] text-xs mt-1">Please enter at least one field: email or phone number.</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Additional Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Secondary phone number (optional)"
                    {...register("additionalPhone")}
                    className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${showContactError ? 'border-[#FF4D4F]' : 'border-gray-700'} text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {showContactError && <p className="text-[#FF4D4F] text-xs mt-1">Please enter at least one field: email or phone number.</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Note</label>
                  <textarea
                    placeholder="Add any remarks..."
                    {...register("notes")}
                    className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4 mt-auto">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md border border-gray-500 text-gray-200 hover:bg-gray-800 transition-colors focus:outline-none"
                    onClick={() => { reset(); onClose(); }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 focus:outline-none"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
} 