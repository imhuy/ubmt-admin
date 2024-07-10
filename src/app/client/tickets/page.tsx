"use client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";

const Profile: NextPage<any> = () => {
  return (
    <AppLayout>
      <div className='w-full  h-screen flex flex-col'>
        <div className='p-6'>
          <Header title='Ticket hỗ trợ' />
          <div className='h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden' />
          <div className='  bg-[#CEF4FC] rounded-md '>
            <p className='flex  flex-row my-4  p-5 max-lg:p-1 text-[15px] text-[#06798F] font-workSansMedium text-center'>
              <InformationCircleIcon className='w-6 h-6  text-[#06798F]' />
              Đang phát triển
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
export default Profile;
