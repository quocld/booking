"use client";

import { useForm, Controller, ControllerRenderProps } from "react-hook-form";
import { useBookingStore } from "../bookingStore";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ClientInfoFormValues {
  contactName: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  plate: string;
  type: string;
}

const contacts = [
  { label: "John Doe", value: "John Doe", email: "john@example.com", phone: "123-456-7890" },
  { label: "Jane Smith", value: "Jane Smith", email: "jane@example.com", phone: "987-654-3210" },
  { label: "Add manually", value: "manual" },
];

const makes = ["Toyota", "Honda", "Ford", "Tesla"];
const models = ["Corolla", "Civic", "F-150", "Model 3"];
const types = ["Sedan", "SUV", "Truck", "Electric"];

export default function ClientInfoForm() {
  const setClientInfo = useBookingStore((s) => s.setClientInfo);
  const setVehicleInfo = useBookingStore((s) => s.setVehicleInfo);
  const [manual, setManual] = useState(false);
  const router = useRouter();

  const { control, handleSubmit, setValue, watch } = useForm<ClientInfoFormValues>({
    defaultValues: {
      contactName: "",
      email: "",
      phone: "",
      make: "",
      model: "",
      plate: "",
      type: "",
    },
  });

  const selectedContact = watch("contactName");

  React.useEffect(() => {
    if (selectedContact && selectedContact !== "manual") {
      const found = contacts.find((c) => c.value === selectedContact);
      if (found) {
        setValue("email", found.email || "");
        setValue("phone", found.phone || "");
        setManual(false);
      }
    } else if (selectedContact === "manual") {
      setValue("email", "");
      setValue("phone", "");
      setManual(true);
    }
  }, [selectedContact, setValue]);

  const onSubmit = (data: ClientInfoFormValues) => {
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
    router.push("/appointment/step-2");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Contact Selection */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">Contact</label>
        <Controller
          name="contactName"
          control={control}
          render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, "contactName"> }) => (
            <select
              {...field}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select contact</option>
              {contacts.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          )}
        />
      </div>
      {/* Email & Phone (manual only) */}
      {manual && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, "email"> }) => (
                <input
                  type="email"
                  {...field}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Phone</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, "phone"> }) => (
                <input
                  type="tel"
                  {...field}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone"
                />
              )}
            />
          </div>
        </div>
      )}
      {/* Vehicle Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Make</label>
          <Controller
            name="make"
            control={control}
            render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, "make"> }) => (
              <select
                {...field}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select make</option>
                {makes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Model</label>
          <Controller
            name="model"
            control={control}
            render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, "model"> }) => (
              <select
                {...field}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select model</option>
                {models.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Plate</label>
          <Controller
            name="plate"
            control={control}
            render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, "plate"> }) => (
              <input
                type="text"
                {...field}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Plate"
              />
            )}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-300">Type</label>
          <Controller
            name="type"
            control={control}
            render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, "type"> }) => (
              <select
                {...field}
                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select type</option>
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            )}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-colors border border-blue-700"
      >
        Continue
      </button>
    </form>
  );
} 