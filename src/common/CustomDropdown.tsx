import { IDropdown } from '../models/ICommon';
import { useEffect, useRef, useState } from 'react';

function CustomDropDown({
  label,
  options,
  enableIcon = true,
  className,
}: {
  label: React.ReactNode;
  options: Array<IDropdown>;
  enableIcon?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as HTMLInputElement)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={
          className +
          ' text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700'
        }
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        {enableIcon && (
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        )}
      </button>

      <div
        id="dropdown"
        className={`z-10 ${
          isOpen ? '' : 'hidden'
        } absolute top-12 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow-slate-500 shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          {options?.map((option) => (
            <li key={option.label}>
              <div
                onClick={() => {
                  setIsOpen(false);
                  if (option.onClick !== undefined) {
                    option.onClick();
                  }
                }}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {option.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CustomDropDown;
