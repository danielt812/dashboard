import { useState } from "react";
// Animation Library
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  name: string;
  value: string;
};

interface MultiSelectDropdownProps {
  options: Option[];
  selected: string[];
  onChange: (selectedOptions: string[]) => void;
  maxSelections?: number;
  openUpwards?: boolean;
  placeholder?: string;
}

const MultiSelectDropdown = ({
  options,
  selected,
  onChange,
  maxSelections = 5,
  openUpwards = false,
  placeholder = "Select",
}: MultiSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionValue: string) => {
    if (selected.includes(optionValue)) {
      onChange(selected.filter((value) => value !== optionValue));
    } else if (selected.length < maxSelections) {
      onChange([...selected, optionValue]);
    }
  };

  return (
    <div className='relative'>
      {/* Selected Items + Toggle Icon */}
      <button
        className='bg-gray-800 text-white pl-2 pr-3 py-2 rounded-lg cursor-pointer flex justify-between items-center w-full'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className='text-xs'>
          {selected.length > 0
            ? options
              .filter((option) => selected.includes(option.value))
              .map((option) => option.name)
              .join(", ")
            : placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? "✕" : "▼"}
        </motion.span>
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            onMouseLeave={() => setIsOpen(false)}
            initial={{ opacity: 0, y: openUpwards ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUpwards ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute w-full bg-gray-700 text-white rounded-lg shadow-lg max-h-64 overflow-y-auto overflow-x-auto transition-all ${openUpwards ? "bottom-full mb-2" : "top-full mt-2"
              }`}
            role='listbox'
          >
            {options.map((option) => (
              <li
                key={option.value}
                className='px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-500 text-xs xl:text-lg'
                onClick={() => toggleOption(option.value)}
                role='option'
              >
                <input
                  type='checkbox'
                  checked={selected.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                  className='cursor-pointer'
                />
                <span>{option.name}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiSelectDropdown;
