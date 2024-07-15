import { authApi } from "@/api-client";
import { AuthContext } from "@/context/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";

interface DropdownProps {
  onItemSelected: (item: string) => void;
}

export interface ItemType {
  id: number;
  name: string;
}

const Dropdown: React.FC<DropdownProps> = ({ onItemSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [filterText, setFilterText] = useState(""); // State for filtering
  const { authState } = useContext(AuthContext);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to dropdown div

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: any) => {
    setIsOpen(false);
    onItemSelected(item);
    setName(item.name);
  };

  const { isPending, error, data } = useQuery<ItemType[]>({
    queryKey: ["getListDelegate", authState?.access_token],
    queryFn: async () => await authApi.listDelegate(),
  });

  // Filtered data based on filterText
  const filteredData = data?.filter((item) => item.name?.toLowerCase().includes(filterText?.toLowerCase()));
  // Filtered data based on filterText
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  // Effect to handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Clean up event listener when dropdown is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='relative inline-block text-left' ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          type='button'
          className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          {name || "Chọn đoàn đại biểu"}
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className='origin-top-right absolute z-50 max-h-60 overflow-y-auto right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
            {/* Filter input */}
            <input
              type='text'
              placeholder='Search...'
              className='border border-gray-300 rounded-md px-3 py-2 mb-2 w-full'
              value={filterText}
              onChange={handleFilterChange}
            />
            {/* Render filtered data */}
            {filteredData?.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className='text-gray-700 block px-4 py-2 text-sm'
                role='menuitem'
              >
                {item.name}
              </button>
            ))}
            {/* Show message if no items match filter */}
            {filteredData && filteredData.length === 0 && (
              <span className='block px-4 py-2 text-sm text-gray-400'>No matching items</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
