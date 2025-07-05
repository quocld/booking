'use client';

import React from 'react';
import { Controller, ControllerRenderProps } from 'react-hook-form';

interface ManualContactFieldsProps {
  control: any;
  errors: any;
  validationTrigger: number;
}

const ManualContactFields: React.FC<ManualContactFieldsProps> = ({
  control,
  errors,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">
          Email <span className="text-red-500">*</span>
        </label>
        <Controller
          control={control}
          name="email"
          render={({
            field,
          }: {
            field: ControllerRenderProps<any, 'email'>;
          }) => (
            <>
              <input
                type="email"
                {...field}
                className="w-full h-12 bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </>
          )}
          rules={{ required: 'Please enter an email' }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-300">
          Phone <span className="text-red-500">*</span>
        </label>
        <Controller
          control={control}
          name="phone"
          render={({
            field,
          }: {
            field: ControllerRenderProps<any, 'phone'>;
          }) => (
            <>
              <input
                type="tel"
                {...field}
                className="w-full h-12 bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </>
          )}
          rules={{ required: 'Please enter a phone number' }}
        />
      </div>
    </div>
  );
};

export default React.memo(ManualContactFields, (prevProps, nextProps) => {
  // Always re-render if errors change
  if (JSON.stringify(prevProps.errors) !== JSON.stringify(nextProps.errors)) {
    return false;
  }
  // Re-render if validationTrigger changes
  if (prevProps.validationTrigger !== nextProps.validationTrigger) {
    return false;
  }
  return true;
});
