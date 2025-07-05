// Vehicle data constants
export const VEHICLE_MAKES = ['Toyota', 'Honda', 'Ford', 'Tesla'] as const;
export const VEHICLE_MODELS = ['Corolla', 'Civic', 'F-150', 'Model 3'] as const;
export const VEHICLE_TYPES = ['Sedan', 'SUV', 'Truck', 'Electric'] as const;

// Generate years array (last 31 years)
export const VEHICLE_YEARS = Array.from({ length: 31 }, (_, i) =>
  (new Date().getFullYear() - i).toString(),
) as readonly string[];

// Utility function to filter options
export const filterOptions = (options: readonly string[], search: string): string[] => {
  if (!search.trim()) return [...options];
  return options.filter(option =>
    option.toLowerCase().includes(search.toLowerCase()),
  );
};

// Form validation rules
export const FORM_RULES = {
  required: (fieldName: string) => ({ required: `Please ${fieldName}` }),
  email: {
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address',
    },
  },
  phone: {
    pattern: {
      value: /^[\+]?[1-9][\d]{0,15}$/,
      message: 'Invalid phone number',
    },
  },
} as const;
