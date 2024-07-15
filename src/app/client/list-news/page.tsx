"use client";
import { authApi } from "@/api-client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import CopyModal from "@/components/Modal/CopyModal";
import { AuthContext } from "@/context/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Link from "next/link";
import { useContext, useState } from "react";
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
const ListDelegate: NextPage<any> = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [title, setTitle] = useState("");
  const { authState, accountExtendDetail, getAccountExtendDetails } = useContext(AuthContext);

  const { isPending, error, data } = useQuery<ItemType[]>({
    queryKey: ["getListDelegate", authState?.access_token],
    queryFn: async () => await authApi.listNews(),
  });
  console.log("datadatadatadatadata", data);
  return (
    <AppLayout>
      <div className='w-full flex flex-col'>
        <div className='p-6'>
          <Header />
          <div className='h-[1px] bg-black bg-opacity-20 my-4 max-lg:hidden' />
        </div>
        <div className='w-full flex flex-col mb-10 items-center gap-y-2'>
          <div className='w-[95%] justify-center flex flex-col  gap-y-2  bg-white  border shadow-md rounded-md '></div>

          <div className='w-[95%] overflow-auto scrollmenu justify-center flex flex-col gap-y-8 bg-white  border shadow-md rounded-md '>
            <div className='border-b px-4 py-5'>
              <span className=' font-workSansSemiBold  text-2xl'>Danh sách bài viết</span>
            </div>
          </div>
          <div className='flex flex-col  gap-y-4'>
            {data?.map((item: any, i) => (
              <div key={i} className='flex  flex-col mx-auto w-[80%]'>
                <div className='flex flex-col'>
                  <span className=' font-workSansSemiBold'>{item.title}</span>
                  <span>{item.short_description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CopyModal title={title} isOpen={isOpenInfo} closeModal={() => setIsOpenInfo(false)} />
    </AppLayout>
  );
};

export default ListDelegate;
