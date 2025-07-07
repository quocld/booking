'use client';

import React, { useMemo, useCallback } from 'react';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import SearchableDropdown from '../../../components/SearchableDropdown';
import { VEHICLE_MAKES, VEHICLE_MODELS, VEHICLE_TYPES, VEHICLE_YEARS, filterOptions } from '../constants';
import { ClientInfoFormValues } from './ContactField';

interface VehicleFieldProps {
  name: keyof Pick<ClientInfoFormValues, 'year' | 'make' | 'model' | 'type'>;
  control: import('react-hook-form').Control<ClientInfoFormValues>;
  errors: Partial<Record<keyof ClientInfoFormValues, { message?: string }>>;
  manualVehicle: boolean;
  search: string;
  onSearchChange: (search: string) => void;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  label: string;
  validationTrigger: number;
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
      control={control}
      name={name}
      render={({ field }: { field: ControllerRenderProps<ClientInfoFormValues, typeof name> }) => {
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
            error={errors[name]?.message || ''}
            isOpen={isOpen}
            label={label}
            options={filteredOptions}
            placeholder="Select"
            search={search}
            value={field.value || ''}
            onSearchChange={handleSearchChange}
            onSelect={field.onChange}
            onToggle={handleToggle}
          />
        );
      }}
      rules={{
        required: `Please select a ${name}`,
        validate: (value) => {
          if (!value || value.trim() === '') {
            return `Please select a ${name}`;
          }
          return true;
        },
      }}
    />
  );
};

export default React.memo(VehicleField, (prevProps, nextProps) => {
  // Always re-render if errors change
  if (JSON.stringify(prevProps.errors) !== JSON.stringify(nextProps.errors)) {
    return false;
  }
  // Re-render if validationTrigger changes
  if (prevProps.validationTrigger !== nextProps.validationTrigger) {
    return false;
  }
  // Re-render if manualVehicle changes
  if (prevProps.manualVehicle !== nextProps.manualVehicle) {
    return false;
  }
  // Re-render if search or isOpen changes
  if (prevProps.search !== nextProps.search || prevProps.isOpen !== nextProps.isOpen) {
    return false;
  }
  return true;
});
