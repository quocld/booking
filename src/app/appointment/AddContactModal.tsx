"use client";

import { Fragment } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useBookingStore } from "./bookingStore";

interface AddContactModalProps {
  open: boolean;
  onClose: () => void;
  onAddContact?: (contact: ContactFormValues) => void; // optional callback for parent
}

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export default function AddContactModal({ open, onClose, onAddContact }: AddContactModalProps) {
  const setClientInfo = useBookingStore((s) => s.setClientInfo);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate adding to contact list (could call onAddContact)
    setClientInfo({
      contactName: data.name,
      email: data.email,
      phone: data.phone,
    });
    if (onAddContact) onAddContact(data);
    reset();
    onClose();
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-50">
          <TransitionChild
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in-out duration-200"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <Dialog.Panel className="fixed right-0 top-0 h-full w-full md:max-w-md bg-gray-900 p-4 md:p-6 shadow-xl border-l border-gray-700 flex flex-col z-50">
              <Dialog.Title className="text-lg font-semibold text-gray-100 mb-4">Add New Contact</Dialog.Title>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1 flex flex-col">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Name</label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Phone</label>
                  <input
                    type="tel"
                    {...register("phone", { required: "Phone is required" })}
                    className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">Notes</label>
                  <textarea
                    {...register("notes")}
                    className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
                    onClick={() => { reset(); onClose(); }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Save
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
} 