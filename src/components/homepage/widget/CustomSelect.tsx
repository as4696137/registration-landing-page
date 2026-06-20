import { useEffect, useRef, useState } from "react";

export type SelectOption = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: SelectOption[];
  selectedOption: SelectOption | null;
  setSelectedOption: (option: SelectOption) => void;
  placeholder?: string;
  /** Width / flex-alignment classes for the root. Keep it padding-free so the
   *  dropdown stays the same width as the trigger button. */
  className?: string;
  /** Validation state — tints the trigger for form usage. */
  invalid?: boolean;
  id?: string;
  "aria-describedby"?: string;
};

const CustomSelect = ({
  options,
  selectedOption,
  setSelectedOption,
  placeholder = "請選擇...",
  className = "",
  invalid = false,
  id,
  "aria-describedby": ariaDescribedby,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative font-medium leading-[160%] ${isOpen ? "z-[9999]" : "z-0"} ${className}`}
      ref={selectRef}
    >
      <div
        id={id}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={invalid || undefined}
        aria-describedby={ariaDescribedby}
        className={`flex cursor-pointer items-center justify-between border border-black px-5 py-3.5 hover:border-[#888] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
          invalid ? "bg-[#fff0f5]" : "bg-white"
        }`}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen((open) => !open);
          } else if (e.key === "Escape") {
            setIsOpen(false);
          }
        }}
      >
        <span className="text-base text-[#333]">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span aria-hidden="true">{isOpen ? "▼" : "▲"}</span>
      </div>
      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-[9999] m-0 max-h-[240px] list-none overflow-y-auto border border-black bg-white p-0 shadow-[0_8px_0_rgba(0,0,0,0.25)]"
        >
          {options.map((option) => {
            const isSelected = selectedOption?.value === option.value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleOptionClick(option)}
                className={`cursor-pointer border-b border-black px-5 py-2.5 text-base font-medium last:border-b-0 hover:bg-[#e6e6e6] ${
                  isSelected ? "bg-[#FFFF41]" : "bg-white"
                }`}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
