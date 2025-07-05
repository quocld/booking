import React, { useMemo, useCallback } from 'react';

interface SearchableDropdownProps {
  value: string;
  onSelect: (value: string) => void;
  options: string[];
  placeholder: string;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  search: string;
  onSearchChange: (search: string) => void;
  label: string;
  error?: string;
  required?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  value,
  onSelect,
  options,
  placeholder,
  isOpen,
  onToggle,
  search,
  onSearchChange,
  label,
  error,
  required = true,
}) => {
  // Memoize filtered options to prevent recalculation on every render
  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  // Memoize event handlers
  const handleFocus = useCallback(() => {
    onToggle(true);
  }, [onToggle]);

  const handleClick = useCallback(() => {
    onToggle(true);
  }, [onToggle]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  const handleOptionSelect = useCallback((option: string) => {
    onSelect(option);
    onSearchChange('');
    onToggle(false);
  }, [onSelect, onSearchChange, onToggle]);

  return (
    <div>
      <label className="block text-sm font-bold mb-1 text-gray-100">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          readOnly
          className="w-full h-12 bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer pr-10"
          placeholder={placeholder}
          type="text"
          value={value || ''}
          onClick={handleClick}
          onFocus={handleFocus}
        />
        <span className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="text-gray-400" fill="none" height="16" stroke="currentColor" viewBox="0 0 24 24" width="16">
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </span>
        {isOpen && (
          <div className="absolute z-20 mt-2 w-full bg-[#18181B] border-1 border-gray-700 rounded-xl max-h-72 overflow-auto animate-fade-in">
            <div className="p-3 pb-0">
              <div className="relative flex items-center">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" x2="16.65" y1="21" y2="16.65"/>
                </svg>
                <input
                  autoFocus
                  className="w-full bg-gray-700 text-sm border-2 border-gray-700 rounded-lg pl-12 pr-3 py-3 text-gray-100 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Search"
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="pt-2">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option}
                    className="px-5 py-3 text-sm cursor-pointer hover:bg-blue-600 hover:text-white text-gray-100 text-base font-medium transition-colors duration-100"
                    onMouseDown={() => handleOptionSelect(option)}
                  >
                    {option}
                  </div>
                ))
              ) : (
                <div className="px-5 py-3 text-gray-400 text-base">No options found</div>
              )}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default React.memo(SearchableDropdown, (prevProps, nextProps) => {
  // Always re-render if error changes
  if (prevProps.error !== nextProps.error) {
    return false;
  }
  // Re-render if value changes
  if (prevProps.value !== nextProps.value) {
    return false;
  }
  // Re-render if search or isOpen changes
  if (prevProps.search !== nextProps.search || prevProps.isOpen !== nextProps.isOpen) {
    return false;
  }
  return true;
});
