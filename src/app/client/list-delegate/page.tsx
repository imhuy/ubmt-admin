"use client";
import { authApi } from "@/api-client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { AuthContext } from "@/context/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Image from "next/image";
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
  avatar: string;
}
const ListDelegate: NextPage<any> = () => {
  const { authState, accountExtendDetail, getAccountExtendDetails } = useContext(AuthContext);

  const listDelegate = useQuery<ItemType[]>({
    queryKey: ["getListDelegate", authState?.access_token],
    queryFn: async () => await authApi.listDelegateUser(),
  });

  const showConfirmation = async (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const userConfirmed = window.confirm(message);
      resolve(userConfirmed);
    });
  };

  const editdelegate = async (id: number) => {};

  const deleteItem = async (id: number, name: string) => {
    const userConfirmed = await showConfirmation(`Bạn có chắc chắn muốn xóa đại biểu ${name}? `);
    if (userConfirmed) {
      try {
        let data = await authApi.deleteUserById(id);
        // console.log(object);
        await listDelegate.refetch();
        console.log("Đã xóa thành công");
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
      }
    } else {
      console.log("Người dùng đã hủy");
    }
  };

  return (
    <AppLayout>
      <div className='w-full flex flex-col'>
        <div className='p-6'>
          <Header />
          <div className='h-[1px] bg-black bg-opacity-20 my-4 max-lg:hidden' />
        </div>
        <div className='w-full flex flex-col mb-10 items-center gap-y-6'>
          <div className='w-[95%] justify-center flex flex-col  gap-y-8  bg-white  border shadow-md rounded-md '></div>

          <div className='w-[95%] overflow-auto scrollmenu justify-center flex flex-col gap-y-8 bg-white  border shadow-md rounded-md '>
            <div className='border-b px-4 py-5'>
              <span className=' font-workSansSemiBold  text-2xl'>Danh sách đại biểu</span>
            </div>
            <div className='scrollmenu  '>
              <table>
                <thead>
                  <tr className='flex gap-x-6 px-5 mb-5 mt-2 font-workSansBold  '>
                    <th className='  w-4 max-w-8 text-center'>
                      <span className='  text-sm '>Id </span>{" "}
                    </th>
                    <th className='   w-52 max-w-64 text-center'>
                      <span className='   text-sm '> Họ tên </span>{" "}
                    </th>

                    <th className=' w-72 max-w-96   text-center'>
                      <span className='   text-sm  '>Chức vụ </span>{" "}
                    </th>
                    <th className=' w-32  text-center'>
                      <span className='  text-sm  '>Đoàn đại biểu </span>{" "}
                    </th>
                    <th className=' w-32  text-center'>
                      <span className='   text-sm  '>Mã đại biểu</span>{" "}
                    </th>

                    <th className=' w-32  text-center'>
                      <span className='   text-sm  '>Ảnh</span>{" "}
                    </th>
                    {/* <th className=' w-16  text-center'>
                      <span className='   text-sm  '> </span>{" "}
                    </th> */}
                    <th className=' w-48  text-center'>
                      <span className='   text-sm  '> </span>{" "}
                    </th>
                  </tr>
                </thead>
                {!listDelegate?.isPending && listDelegate?.data && (
                  <tbody>
                    {listDelegate?.data?.map((item, i: number) => (
                      <tr
                        key={item.code}
                        className={`flex  gap-x-6 py-5  px-5 border-b   items-center   ${
                          i % 2 == 0 ? "bg-slate-100" : ""
                        }`}
                      >
                        <td className='text-center font-normal text-sm  w-4 max-w-8 '>
                          <span className=' font-normal text-sm  '>{i + 1}</span>
                        </td>
                        <td className='text-center font-normal text-sm  whitespace-normal  w-52 max-w-64 '>
                          <span className=' font-normal text-sm  '>{item.full_name}</span>
                        </td>

                        <td
                          title={item.position}
                          className='text-center font-normal text-sm  whitespace-normal w-72  max-w-96 '
                        >
                          <span className=' font-normal text-sm  '>{item.position}</span>
                        </td>
                        <td className='text-center font-normal text-sm w-32  whitespace-normal  '>
                          <span className=' font-normal text-sm  '>{item.delegation}</span>
                        </td>
                        <td className='text-center font-normal text-sm w-32    '>
                          <span className=' font-normal text-sm  '>{item.code} </span>
                        </td>

                        <td className='text-center font-normal text-sm max-w-24    '>
                          <img alt='' width={48} height={72} src={item.avatar} className=' font-normal text-sm    ' />
                        </td>

                        <td className='text-center flex font-normal text-sm w-32 gap-x-4 '>
                          <Link
                            href={{
                              pathname: "update-delegate",
                              query: { code: item.code },
                            }}
                            // onClick={() => deleteItem(item.id, item.full_name)}
                            className=' bg-primary-500  w-16   p-1 border z-50  px-2   border-slate-400 rounded-md   text-white	'
                          >
                            Sửa
                          </Link>
                          <button
                            onClick={() => deleteItem(item.id, item.full_name)}
                            className=' bg-primary-500 w-16    p-1 border z-50  px-2   border-slate-400 rounded-md   text-white	'
                          >
                            Xoá
                          </button>

                          <Link
                            href={{
                              pathname: `/`,
                              query: { id: item.code, stt: i + 1 },
                            }}
                            target='_blank'
                            className=' bg-primary-500  w-16   p-1 border z-50  px-2   border-slate-400 rounded-md   text-white	'
                          >
                            Xem
                          </Link>

                          <Link
                            href={{
                              pathname: `/client/checkin/select-download-2`,
                              query: { id: item.code, stt: i + 1 },
                            }}
                            target='_blank'
                            className=' bg-primary-500  w-16   p-1 border z-50  px-2   border-slate-400 rounded-md   text-white	'
                          >
                            Tải
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <CopyModal title={title} isOpen={isOpenInfo} closeModal={() => setIsOpenInfo(false)} /> */}
    </AppLayout>
  );
};

export default ListDelegate;
