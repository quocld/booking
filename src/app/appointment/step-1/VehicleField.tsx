"use client";

import React, { useMemo, useCallback } from "react";
import { Controller, ControllerRenderProps } from "react-hook-form";
import SearchableDropdown from "../../../components/SearchableDropdown";
import { VEHICLE_MAKES, VEHICLE_MODELS, VEHICLE_TYPES, VEHICLE_YEARS, filterOptions } from "../constants";

interface VehicleFieldProps {
  name: "year" | "make" | "model" | "type";
  control: any;
  errors: any;
  manualVehicle: boolean;
  search: string;
  onSearchChange: (search: string) => void;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  label: string;
}

const VehicleField: React.FC<VehicleFieldProps> = ({
  name,
  control,
  errors,
  manualVehicle,
  search,
  onSearchChange,
  isOpen,
  onToggle,
  label,
}) => {
  // Memoize filtered options to prevent recalculation on every render
  const filteredOptions = useMemo(() => {
    const options = {
      year: VEHICLE_YEARS,
      make: VEHICLE_MAKES,
      model: VEHICLE_MODELS,
      type: VEHICLE_TYPES,
    }[name];
    
    return filterOptions(options, search);
  }, [name, search]);

  // Memoize the onSelect handler
  const handleSelect = useCallback((value: string) => {
    // This will be handled by the Controller
  }, []);

  // Memoize the search change handler
  const handleSearchChange = useCallback((newSearch: string) => {
    onSearchChange(newSearch);
  }, [onSearchChange]);

  // Memoize the toggle handler
  const handleToggle = useCallback((open: boolean) => {
    onToggle(open);
  }, [onToggle]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `Please select a ${name}` }}
      render={({ field }: { field: ControllerRenderProps<any, typeof name> }) => {
        if (manualVehicle) {
          return (
            <>
              <input
                type="text"
                {...field}
                className="w-full h-12 bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${name}`}
              />
              {errors[name] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[name].message}
                </p>
              )}
            </>
          );
        }

        return (
          <SearchableDropdown
            value={field.value || ""}
            onSelect={field.onChange}
            options={filteredOptions}
            placeholder="Select"
            isOpen={isOpen}
            onToggle={handleToggle}
            search={search}
            onSearchChange={handleSearchChange}
            label={label}
            error={errors[name]?.message}
          />
        );
      }}
    />
  );
};

export default React.memo(VehicleField); 