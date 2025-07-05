"use client";

import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { useBookingStore } from "../bookingStore";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import ContactField from "./ContactField";
import VehicleField from "./VehicleField";
import ManualContactFields from "./ManualContactFields";
import type { Contact } from "../ContactPickerModal";

interface ClientInfoFormValues {
  contactName: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  plate: string;
  type: string;
  year: string;
}

export default function ClientInfoForm() {
  const router = useRouter();
  
  // Zustand selectors
  const setClientInfo = useBookingStore((s) => s.setClientInfo);
  const setVehicleInfo = useBookingStore((s) => s.setVehicleInfo);
  const goToNextStep = useBookingStore((s) => s.goToNextStep);
  const clientInfo = useBookingStore((s) => s.clientInfo);
  const vehicleInfo = useBookingStore((s) => s.vehicleInfo);

  // Local state
  const [manual, setManual] = useState(false);
  const [manualVehicle, setManualVehicle] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [newContactId, setNewContactId] = useState<string | null>(null);

  // Dropdown states
  const [yearSearch, setYearSearch] = useState("");
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [makeSearch, setMakeSearch] = useState("");
  const [makeDropdownOpen, setMakeDropdownOpen] = useState(false);
  const [modelSearch, setModelSearch] = useState("");
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
  const [typeSearch, setTypeSearch] = useState("");
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  // Form setup with memoized default values
  const defaultValues = useMemo(() => ({
    contactName: clientInfo.contactName,
    email: clientInfo.email,
    phone: clientInfo.phone,
    make: vehicleInfo.make,
    model: vehicleInfo.model,
    plate: vehicleInfo.plate,
    type: vehicleInfo.type,
    year: vehicleInfo.year || "",
  }), [clientInfo, vehicleInfo]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ClientInfoFormValues>({
    defaultValues,
  });

  const selectedContact = watch("contactName");

  // Memoize fetchContacts to prevent recreation on every render
  const fetchContacts = useCallback(async () => {
    setContactsLoading(true);
    setContactsError(null);
    try {
      const res = await fetch("/api/contacts");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      setContacts(await res.json());
    } catch (err) {
      setContactsError(
        err instanceof Error ? err.message : "Failed to fetch contacts"
      );
    } finally {
      setContactsLoading(false);
    }
  }, []);

  // Memoize handleAddContact
  const handleAddContact = useCallback(async (data: {
    name: string;
    email?: string;
    phone?: string;
  }) => {
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
      }),
    });
    const newContact = await res.json();
    setNewContactId(newContact.id);
    await fetchContacts();
    return newContact;
  }, [fetchContacts]);

  // Memoize onSubmit
  const onSubmit = useCallback(async (data: ClientInfoFormValues) => {
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      setClientInfo({
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
      });
      setVehicleInfo({
        make: data.make,
        model: data.model,
        plate: data.plate,
        type: data.type,
        year: data.year,
      });
      goToNextStep();
      router.push("/appointment/step-2");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError("Failed to submit");
      }
    } finally {
      setSubmitLoading(false);
    }
  }, [setClientInfo, setVehicleInfo, goToNextStep, router]);

  // Memoize manual vehicle toggle handlers
  const handleManualVehicleToggle = useCallback(() => {
    setManualVehicle(prev => !prev);
  }, []);

  // Effects
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    if (selectedContact) {
      const found = contacts.find((c) => c.id === selectedContact);
      if (found) {
        setValue("email", found.email || "");
        setValue("phone", found.phone || "");
        setManual(false);
      }
    }
  }, [selectedContact, setValue, contacts]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact Selection */}
      <div>
        <label className="block mb-1 font-bold text-md text-gray-100">
          Contact <span className="text-red-500">*</span>
        </label>
        {contactsLoading ? (
          <div className="text-gray-400 text-sm">Loading contacts...</div>
        ) : contactsError ? (
          <div className="text-red-500 text-sm">{contactsError}</div>
        ) : (
          <ContactField
            control={control}
            errors={errors}
            contacts={contacts}
            contactsLoading={contactsLoading}
            contactsError={contactsError}
            onAddContact={handleAddContact}
            newContactId={newContactId}
            setValue={setValue}
            setManual={setManual}
            setNewContactId={setNewContactId}
          />
        )}
      </div>

      {/* Manual Contact Fields */}
      {manual && (
        <ManualContactFields control={control} errors={errors} />
      )}

      {/* Vehicle Info */}
      <label className="block mb-1 font-bold text-md text-gray-100">
        Vehicle Detail <span className="text-red-500">*</span>
      </label>
      <div className="bg-[#18181B] rounded-lg p-4 border-1 border-gray-600">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <VehicleField
            name="year"
            control={control}
            errors={errors}
            manualVehicle={manualVehicle}
            search={yearSearch}
            onSearchChange={setYearSearch}
            isOpen={yearDropdownOpen}
            onToggle={setYearDropdownOpen}
            label="Year"
          />
          <VehicleField
            name="make"
            control={control}
            errors={errors}
            manualVehicle={manualVehicle}
            search={makeSearch}
            onSearchChange={setMakeSearch}
            isOpen={makeDropdownOpen}
            onToggle={setMakeDropdownOpen}
            label="Make"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 w-full mt-4">
          <VehicleField
            name="model"
            control={control}
            errors={errors}
            manualVehicle={manualVehicle}
            search={modelSearch}
            onSearchChange={setModelSearch}
            isOpen={modelDropdownOpen}
            onToggle={setModelDropdownOpen}
            label="Model"
          />
          <VehicleField
            name="type"
            control={control}
            errors={errors}
            manualVehicle={manualVehicle}
            search={typeSearch}
            onSearchChange={setTypeSearch}
            isOpen={typeDropdownOpen}
            onToggle={setTypeDropdownOpen}
            label="Vehicle Type"
          />
        </div>
      </div>

      {/* Manual vehicle entry links */}
      {!manualVehicle && (
        <div className="mt-2">
          <button
            type="button"
            className="text-blue-400 text-sm hover:text-blue-600"
            onClick={handleManualVehicleToggle}
          >
            Can&apos;t find a vehicle? Enter it manually.
          </button>
        </div>
      )}
      {manualVehicle && (
        <div className="mt-4">
          <button
            type="button"
            className="text-blue-400 text-sm hover:text-blue-600"
            onClick={handleManualVehicleToggle}
          >
            I prefer to pick from the available Vehicle options.
          </button>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 h-12 w-[62px] text-white font-bold rounded-lg text-sm"
          style={{ minWidth: "62px" }}
          disabled={submitLoading}
        >
          {submitLoading ? "..." : "Next"}
        </button>
      </div>
      {submitError && (
        <div className="text-red-500 text-sm mt-2">{submitError}</div>
      )}
    </form>
  );
}
