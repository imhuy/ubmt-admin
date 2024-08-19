import { authApi } from "@/api-client";
import { AuthContext } from "@/context/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface DropdownProps {
  onItemSelected: (item: string) => void;
}

export interface ItemType {
  id: number;
  full_name: string;
  position: string;
  avatar: string;
  code: string;
}

const DelegateDropDown: React.FC<DropdownProps> = ({ onItemSelected }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [filterText, setFilterText] = useState(""); // State for filtering
  const { authState } = useContext(AuthContext);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to dropdown div

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: any) => {
    // setIsOpen(false);
    // console.log(object);
    // onItemSelected(item);
    setName(item.name);
  };

  const addPreview = async (id: number, type: number) => {
    toast.success("Hiển thị lên màn hình lớn thành công");
    let data = await authApi.addPreViewData(id, type);

    console.log("datadatadatadata", data);
    if (data.code === 0) {
    }
  };

  const { isPending, error, data } = useQuery<ItemType[]>({
    queryKey: ["listDelegateUser1", authState?.access_token],
    queryFn: async () => await authApi.listDelegateUser(),
  });

  // Filtered data based on filterText
  const filteredData = data?.filter((item) => item.full_name?.toLowerCase().includes(filterText?.toLowerCase()));
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
    <div className='relative  w-[60%]    max-md:w-full justify-center     inline-block text-left' ref={dropdownRef}>
      <div>
        <input
          type='text'
          placeholder='Nhập tên để tìm kiếm đại biểu...'
          className='border border-gray-300 rounded-md px-3 py-2 mb-2  w-[100%] '
          value={filterText}
          onChange={handleFilterChange}
          onClick={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <div className='origin-top-right  w-[100%] absolute z-50 max-h-96 overflow-y-auto     mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
            {/* Filter input */}
            {/* <input
              type='text'
              placeholder='Search...'
              className='border border-gray-300 rounded-md px-3 py-2 mb-2 w-full'
              value={filterText}
              onChange={handleFilterChange}
            /> */}
            {/* Render filtered data */}
            {filteredData?.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className='text-gray-700 block px-4 py-2 text-sm w-full'
                role='menuitem'
              >
                <div className=' flex flex-row  justify-center w-full   gap-x-4  items-center'>
                  <img src={item.avatar} alt='Avatar' className='w-16    inline-block' />
                  <div className='flex flex-row  justify-between  items-center w-full'>
                    <div className=' w-[70%] flex flex-col text-start'>
                      <span className=' font-workSansBold'> {item.full_name} </span>
                      <span className=' '> {item.position} </span>
                      <span className=' '>
                        <span className=' font-workSansSemiBold'> Mã đại biểu: </span> {item.code}{" "}
                      </span>
                    </div>
                    <button onClick={() => addPreview(item.id, 0)}>
                      <span className='  bg-[#5f27cd]    py-8 text-white px-2'>Hiển thị</span>
                    </button>
                  </div>
                </div>
              </button>
            ))}
            {/* Show message if no items match filter */}
            {filteredData && filteredData.length === 0 && (
              <span className='block px-4 py-2 text-sm text-gray-400'>Không tìm thấy kết quả</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DelegateDropDown;
