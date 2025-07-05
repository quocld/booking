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
import AddContactModal from "./AddContactModal";

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ContactPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (contact: Contact) => void;
  contacts: Contact[];
  loading?: boolean;
  onAddContact: (data: { name: string; email?: string; phone?: string }) => Promise<Contact | undefined>;
}

export default function ContactPickerModal({
  open,
  onClose,
  onSelect,
  contacts,
  loading,
  onAddContact,
}: ContactPickerModalProps) {
  const setClientInfo = useBookingStore((s) => s.setClientInfo);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    );
  }, [search, contacts]);

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
          <div className="fixed inset-0 bg-black/95 transition-opacity" />
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
            <DialogPanel className="fixed right-0 top-0 h-full w-full md:max-w-[80vw] bg-[#18181B] p-2 md:p-0 shadow-xl border-l border-gray-700 flex flex-col z-50 transition-transform">
              <div className="flex items-center justify-between px-6 pt-6">
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
              <div className="flex gap-2 px-6 pt-4 pb-2">
                <div className="relative flex-1 mb-4">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-6 h-6"
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
                    className="w-full bg-gray-700 border-2 border-gray-700 rounded-lg pl-12 pr-3 py-3 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Add Contact"
                  title="Add Contact"
                  onClick={() => setAddModalOpen(true)}
                  className="flex items-center justify-center rounded-lg h-12 w-12 border-2 border-blue-400 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="overflow-x-auto px-2 md:px-6 pb-2 flex-1">
                {loading ? (
                  <div className="text-gray-400 text-sm p-4">Loading contacts...</div>
                ) : (
                  <div className=" rounded-t-xl shadow-2xl border border-gray-700/80 bg-[#18181B] overflow-auto">
                    <table className="min-w-full text-sm text-gray-100">
                      <thead>
                        <tr className="bg-gray-700 rounded-t-xl h-[60px]">
                          <th className="px-5 py-3 text-left font-semibold text-gray-200">Name</th>
                          <th className="px-5 py-3 text-left font-semibold text-gray-200">Email</th>
                          <th className="px-5 py-3 text-left font-semibold text-gray-200">Phone</th>
                          <th className="px-5 py-3 text-center font-semibold text-gray-200">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredContacts.map((contact) => (
                          <tr
                            key={contact.id}
                            className={`cursor-pointer transition-colors h-[60px] ${
                              selectedId === contact.id
                                ? "bg-blue-800/60 text-white font-semibold"
                                : "hover:bg-gray-800 text-gray-100"
                            } rounded-lg`}
                            onClick={() => setSelectedId(contact.id)}
                            aria-selected={selectedId === contact.id}
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ")
                                setSelectedId(contact.id);
                            }}
                          >
                            <td className="px-5 py-3 font-medium">{contact.name}</td>
                            <td className="px-5 py-3">{contact.email}</td>
                            <td className="px-5 py-3">{contact.phone}</td>
                            <td className="px-5 py-3 text-center">
                              <label className="inline-flex items-center cursor-pointer relative">
                                <input
                                  type="checkbox"
                                  checked={selectedId === contact.id}
                                  onChange={() => setSelectedId(contact.id)}
                                  aria-label={`Select ${contact.name}`}
                                  className="appearance-none h-4 w-4 bg-gray-700 checked:bg-blue-600 border-gray-600 rounded focus:ring-blue-500"
                                />
                                {selectedId === contact.id && (
                                  <span className="absolute left-0 top-0 flex items-center justify-center h-4 w-4 pointer-events-none">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </span>
                                )}
                              </label>
                            </td>
                          </tr>
                        ))}
                        {filteredContacts.length === 0 && (
                          <tr>
                            <td
                              colSpan={4}
                              className="px-5 py-6 text-center text-gray-500"
                            >
                              No contacts found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center px-6 py-4 gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-[#18181B] border-1 border-color-blue-500 text-blue-500 transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
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
      {addModalOpen && (
        <AddContactModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAddContact={async (data) => {
            await onAddContact(data);
            setAddModalOpen(false);
          }}
        />
      )}
    </Transition>
  );
}
