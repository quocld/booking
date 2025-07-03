import React, { useState, useRef, useEffect } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabel = options.find(opt => opt.value === value)?.label || "";

  return (
    <div className="w-full" ref={ref}>
      {label && <label className="block text-sm font-medium mb-1 text-gray-300">{label}</label>}
      <input
        type="text"
        value={selectedLabel}
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        readOnly
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded shadow-lg max-h-60 overflow-auto">
          <div className="p-2">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              autoFocus
            />
          </div>
          {filtered.length > 0 ? (
            filtered.map(opt => (
              <div
                key={opt.value}
                className="px-3 py-2 cursor-pointer hover:bg-blue-600 hover:text-white"
                onMouseDown={() => {
                  onChange(opt.value);
                  setSearch("");
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select; 