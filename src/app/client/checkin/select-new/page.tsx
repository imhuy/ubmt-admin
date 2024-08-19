"use client";

import { authApi } from "@/api-client";
import DelegateDropDown from "@/components/DropDown/DelegateDropDown";
import { AuthContext } from "@/context/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useContext, useState } from "react";
import { toast } from "react-toastify";
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

    const addPreview = async (id: number, type: number) => {
      toast.success("Hiển thị lên màn hình lớn thành công");
      let data = await authApi.addPreViewData(id, type);

      console.log("datadatadatadata", data.code);
      if (data.code === 0) {
      }
    };
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
            <img src='/bgSelect.png' alt='Background Image' className='w-full   h-[100lvh]    ' />

            <div className='absolute w-[100%]  px-4  inset-0 text-center flex flex-col transform items-center  top-[30%] left-[0%]'>
              <DelegateDropDown onItemSelected={handleSelectDelegation} />

              <a
                href='/client/checkin/select-new-2'
                className='absolute bottom-[5%]  flex flex-col justify-center items-center  '
              >
                <img src='/home.png' color='white' className='    w-8 h-8' alt='' />

                <span className='  text-[#2857A5] font-workSansBold'>Quay về trang chủ </span>
              </a>
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
