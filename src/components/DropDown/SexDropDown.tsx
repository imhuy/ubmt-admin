// components/Dropdown.tsx
import { useState } from "react";

interface DropdownProps {
  onItemSelected: (item: string) => void;
}

export interface ItemType {
  id: number;
  name: string;

  created_at: string;
  position: string;
  delegation: string;
  amount: number;
  friend: string;
  code: string;
}

const SexDropDown: React.FC<DropdownProps> = ({ onItemSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: any) => {
    setIsOpen(false);
    onItemSelected(item);
    setName(item.name);
    console.log("toStringtoStringtoStringtoString", item);
  };

  const data = [
    {
      id: "Ông",
      name: "Nam",
    },
    {
      id: "Bà",
      name: "Nữ",
    },
  ];

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          onClick={toggleDropdown}
          type='button'
          className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          {name || "Chọn giới tính"}
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
        <div className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
            {data?.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className='text-gray-700 block px-4 py-2 text-sm'
                role='menuitem'
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SexDropDown;
