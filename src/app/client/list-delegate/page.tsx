"use client";
import { authApi, paymentApi } from "@/api-client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import CopyModal from "@/components/Modal/CopyModal";
import { AuthContext } from "@/context/useAuthContext";
import convertNumbThousand from "@/utils/convertNumbThousand";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export interface ItemType {
  key: string;
  created_at: string;
  total_amount_after: number;
  total_amount_before: number;
  amount: number;
  friend: string;
  content: string;
}
const ListDelegate: NextPage<any> = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [title, setTitle] = useState("");
  const { authState, accountExtendDetail, getAccountExtendDetails } = useContext(AuthContext);

  const { isPending, error, data } = useQuery<ItemType[]>({
    queryKey: ["getListDelegate", authState?.access_token],
    queryFn: async () => await authApi.listDelegate(),
  });

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
                    <th className=' w-2  text-start'>
                      <span className=' font-semibold text-sm'># </span>{" "}
                    </th>
                    <th className='  w-32 max-w-64 text-center'>
                      <span className='  text-sm '>Số tiền trước </span>{" "}
                    </th>
                    <th className='  w-32 max-w-64 text-center'>
                      <span className='   text-sm '> Số tiền nạp </span>{" "}
                    </th>

                    <th className=' w-32 max-w-64   text-center'>
                      <span className='   text-sm  '>Số tiền sau </span>{" "}
                    </th>
                    <th className=' w-32  text-center'>
                      <span className='  text-sm  '>Thời gian </span>{" "}
                    </th>
                    <th className=' w-64  text-center'>
                      <span className='   text-sm  '>Nội dung</span>{" "}
                    </th>
                  </tr>
                </thead>
                {!isPending && data && (
                  <tbody>
                    {data?.map((item, i: number) => (
                      <tr
                        key={i}
                        className={`flex  gap-x-6 py-5  px-5 border-b     ${i % 2 == 0 ? "bg-slate-100" : ""}`}
                      >
                        <td className=' text-start  w-2  '>
                          <span className='font-normal text-sm'>{i + 1} </span>
                        </td>
                        <td className='text-center font-normal text-sm  w-32 max-w-64 '>
                          <span className=' font-normal text-sm  '>
                            {convertNumbThousand(item.total_amount_before)}
                            {"đ"}
                          </span>
                        </td>
                        <td className='text-center font-normal text-sm  w-32 max-w-64 '>
                          <span className=' font-normal text-sm  '>{convertNumbThousand(item.amount)}đ</span>
                        </td>

                        <td className='text-center font-normal text-sm  w-32 max-w-64 '>
                          <span className=' font-normal text-sm  '>
                            {convertNumbThousand(item.total_amount_after)}đ
                          </span>
                        </td>
                        <td className='text-center font-normal text-sm w-32    '>
                          <span className=' font-normal text-sm  '>
                            {moment(item.created_at).format("DD-MM-YYYY hh:mm:ss")}
                          </span>
                        </td>
                        <td className='text-center font-normal text-sm w-64    '>
                          <span className=' font-normal text-sm  '>{item.content} </span>
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
