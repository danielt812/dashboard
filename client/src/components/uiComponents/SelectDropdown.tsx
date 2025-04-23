import { useState } from "react";
// Animation Library
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  name: string;
  value: string;
};

interface SelectProps {
  options: Option[];
  selected: string; // Stores `value`, not `name`
  onChange: (value: string) => void;
  placeholder?: string;
  openUpwards?: boolean;
}

const SelectDropdown = ({ options, selected, onChange, placeholder = "Select", openUpwards = false }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === selected);

  return (
    <div
      className='relative w-full'
    >
      {/* Selected Item */}
      <div
        className='bg-gray-800 text-white pl-2 rounded-lg cursor-pointer flex items-center justify-between z-0'
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Placeholder or Selected Text - Flex Start */}
        <div className='text-xs md:text-lg flex-grow text-left'>
          {selectedOption ? selectedOption.name : placeholder}
        </div>

        {/* Open/Close Icon - Flex End */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className='flex-shrink-0'
        >
          {isOpen ? "✕" : "▼"}
        </motion.span>
      </div>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            onMouseLeave={() => setIsOpen(false)}
            initial={{ opacity: 0, y: openUpwards ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUpwards ? 10 : -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute w-full bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden z-50 ${openUpwards ? "bottom-full mb-2" : "top-full mt-2"
              }`}
          >
            {options.map((option, index) => (
              <li
                key={option.value + "-" + index}
                className='px-4 py-2 cursor-pointer hover:bg-gray-700'
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectDropdown;
