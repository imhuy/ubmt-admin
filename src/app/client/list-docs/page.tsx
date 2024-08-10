"use client";
import { authApi } from "@/api-client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
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
const ListDocs: NextPage<any> = () => {
  const [selected, setSelected] = useState<any>(1);

  const ListDocs = useQuery<ItemType[]>({
    queryKey: ["ListDocsListDocsx", selected],
    queryFn: async () => await authApi.listDocs(),
  });

  const showConfirmation = async (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const userConfirmed = window.confirm(message);
      resolve(userConfirmed);
    });
  };

  const deleteItem = async (id: number) => {
    const userConfirmed = await showConfirmation(`Bạn có chắc chắn muốn xóa bài viết này? `);
    if (userConfirmed) {
      try {
        let data = await authApi.deleteDocsbyId(id);
        await ListDocs.refetch();

        console.log("Đã xóa thành công", data);
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
        <div className='w-full flex flex-col mb-10 items-center gap-y-2'>
          <div className='w-[95%] justify-center flex flex-col  gap-y-2  bg-white  border shadow-md rounded-md '></div>

          <div className='w-[95%] overflow-auto scrollmenu justify-center flex flex-col gap-y-8 bg-white  border shadow-md rounded-md '>
            <div className='border-b px-4 py-5 flex items-center gap-2'>
              <span className=' font-workSansSemiBold text-2xl'>Danh sách bài viết</span>
            </div>
          </div>

          <div className='flex flex-col  gap-y-4'>
            {ListDocs?.data?.map((item: any, i) => (
              <div key={i} className='flex items-center  justify-between gap-x-6 flex-row mx-auto w-[90%]'>
                <span>{item.id}.</span>
                <div className='flex flex-col'>
                  <span className=' font-workSansSemiBold'>{item.name}</span>
                  <span>{item.detail}</span>
                </div>

                <div className='flex'>
                  <Link
                    href={{
                      pathname: "list-docs/update",
                      query: { id: item.id },
                    }}
                    // onClick={() => deleteItem(item.id, item.full_name)}
                    className=' bg-primary-500  w-12  mr-2  p-1 border z-50  px-2   border-slate-400 rounded-md   text-white	'
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className=' bg-primary-500 h-1/2 items-center  py-1  border z-50  px-3   border-slate-400 rounded-md   text-white	'
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ListDocs;
