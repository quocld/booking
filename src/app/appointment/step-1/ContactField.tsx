'use client';

import React, { useCallback } from 'react';
import { Controller, ControllerRenderProps, UseFormSetValue } from 'react-hook-form';
import ContactSelect from '../ContactSelect';
import type { Contact } from '../ContactPickerModal';

export interface ClientInfoFormValues {
  contactName: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  plate: string;
  type: string;
  year: string;
}

interface ContactFieldProps {
  control: import('react-hook-form').Control<ClientInfoFormValues>;
  errors: Partial<Record<keyof ClientInfoFormValues, { message?: string }>>;
  contacts: Contact[];
  contactsLoading: boolean;
  onAddContact: (data: { name: string; email?: string; phone?: string }) => Promise<Contact>;
  newContactId: string | null;
  setValue: UseFormSetValue<ClientInfoFormValues>;
  setManual: (manual: boolean) => void;
  setNewContactId: (id: string | null) => void;
  validationTrigger: number;
}

const ContactField: React.FC<ContactFieldProps> = ({
  control,
  errors,
  contacts,
  contactsLoading,
  onAddContact,
  newContactId,
  setValue,
  setManual,
  setNewContactId,
}) => {
  // Memoize the contact selection handler
  const handleContactSelect = useCallback((contact: Contact) => {
    setValue('email', contact.email || '');
    setValue('phone', contact.phone || '');
    setManual(false);
    setNewContactId(null);
  }, [setValue, setManual, setNewContactId]);

  // Memoize the contact removal handler
  const handleContactRemove = useCallback(() => {
    setValue('email', '');
    setValue('phone', '');
    setManual(false);
    setNewContactId(null);
  }, [setValue, setManual, setNewContactId]);

  // Memoize the selected contact info string
  const getSelectedContactInfo = useCallback((selected: Contact) => {
    return [selected.name, selected.email, selected.phone]
      .filter(Boolean)
      .join(' | ');
  }, []);

  return (
    <Controller
      control={control}
      name="contactName"
      render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, 'contactName'> }) => {
        const selected = contacts.find((c) => c.id === field.value);

        if (selected) {
          return (
            <>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2">
                <span className="text-gray-300 text-sm font-medium">
                  Client {getSelectedContactInfo(selected)}
                </span>
                <button
                  aria-label="Remove contact"
                  className="ml-2 text-red-500 text-lg font-bold focus:outline-none"
                  type="button"
                  onClick={() => {
                    field.onChange('');
                    handleContactRemove();
                  }}
                >
                  ×
                </button>
              </div>
              {errors.contactName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contactName.message}
                </p>
              )}
            </>
          );
        }

        return (
          <>
            <ContactSelect
              contacts={contacts}
              loading={contactsLoading}
              newContactId={newContactId}
              value={selected || null}
              onAddContact={onAddContact}
              onSelect={(contact) => {
                field.onChange(contact.id);
                handleContactSelect(contact);
              }}
            />
            {errors.contactName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contactName.message}
              </p>
            )}
          </>
        );
      }}
      rules={{ required: 'Please select a contact' }}
    />
  );
};

export default React.memo(ContactField, (prevProps, nextProps) => {
  // Always re-render if errors change
  if (JSON.stringify(prevProps.errors) !== JSON.stringify(nextProps.errors)) {
    return false;
  }
  // Re-render if validationTrigger changes
  if (prevProps.validationTrigger !== nextProps.validationTrigger) {
    return false;
  }
  // Re-render if contacts change
  if (prevProps.contacts !== nextProps.contacts) {
    return false;
  }
  // Re-render if loading state changes
  if (prevProps.contactsLoading !== nextProps.contactsLoading) {
    return false;
  }
  return true;
});
