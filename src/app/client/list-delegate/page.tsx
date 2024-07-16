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
    queryFn: async () => await authApi.listDelegateUser(),
  });

  const showConfirmation = async (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const userConfirmed = window.confirm(message);
      resolve(userConfirmed);
    });
  };

  const deleteItem = async (id: number) => {
    const userConfirmed = await showConfirmation(`Bạn có chắc chắn muốn xóa đại biểu Id ${id}? `);
    if (userConfirmed) {
      try {
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
                    <th className='  w-32 max-w-64 text-center'>
                      <span className='  text-sm '>Id </span>{" "}
                    </th>
                    <th className='  w-32 max-w-64 text-center'>
                      <span className='   text-sm '> Họ tên </span>{" "}
                    </th>

                    <th className=' w-64  max-w-96   text-center'>
                      <span className='   text-sm  '>Chức vụ </span>{" "}
                    </th>
                    <th className=' w-32  text-center'>
                      <span className='  text-sm  '>Đoàn đại biểu </span>{" "}
                    </th>
                    <th className=' w-32  text-center'>
                      <span className='   text-sm  '>Mã đại biểu</span>{" "}
                    </th>
                    {/* <th className=' w-16  text-center'>
                      <span className='   text-sm  '> </span>{" "}
                    </th> */}
                    <th className=' w-48  text-center'>
                      <span className='   text-sm  '> </span>{" "}
                    </th>
                  </tr>
                </thead>
                {!isPending && data && (
                  <tbody>
                    {data?.map((item, i: number) => (
                      <tr
                        key={i}
                        className={`flex  gap-x-6 py-5  px-5 border-b   items-center   ${
                          i % 2 == 0 ? "bg-slate-100" : ""
                        }`}
                      >
                        <td className='text-center font-normal text-sm  w-32 max-w-64 '>
                          <span className=' font-normal text-sm  '>{item.id}</span>
                        </td>
                        <td className='text-center font-normal text-sm  w-32 max-w-64 '>
                          <span className=' font-normal text-sm  '>{item.full_name}</span>
                        </td>

                        <td title={item.position} className='text-center font-normal text-sm  truncate  w-64 max-w-96 '>
                          <span className=' font-normal text-sm  '>{item.position}</span>
                        </td>
                        <td className='text-center font-normal text-sm w-32    '>
                          <span className=' font-normal text-sm  '>{item.delegation}</span>
                        </td>
                        <td className='text-center font-normal text-sm w-32    '>
                          <span className=' font-normal text-sm  '>{item.code} </span>
                        </td>

                        {/* <td className='text-center flex font-normal text-sm w-16      '>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className=' bg-primary-500   p-2 border z-50  px-2   border-slate-400 rounded-md   text-white	'
                          >
                            Xoá
                          </button>
                        </td> */}

                        {/* <td className='text-center font-normal text-sm         '>
                          <Link
                            href={{
                              pathname: "update-delegate",
                              query: { id: item.id },
                            }}
                            className=' bg-primary-500     border z-50    border-slate-400 rounded-md   text-white	'
                          >
                            Cập nhật thông tin
                          </Link>
                        </td> */}
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
