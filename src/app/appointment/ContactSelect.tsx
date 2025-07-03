import React, { useState, useEffect } from "react";
import ContactPickerModal from "./ContactPickerModal";
import AddContactModal from "./AddContactModal";
import type { Contact } from "./ContactPickerModal";

interface ContactSelectProps {
  value?: Contact | null;
  onSelect: (contact: Contact) => void;
  label?: string;
  contacts: Contact[];
  loading?: boolean;
  onAddContact: (data: { name: string; email?: string; phone?: string }) => Promise<Contact | undefined>;
  newContactId?: string | null;
}

const ContactSelect: React.FC<ContactSelectProps> = ({ value, onSelect, contacts, loading, onAddContact, newContactId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(value || null);
  const [pendingSelectId, setPendingSelectId] = useState<string | null>(null);

  // Handler for when a contact is selected in the modal
  const handleModalSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setModalOpen(false);
    onSelect(contact);
  };

  // Handler for adding a new contact
  const handleAddContact = async (data: { name: string; email?: string; phone?: string }) => {
    const newContact = await onAddContact(data);
    setAddModalOpen(false);
    if (newContact && typeof newContact === 'object' && 'id' in newContact) {
      setPendingSelectId(newContact.id as string);
    }
  };

  // Khi contacts thay đổi, nếu có pendingSelectId thì set selectedContact
  useEffect(() => {
    if (pendingSelectId && contacts.length > 0) {
      const found = contacts.find(c => c.id === pendingSelectId);
      if (found) {
        setSelectedContact(found);
        onSelect(found);
        setPendingSelectId(null);
      }
    }
  }, [contacts, pendingSelectId, onSelect]);

  // Khi newContactId thay đổi, nếu có newContactId thì set selectedContact
  useEffect(() => {
    if (newContactId && contacts.length > 0) {
      const found = contacts.find(c => c.id === newContactId);
      if (found) {
        setSelectedContact(found);
        onSelect(found);
      }
    }
  }, [contacts, newContactId, onSelect]);

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