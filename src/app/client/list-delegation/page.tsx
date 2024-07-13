"use client";
import { authApi } from "@/api-client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import CopyModal from "@/components/Modal/CopyModal";
import { AuthContext } from "@/context/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
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
  name: string;
}
const ListDelegate: NextPage<any> = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [title, setTitle] = useState("");
  const { authState, accountExtendDetail, getAccountExtendDetails } = useContext(AuthContext);
  const [delegation, setDelegation] = useState("");
  const listDelegate = useQuery<ItemType[]>({
    queryKey: ["getListDelegate", authState?.access_token],
    queryFn: async () => await authApi.listDelegate(),
  });

  const handleSubmit = async () => {
    console.log("delegationdelegationdelegationdelegation", delegation);
    if (delegation) {
      let data = await authApi.addDelegation(delegation);
      await listDelegate.refetch();
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
          <div className='grid grid-cols-2  w-1/2 gap-4'>
            <input
              //   type='number'
              required={true}
              className='border p-2 w-full  rounded'
              name='phone'
              value={delegation}
              onChange={(e) => setDelegation(e.target.value)}
              placeholder='Tên đoàn đại biểu muốn thêm'
            />
            <button
              className='      w-full '
              onClick={() => {
                handleSubmit();
              }}
            >
              <p className=' bg-primary-500 font-extrabold text-lg border z-50  px-8 py-2 border-slate-400 rounded-md flex items-center justify-center text-white	'>
                Đăng bài
              </p>
            </button>
          </div>
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

                    <th className=' w-64  text-center'>
                      <span className='   text-sm  '>Tên đoàn đại biểu</span>{" "}
                    </th>
                  </tr>
                </thead>
                {!listDelegate.isPending && listDelegate.data && (
                  <tbody>
                    {listDelegate.data?.map((item, i: number) => (
                      <tr
                        key={i}
                        className={`flex  gap-x-6 py-5  px-5 border-b     ${i % 2 == 0 ? "bg-slate-100" : ""}`}
                      >
                        <td className='text-center font-normal text-sm  w-32 max-w-64 '>
                          <span className=' font-normal text-sm  '>{item.id}</span>
                        </td>

                        <td className='text-center font-normal text-sm w-64    '>
                          <span className=' font-normal text-sm  '>{item.name} </span>
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
      <CopyModal title={title} isOpen={isOpenInfo} closeModal={() => setIsOpenInfo(false)} />
    </AppLayout>
  );
};

export default ListDelegate;
