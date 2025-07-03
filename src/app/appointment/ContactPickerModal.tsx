"use client";

import { Fragment, useState, useMemo } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useBookingStore } from "./bookingStore";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const MOCK_CONTACTS: Contact[] = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "123-456-7890" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" },
  { id: "3", name: "Alice Johnson", email: "alice@example.com", phone: "555-123-4567" },
  { id: "4", name: "Bob Brown", email: "bob@example.com", phone: "555-987-6543" },
];

interface ContactPickerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactPickerModal({ open, onClose }: ContactPickerModalProps) {
  const setClientInfo = useBookingStore((s) => s.setClientInfo);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredContacts = useMemo(() => {
    return MOCK_CONTACTS.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );
  }, [search]);

  const handleConfirm = () => {
    const contact = MOCK_CONTACTS.find((c) => c.id === selectedId);
    if (contact) {
      setClientInfo({
        contactName: contact.name,
        email: contact.email,
        phone: contact.phone,
      });
      onClose();
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-lg rounded-lg bg-gray-900 p-6 shadow-xl border border-gray-700">
              <Dialog.Title className="text-lg font-semibold text-gray-100 mb-4">Select a Contact</Dialog.Title>
              <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-4 px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="overflow-x-auto max-h-64 mb-4">
                <table className="min-w-full text-sm text-gray-300">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr
                        key={contact.id}
                        className={`cursor-pointer transition-colors ${selectedId === contact.id ? "bg-blue-700/40" : "hover:bg-gray-800"}`}
                        onClick={() => setSelectedId(contact.id)}
                      >
                        <td className="px-4 py-2 font-medium">{contact.name}</td>
                        <td className="px-4 py-2">{contact.email}</td>
                        <td className="px-4 py-2">{contact.phone}</td>
                      </tr>
                    ))}
                    {filteredContacts.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-6 text-center text-gray-500">No contacts found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end gap-2">
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
                  Confirm
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 