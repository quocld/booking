import React, { useState } from "react";
import ContactPickerModal from "./ContactPickerModal";
import AddContactModal from "./AddContactModal";
import type { Contact } from "./ContactPickerModal";

interface ContactSelectProps {
  value?: Contact | null;
  onSelect: (contact: Contact) => void;
  label?: string;
  contacts: Contact[];
  loading?: boolean;
  onAddContact: (data: { name: string; email?: string; phone?: string }) => void;
}

const ContactSelect: React.FC<ContactSelectProps> = ({ value, onSelect, contacts, loading, onAddContact }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(value || null);

  // Handler for when a contact is selected in the modal
  const handleModalSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setModalOpen(false);
    onSelect(contact);
  };

  // Handler for adding a new contact
  const handleAddContact = async (data: { name: string; email?: string; phone?: string }) => {
    await onAddContact(data);
    setAddModalOpen(false);
    // Sau khi thêm, chọn contact mới nhất (giả sử là cuối danh sách)
    if (contacts.length > 0) {
      const newContact = contacts[contacts.length - 1];
      setSelectedContact(newContact);
      onSelect(newContact);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex-1 flex items-center justify-between bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors hover:bg-gray-700"
          aria-label="Select contact"
          onClick={() => setModalOpen(true)}
        >
          <span>{selectedContact ? selectedContact.name : "Select contact"}</span>
          <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Add Contact"
          title="Add Contact"
          onClick={() => setAddModalOpen(true)}
          className="flex items-center justify-center rounded-full bg-gray-700 hover:bg-blue-600 focus:bg-blue-700 border border-gray-600 text-white w-10 h-10 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      {/* Modal: pass a custom onSelect handler to get the selected contact */}
      {modalOpen && (
        <ContactPickerModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSelect={handleModalSelect}
          contacts={contacts}
          loading={loading}
        />
      )}
      {/* Add Contact Modal */}
      {addModalOpen && (
        <AddContactModal
          open={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onAddContact={handleAddContact}
        />
      )}
    </div>
  );
};

export default ContactSelect; 