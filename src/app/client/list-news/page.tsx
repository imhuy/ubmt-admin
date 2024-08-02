"use client";
import { authApi } from "@/api-client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
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
const ListDelegate: NextPage<any> = () => {
  const [selected, setSelected] = useState<any>(1);

  const listPostNew = useQuery<ItemType[]>({
    queryKey: ["listPostNew", selected],
    queryFn: async () => await authApi.listNews(selected),
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
        let data = await authApi.deletePostById(id);
        await listPostNew.refetch();

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

          <div className='flex gap-x-4  p-4'>
            <label className='flex items-center mb-2'>
              <input
                type='radio'
                name='radio'
                value={1}
                className='form-radio text-blue-600 h-4 w-4'
                onChange={(e) => setSelected(e.target.value)}
                checked={selected == 1}
              />
              <span className='ml-2'>Tin tức</span>
            </label>

            <label className='flex items-center mb-2'>
              <input
                type='radio'
                name='radio'
                value={5}
                className='form-radio text-blue-600 h-4 w-4'
                onChange={(e) => setSelected(e.target.value)}
                checked={selected == 5}
              />
              <span className='ml-2'>Thông báo</span>
            </label>
            <label className='flex items-center mb-2'>
              <input
                type='radio'
                name='radio'
                value={2}
                className='form-radio text-blue-600 h-4 w-4'
                onChange={(e) => setSelected(e.target.value)}
                checked={selected == 2}
              />
              <span className='ml-2'>Thông tin hội nghị</span>
            </label>
            <label className='flex items-center mb-2'>
              <input
                type='radio'
                name='radio'
                value={3}
                className='form-radio text-blue-600 h-4 w-4'
                onChange={(e) => setSelected(e.target.value)}
                checked={selected == 3}
              />
              <span className='ml-2'>Chương trình đại hội</span>
            </label>
          </div>

          <div className='flex flex-col  gap-y-4'>
            {listPostNew?.data?.map((item: any, i) => (
              <div key={i} className='flex items-center  justify-between gap-x-6 flex-row mx-auto w-[90%]'>
                {/* <span>{item.id}</span> */}
                <div className='flex flex-col'>
                  <span className=' font-workSansSemiBold'>{item.title}</span>
                  <span>{item.short_description}</span>
                </div>

                <div className='flex'>
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

export default ListDelegate;
