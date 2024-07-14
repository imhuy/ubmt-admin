"use client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { AuthContext } from "@/context/useAuthContext";
import convertNumbThousand from "@/utils/convertNumbThousand";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Profile: NextPage<any> = () => {
  const { handleLogOut, authState, accountExtendDetail } = useContext(AuthContext);

  const router = useRouter();
  return (
    <AppLayout>
      <div className='w-full h-screen flex flex-col'>
        <div className='p-6'>
          <Header />
          <div className='h-[1px] bg-black   bg-opacity-20 my-4 max-lg:hidden' />
        </div>
        <div className='w-full flex flex-col items-center  gap-y-6'>
          <div className='w-[95%] justify-center flex flex-col gap-y-8 bg-white  border shadow-md rounded-md '>
            <div className='border-b px-4 py-5 flex gap-x-4'>
              <span className=' font-workSansBold text-white  bg-blue-500 rounded-md p-2 '>Thông Tin Cá Nhân</span>

              <span className=' font-workSansSemiBold  rounded-md p-2 '>
                <a href='/client/change-password'>Đổi mật khẩu</a>
              </span>
            </div>

            <div className='flex justify-between px-4 mr-4 '>
              <p className=' font-workSansMedium text-lg'>Số điện thoại</p>
              <input
                className='w-[50%] border h-12 rounded-md px-2'
                placeholder={accountExtendDetail?.username}
              ></input>
            </div>

            <div className='flex justify-between px-4 mr-4 border-b pb-4'>
              <p className=' font-workSansMedium text-lg'>Email</p>
              <input className='w-[50%] border h-12 rounded-md px-2' placeholder={accountExtendDetail?.email}></input>
            </div>

            <div className=' flex items-cente px-4 mb-4 gap-x-4'>
              <div className=' flex '>
                <button
                  className='w-[100%]'
                  // onClick={() => setIsOpenChangePassword(true)}
                >
                  <p className=' bg-blue-500 font-extrabold text-lg border  px-8 py-2 border-slate-400 rounded-md flex items-center justify-center text-white	'>
                    Lưu thay đổi
                  </p>
                </button>
              </div>

              <div className='flex '>
                <button
                  className='w-[100%]'
                  onClick={() => {
                    handleLogOut();
                    router.push("login");
                  }}
                >
                  <p className=' bg-primary-500 font-extrabold text-lg border  px-8 py-2 border-slate-400 rounded-md flex items-center justify-center text-white	'>
                    Đăng xuất
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
