"use client";

import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { useBookingStore } from "../bookingStore";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ContactSelect from "../ContactSelect";
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

const makes = ["Toyota", "Honda", "Ford", "Tesla"];
const models = ["Corolla", "Civic", "F-150", "Model 3"];
const types = ["Sedan", "SUV", "Truck", "Electric"];

// Add a utility to generate years
const years = Array.from({ length: 31 }, (_, i) =>
  (new Date().getFullYear() - i).toString()
);

export default function ClientInfoForm() {
  const setClientInfo = useBookingStore((s) => s.setClientInfo);
  const setVehicleInfo = useBookingStore((s) => s.setVehicleInfo);
  const goToNextStep = useBookingStore((s) => s.goToNextStep);
  const [manual, setManual] = useState(false);
  const router = useRouter();

  // Add state for year dropdown
  const [yearSearch, setYearSearch] = useState("");
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  // State for manual vehicle entry
  const [manualVehicle, setManualVehicle] = useState(false);

  // Make contacts stateful so we can add new ones
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [contactsError, setContactsError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { control, handleSubmit, setValue, watch, formState: { errors } } =
    useForm<ClientInfoFormValues>({
      defaultValues: {
        contactName: "",
        email: "",
        phone: "",
        make: "",
        model: "",
        plate: "",
        type: "",
        year: "",
      },
    });

  const selectedContact = watch("contactName");

  const fetchContacts = async () => {
    setContactsLoading(true);
    setContactsError(null);
    try {
      const res = await fetch("/api/contacts");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      setContacts(await res.json());
    } catch (err) {
      setContactsError(err instanceof Error ? err.message : "Failed to fetch contacts");
    } finally {
      setContactsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = async (data: { name: string; email?: string; phone?: string }) => {
    await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
      }),
    });
    await fetchContacts();
  };

  React.useEffect(() => {
    if (selectedContact) {
      const found = contacts.find((c) => c.id === selectedContact);
      if (found) {
        setValue("email", found.email || "");
        setValue("phone", found.phone || "");
        setManual(false);
      }
    }
  }, [selectedContact, setValue, contacts]);

  const onSubmit = async (data: ClientInfoFormValues) => {
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
      });
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact Selection with Add Button */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">
          Contact <span className="text-red-500">*</span>
        </label>
        {contactsLoading ? (
          <div className="text-gray-400 text-sm">Loading contacts...</div>
        ) : contactsError ? (
          <div className="text-red-500 text-sm">{contactsError}</div>
        ) : (
          <Controller
            name="contactName"
            control={control}
            rules={{ required: "Please select a contact" }}
            render={({ field }) => {
              const selected = contacts.find((c) => c.id === field.value);
              return (
                <ContactSelect
                  value={selected as Contact | undefined}
                  onSelect={(contact) => {
                    field.onChange(contact.id);
                    setValue("email", contact.email || "");
                    setValue("phone", contact.phone || "");
                    setManual(false);
                  }}
                  contacts={contacts}
                  loading={contactsLoading}
                  onAddContact={handleAddContact}
                />
              );
            }}
          />
        )}
      </div>
      {/* Email & Phone (manual only) */}
      {manual && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email <span className="text-red-500">*</span>
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Please enter an email" }}
              render={({
                field,
              }: {
                field: ControllerRenderProps<ClientInfoFormValues, "email">;
              }) => (
                <>
                  <input
                    type="email"
                    {...field}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Phone <span className="text-red-500">*</span>
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Please enter a phone number" }}
              render={({
                field,
              }: {
                field: ControllerRenderProps<ClientInfoFormValues, "phone">;
              }) => (
                <>
                  <input
                    type="tel"
                    {...field}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Phone"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>
      )}
      {/* Vehicle Info */}
      <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mt-4">
        <h3 className="text-lg font-semibold text-gray-200 mb-4">Vehicle Detail</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Year <span className="text-red-500">*</span>
            </label>
            <Controller
              name="year"
              control={control}
              rules={{ required: "Please select a year" }}
              render={({ field }) => {
                if (manualVehicle) {
                  return (
                    <>
                      <input
                        type="text"
                        {...field}
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter year"
                      />
                      {errors.year && (
                        <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>
                      )}
                    </>
                  );
                }
                const filteredYears = years.filter((y) => y.includes(yearSearch));
                return (
                  <div className="relative">
                    <input
                      type="text"
                      value={field.value || ""}
                      onFocus={() => setYearDropdownOpen(true)}
                      onClick={() => setYearDropdownOpen(true)}
                      placeholder="Select year"
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      readOnly
                    />
                    {yearDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded shadow-lg max-h-60 overflow-auto">
                        <div className="p-2">
                          <input
                            type="text"
                            value={yearSearch}
                            onChange={(e) => setYearSearch(e.target.value)}
                            placeholder="Search year..."
                            className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                            autoFocus
                          />
                        </div>
                        {filteredYears.length > 0 ? (
                          filteredYears.map((y) => (
                            <div
                              key={y}
                              className="px-3 py-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                              onMouseDown={() => {
                                field.onChange(y);
                                setYearSearch("");
                                setYearDropdownOpen(false);
                              }}
                            >
                              {y}
                            </div>
                          ))
                        ) : (
                          <div className="px-3 py-2 text-gray-400">
                            No years found
                          </div>
                        )}
                      </div>
                    )}
                    {errors.year && (
                      <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>
                    )}
                  </div>
                );
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Make <span className="text-red-500">*</span>
            </label>
            <Controller
              name="make"
              control={control}
              rules={{ required: "Please select a make" }}
              render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, "make"> }) => (
                manualVehicle ? (
                  <>
                    <input
                      type="text"
                      {...field}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter make"
                    />
                    {errors.make && (
                      <p className="text-red-500 text-xs mt-1">{errors.make.message}</p>
                    )}
                  </>
                ) : (
                  <>
                    <select
                      {...field}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Select make
                      </option>
                      {makes.map((make) => (
                        <option key={make} value={make}>
                          {make}
                        </option>
                      ))}
                    </select>
                    {errors.make && (
                      <p className="text-red-500 text-xs mt-1">{errors.make.message}</p>
                    )}
                  </>
                )
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Model <span className="text-red-500">*</span>
            </label>
            <Controller
              name="model"
              control={control}
              rules={{ required: "Please select a model" }}
              render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, "model"> }) => (
                manualVehicle ? (
                  <>
                    <input
                      type="text"
                      {...field}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter model"
                    />
                    {errors.model && (
                      <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>
                    )}
                  </>
                ) : (
                  <>
                    <select
                      {...field}
                      className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Select model
                      </option>
                      {models.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                    {errors.model && (
                      <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>
                    )}
                  </>
                )
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Vehicle Type <span className="text-red-500">*</span>
            </label>
            <Controller
              name="type"
              control={control}
              rules={{ required: "Please select a type" }}
              render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, "type"> }) => (
                <>
                  <select
                    {...field}
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {types.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </div>
        {/* Manual vehicle entry link */}
        {!manualVehicle && (
          <div className="mt-2">
            <button
              type="button"
              className="text-blue-400 underline text-sm hover:text-blue-600"
              onClick={() => setManualVehicle(true)}
            >
              Can&apos;t find a vehicle? Enter it manually.
            </button>
          </div>
        )}
        {/* Link to switch back to dropdown mode */}
        {manualVehicle && (
          <div className="mt-4">
            <button
              type="button"
              className="text-blue-400 underline text-sm hover:text-blue-600"
              onClick={() => setManualVehicle(false)}
            >
              I prefer to pick from the available Vehicle options.
            </button>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-colors border border-blue-700"
        disabled={submitLoading}
      >
        {submitLoading ? "Submitting..." : "Continue"}
      </button>
      {submitError && <div className="text-red-500 text-sm mt-2">{submitError}</div>}
    </form>
  );
}
