"use client";
import { productApi } from "@/api-client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { AuthContext } from "@/context/useAuthContext";
import convertNumbThousand from "@/utils/convertNumbThousand";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import * as fs from "fs";

interface ItemType {
  // id: string;
  tradingCode: string;
  product: string;
  quantity: number;
  pay: number;
  date: string;
  transaction: string;
}
const History: NextPage<any> = () => {
  const { authState, accountExtendDetail } = useContext(AuthContext);
  const [tracsactionId, setTransactionId] = useState("");
  const { isPending, error, data } = useQuery({
    queryKey: ["getBuyHistory", authState?.access_token],
    queryFn: async () => await productApi.buyHistory(authState?.access_token ?? ""),
  });

  const donwloadProduct = useQuery({
    queryKey: ["downloadProduct", authState?.access_token],
    queryFn: async () => await productApi.downloadProduct(authState?.access_token ?? "", tracsactionId ?? ""),
    enabled: false,
  });

  useEffect(() => {
    if (tracsactionId != "") {
      (async () => {
        let fetch = await donwloadProduct.refetch();
        if (fetch.status == "success") {
          let dataNewLine = `${fetch.data.join("\n")}\n`;
          const blob = new Blob([dataNewLine], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = `bm2fa.com-${tracsactionId}.text`;
          link.href = url;
          link.click();
        }
      })();
    }
  }, [tracsactionId]);

  const createTextFile = async (id: string) => {
    setTransactionId(id);
  };

  return (
    <AppLayout>
      <div className='w-full h-screen flex flex-col'>
        <div className='p-6'>
          <Header />
          <div className='h-[1px] bg-black bg-opacity-20 my-4 max-lg:hidden' />
        </div>
        <div className='w-full flex flex-col items-center gap-y-6'>
          <div className='mt-4  w-[95%]  flex flex-wrap justify-between '>
            <div className='w-[30%] py-10 bg-white flex flex-col items-center    border shadow-md rounded-md '>
              <p className=' font-workSansSemiBold text-2xl text-primary-500'>
                {convertNumbThousand(accountExtendDetail?.total_amount)}
              </p>
              <p className='text-sm font-workSansSemiBold  text-center mt-1'>Tổng Tiền Nạp</p>
            </div>
            <div className='w-[30%] py-10 flex bg-white flex-col items-center    border shadow-md rounded-md '>
              {accountExtendDetail?.total_amount && accountExtendDetail?.amount && (
                <p className=' font-workSansSemiBold text-2xl text-green-600'>
                  {convertNumbThousand(accountExtendDetail?.total_amount - accountExtendDetail?.amount)}
                </p>
              )}
              <p className='   text-sm font-workSansSemiBold  text-center mt-1'>Đã Sử Dụng</p>
            </div>
            <div className='w-[30%] py-10 flex bg-white flex-col items-center    border shadow-md rounded-md '>
              <p className=' font-workSansSemiBold text-2xl text-blue-500'>
                {convertNumbThousand(accountExtendDetail?.amount)}
              </p>
              <p className='   text-sm font-workSansSemiBold  text-center mt-1'>Còn Lại</p>
            </div>
          </div>
          <div className='w-[95%] overflow-auto	scrollmenu justify-center flex flex-col gap-y-8 bg-white  border shadow-md rounded-md '>
            <div className='border-b px-4 py-5'>
              <span className=' font-workSansSemiBold  text-2xl'>Lịch Sử Mua Hàng</span>
            </div>
            <div className='scrollmenu  '>
              <table className='  '>
                <thead className=''>
                  <tr className='flex gap-x-6 px-5 mb-5 mt-2 '>
                    <th className=' w-4  text-start'>
                      <span className=' font-semibold text-sm'># </span>{" "}
                    </th>
                    <th className=' w-20 max-w-[80px]  text-center'>
                      <span className='font-semibold text-sm '>Số lượng </span>{" "}
                    </th>
                    <th className=' w-40 max-w-[160px] text-center'>
                      <span className=' font-semibold text-sm '> Mã giao dịch </span>{" "}
                    </th>
                    <th className=' w-52  text-center'>
                      <span className=' font-semibold text-sm  '>Sản phẩm </span>{" "}
                    </th>
                    <th className=' w-40    text-center'>
                      <span className=' font-semibold text-sm  '>Thanh toán </span>{" "}
                    </th>
                    <th className=' w-32  text-center'>
                      <span className=' font-semibold text-sm  '>Thời gian </span>{" "}
                    </th>
                    <th className=' w-32  text-center'>
                      <span className=' font-semibold text-sm  '>Thao tác</span>{" "}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!isPending &&
                    data?.map((item: any, i: number) => (
                      <tr
                        key={i}
                        className={`flex  items-center gap-x-6 py-5  px-5 border-b ${i % 2 == 0 ? "bg-slate-100" : ""}`}
                      >
                        <td className=' text-start  w-4  '>
                          <span className='font-normal text-sm'>{i + 1} </span>
                        </td>
                        <td className='text-center font-normal text-sm w-20 max-w-[80px]  '>
                          <span className=' font-normal text-sm  '>{convertNumbThousand(item?.total)} </span>
                        </td>
                        <td className='text-center font-normal text-sm  w-40 max-w-[160px]  '>
                          <span className=' font-normal text-sm  '>{item?.transaction}</span>
                        </td>
                        <td className='text-center font-normal text-sm w-52'>
                          <span className=' font-normal text-sm  '>{item?.product_name}</span>
                        </td>

                        <td className='text-center font-normal text-sm w-40'>
                          <span className=' font-normal text-sm  '>{convertNumbThousand(item?.total_amount)}đ</span>
                        </td>
                        <td className='text-center font-normal text-sm w-32'>
                          <span className=' font-normal text-sm  '>
                            {moment(item.created_at).format("DD-MM-YYYY hh:mm:ss")}
                          </span>
                        </td>
                        <td className='text-center font-normal text-sm w-32'>
                          <span className=' font-normal text-sm  text-white gap-x-1   flex '>
                            <span className=' bg-blue-500 p-2 rounded-sm self-center'> Xem thêm</span>
                            <button onClick={() => createTextFile(item.transaction)}>
                              <span className='  bg-green-800 p-2 rounded-sm'>Tải về</span>
                            </button>

                            <span className=' bg-red-700 p-2 rounded-sm'>Bảo hành</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default History;
