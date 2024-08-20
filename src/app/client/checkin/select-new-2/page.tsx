"use client";

import { authApi } from "@/api-client";
import DelegateDropDown from "@/components/DropDown/DelegateDropDown";
import PieChart from "@/components/PieChart";
import { AuthContext } from "@/context/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useContext, useState } from "react";

export interface ItemType {
  id: number;
  key: string;
  full_name: string;
  created_at: string;
  position: string;
  delegation: string;
  amount: number;
  friend: string;
  code: string;
}

export interface DelegationType {
  id: number;
  key: string;
  name: string;
  image: string;
}
export default function Home() {
  function MainView() {
    const { authState } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchTermDelegate, setSearchTermDelegate] = useState<string>("");
    const [delegation, setDelegation] = useState<any>("");
    const [tab, setTab] = useState<number>(0);

    const { data, isLoading, refetch, isPending } = useQuery<ItemType[]>({
      queryKey: ["getListUserSelect", authState?.access_token],
      queryFn: async () => await authApi.listDelegateUser(),
    });

    const {
      data: dataDelegate,
      isLoading: isLoadingDelegate,
      refetch: refetchDelegate,
      isPending: isPendingDelegate,
    } = useQuery<DelegationType[]>({
      queryKey: ["getListDelegateSelect", authState?.access_token],
      queryFn: async () => await authApi.listDelegate(),
    });

    const onSearch = (e: any) => {
      setSearchTerm(e.target.value);
    };
    const onSearchDelegate = (e: any) => {
      setSearchTermDelegate(e.target.value);
    };
    const handleSelectDelegation = (item: string) => {
      setDelegation(item);
    };
    const filteredData = data?.filter((item) => item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));

    const filteredDelegateData = dataDelegate?.filter((item) =>
      item.name?.toLowerCase().includes(searchTermDelegate.toLowerCase())
    );
    return (
      <>
        <div className=' w-full  h-[100lvh]   bg-[#FFE18A]'>
          <div className='relative w-full    '>
            <img src='/bgSelect.png' alt='Background Image' className='w-full h-[100lvh] hidden md:block' />

            <img src='/bgMobile.png' alt='Background Image' className='w-full  object-scale-down   md:hidden' />

            <div className='absolute w-[60%] inset-0 text-center  flex-col transform  max-md:top-[20%] top-[30%] left-[20%]'>
              <div className=' w-full   justify-between flex flex-col  gap-y-4 gap-x-4'>
                <div className=' flex flex-col  justify-center items-center gap-y-4 bg-white rounded-md px-2 py-6'>
                  <img src='/user.png' color='white' className='  text-white fill-white w-6 h-6' alt='' />
                  <div className='flex flex-col px-6 '>
                    <span className=' text-gray-400  text-sm'>Tổng số đại biểu</span>
                    <span className=' font-workSansBlack text-2xl'>363</span>
                  </div>
                </div>

                <div className=' flex flex-col  justify-center items-center gap-y-4 bg-white rounded-md px-2 py-6'>
                  <img src='/user.png' color='white' className='  text-white fill-white w-6 h-6' alt='' />
                  <div className='flex flex-col px-6 '>
                    <span className=' text-gray-400  text-sm'>Đại biểu là nữ</span>
                    <span className=' font-workSansBlack text-2xl'>148</span>
                  </div>
                </div>
                <div className=' flex flex-col  justify-center items-center gap-y-4 bg-white rounded-md px-2 py-6'>
                  <img src='/user.png' color='white' className='  text-white fill-white w-6 h-6' alt='' />
                  <div className='flex flex-col px-6 '>
                    <span className=' text-gray-400  text-sm'>Đại biểu tôn giáo</span>
                    <span className=' font-workSansBlack text-2xl'>33</span>
                  </div>
                </div>
                <div className=' flex flex-col  justify-center items-center gap-y-4 bg-white rounded-md px-2 py-6'>
                  <img src='/user.png' color='white' className='  text-white fill-white w-6 h-6' alt='' />
                  <div className='flex flex-col   '>
                    <span className=' text-gray-400  text-sm'>Đại biểu là người ngoài đảng</span>
                    <span className=' font-workSansBlack text-2xl'>90</span>
                  </div>
                </div>

                <a
                  href='/client/checkin/select-new'
                  className=' flex flex-col  justify-center items-center gap-y-4 bg-[#487eb0] rounded-md px-2 py-6'
                >
                  <div className='flex items-center  px-6 '>
                    <img src='/search.png' color='white' className=' filter invert brightness-0 w-4 h-4' alt='' />
                    <span className=' text-white font-workSansBold'>Tra cứu thông tin đại biểu</span>
                  </div>
                </a>

                <a
                  href='/client/checkin/an'
                  className=' flex flex-col  min-w-24  justify-center items-center gap-y-4 bg-[#487eb0] rounded-md px-2 py-6'
                >
                  <span className=' text-white font-workSansBold'>Dấu ấn 2019-2024</span>
                </a>
              </div>
              ``
              {/* charts */}
              <div className=' w-full mt-4   flex-col max-md:gap-y-4 items-center justify-center  bg-white flex '>
                <div className='w-[80%]  items-center justify-center  flex flex-col  gap-y-4 py-8'>
                  <PieChart type={1} />
                  <span className=' font-workSansBold'>Cấu hình thành phần</span>
                </div>
                <div className='w-[80%]  flex flex-col gap-y-4 py-8'>
                  <PieChart type={2} />
                  <span className=' font-workSansBold'>Trình độ chuyên môn</span>
                </div>
                <div className='w-[80%]   flex flex-col gap-y-4 py-8'>
                  <PieChart type={3} />
                  <span className=' font-workSansBold'>Trình độ lý luận chính trị</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className='   justify-center'>
      <Suspense>
        <MainView />
      </Suspense>
    </div>
  );
}
