"use client";

import { Fragment, useState, useMemo } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useBookingStore } from "./bookingStore";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "555-123-4567",
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob@example.com",
    phone: "555-987-6543",
  },
];

interface ContactPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (contact: Contact) => void;
}

export default function ContactPickerModal({
  open,
  onClose,
  onSelect,
}: ContactPickerModalProps) {
  const setClientInfo = useBookingStore((s) => s.setClientInfo);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const contacts = MOCK_CONTACTS;

  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );
  }, [search]);

  const handleConfirm = () => {
    const contact = contacts.find((c) => c.id === selectedId);
    if (contact) {
      if (onSelect) {
        onSelect(contact);
      } else {
        setClientInfo({
          contactName: contact.name,
          email: contact.email,
          phone: contact.phone,
        });
      }
      onClose();
    }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-50">
          <TransitionChild
            as={Fragment}
            enter="transition-transform ease-in-out duration-300"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transition-transform ease-in-out duration-200"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <DialogPanel className="fixed right-0 top-0 h-full w-full md:max-w-[80vw] bg-gray-900 p-2 md:p-0 shadow-xl border-l border-gray-700 flex flex-col z-50 transition-transform">
              <div className="flex items-center justify-between px-6 pt-6 pb-2 border-b border-gray-800">
                <DialogTitle className="text-lg font-semibold text-gray-100">
                  Contact
                </DialogTitle>
                <button
                  aria-label="Close"
                  className="text-gray-400 hover:text-gray-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={onClose}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 px-6 pt-4 pb-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="8"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="21"
                        y1="21"
                        x2="16.65"
                        y2="16.65"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name, phone number or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="overflow-x-auto max-h-72 px-2 md:px-6 pb-2">
                <table className="min-w-full text-sm text-gray-300">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                      <th className="px-4 py-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className={`cursor-pointer transition-colors ${
                          selectedId === contact.id
                            ? "bg-blue-900/60"
                            : "hover:bg-gray-800"
                        }`}
                        onClick={() => setSelectedId(contact.id)}
                        aria-selected={selectedId === contact.id}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            setSelectedId(contact.id);
                        }}
                      >
                        <td className="px-4 py-2 font-medium">
                          {contact.name}
                        </td>
                        <td className="px-4 py-2">{contact.email}</td>
                        <td className="px-4 py-2">{contact.phone}</td>
                        <td className="px-4 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={selectedId === contact.id}
                            onChange={() => setSelectedId(contact.id)}
                            aria-label={`Select ${contact.name}`}
                            className="form-checkbox h-5 w-5 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                    {filteredContacts.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-4 py-6 text-center text-gray-500"
                        >
                          No contacts found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center px-6 py-4 border-t border-gray-800 gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  onClick={handleConfirm}
                  disabled={!selectedId}
                >
                  Select
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
