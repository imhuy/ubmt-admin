"use client";
import { authApi } from "@/api-client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { AuthContext } from "@/context/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

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

export interface DelegationType {
  id: number;
  key: string;
  name: string;
  image: string;
}
const ListDelegate: NextPage<any> = () => {
  const { authState } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchTermDelegate, setSearchTermDelegate] = useState<string>("");

  const [tab, setTab] = useState<number>(0);

  const { data, isLoading, refetch, isPending } = useQuery<ItemType[]>({
    queryKey: ["getListUserSelect", authState?.access_token],
    queryFn: async () => await authApi.listDelegateUser(),
  });

  const {
    data: dataDelegate,
    isLoading: isLoadingDelegate,
    refetch: refetchDelegate,
    isPending: isPendingDelegate,
  } = useQuery<DelegationType[]>({
    queryKey: ["getListDelegateSelect", authState?.access_token],
    queryFn: async () => await authApi.listDelegate(),
  });

  const addPreview = async (id: number, type: number) => {
    toast.success("Hiển thị lên màn hình lớn thành công");
    let data = await authApi.addPreViewData(id, type);

    console.log("datadatadatadata", data.code);
    if (data.code === 0) {
    }
  };

  const onSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const onSearchDelegate = (e: any) => {
    setSearchTermDelegate(e.target.value);
  };

  const filteredData = data?.filter((item) => item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredDelegateData = dataDelegate?.filter((item) =>
    item.name?.toLowerCase().includes(searchTermDelegate.toLowerCase())
  );

  return (
    <AppLayout>
      <div className='w-full flex flex-col'>
        <div className='p-6'>
          <Header />
          <div className='h-[1px] bg-black bg-opacity-20 my-4 max-lg:hidden' />
        </div>
        <div className='w-full flex flex-col mb-10 items-center gap-y-6'>
          {/* <div className='w-[95%] justify-center flex flex-col gap-y-8 bg-white border shadow-md rounded-md'></div> */}
          <div className='w-[95%] pt-4 overflow-auto scrollmenu justify-center flex flex-col gap-y-8 bg-white border shadow-md rounded-md'>
            <div className=' flex gap-x-4 px-4'>
              <button
                onClick={() => setTab(0)}
                className={`font-workSansSemiBold text-2xl ${tab == 0 ? "border-red-500 border-b-4" : null}`}
              >
                Danh sách đại biểu
              </button>
              <button
                onClick={() => setTab(1)}
                className={`font-workSansSemiBold text-2xl ${tab == 1 ? "border-red-500 border-b-4" : null}`}
              >
                Danh sách đoàn đại biểu
              </button>

              <a href='/client/checkin/delegate-show' target='blank'>
                <span className=' text-blue-500 font-workSansSemiBold'>Mở màn hình</span>
              </a>

              <a href='/client/checkin/watting' target='blank'>
                <span className=' text-blue-500 font-workSansSemiBold'>Màn hình chờ</span>
              </a>
            </div>
            <div className='scrollmenu'>
              {tab == 0 ? (
                <div>
                  <div className=' w-full flex items-center  justify-center gap-x-6'>
                    <span> Tìm kiếm: </span>
                    <input
                      required={true}
                      className='border self-center p-2 h-12 w-1/4  rounded'
                      name='search'
                      onChange={onSearch}
                      placeholder='Nhập tên đại biểu'
                    />
                  </div>

                  <table>
                    <thead>
                      <tr className='flex gap-x-6 px-5 mb-5 mt-2 font-workSansBold'>
                        <th className='w-4 max-w-16 text-center'>
                          <span className='text-sm'>Id</span>
                        </th>
                        <th className='w-48 max-w-64 text-center'>
                          <span className='text-sm'>Họ tên</span>
                        </th>
                        <th className='w-64 max-w-96 text-center'>
                          <span className='text-sm'>Chức vụ</span>
                        </th>
                        <th className='w-32 text-center'>
                          <span className='text-sm'>Đoàn đại biểu</span>
                        </th>
                        <th className='w-32 text-center'>
                          <span className='text-sm'>Mã đại biểu</span>
                        </th>
                        <th className='w-48 text-center'>
                          <span className='text-sm'></span>
                        </th>
                      </tr>
                    </thead>
                    {!isPending && filteredData && (
                      <tbody>
                        {filteredData.map((item, i) => (
                          <tr
                            key={i}
                            className={`flex gap-x-6 py-5 px-5 border-b items-center ${
                              i % 2 === 0 ? "bg-slate-100" : ""
                            }`}
                          >
                            <td className='text-center font-normal text-sm w-4 max-w-16'>
                              <span className='font-normal text-sm'>{i}</span>
                            </td>

                            <td className='text-center font-normal text-sm whitespace-normal w-48 max-w-64'>
                              <span className='font-normal text-sm'>{item.full_name}</span>
                            </td>
                            <td
                              title={item.position}
                              className='text-center font-normal text-sm whitespace-normal w-64 max-w-64'
                            >
                              <span className='font-normal text-sm'>{item.position}</span>
                            </td>
                            <td className='text-center font-normal text-sm w-32'>
                              <span className='font-normal text-sm'>{item.delegation}</span>
                            </td>
                            <td className='text-center font-normal text-sm w-32'>
                              <span className='font-normal text-sm'>{item.code}</span>
                            </td>
                            <td className='text-center flex font-normal text-sm w-16'>
                              <button
                                onClick={() => addPreview(item.id, 0)}
                                className='bg-primary-500 p-1 border z-50 px-2 border-slate-400 rounded-md text-white'
                              >
                                Hiển thị lên màn hình lớn
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              ) : (
                <div>
                  <div className=' w-full flex items-center  justify-center gap-x-6'>
                    <span> Tìm kiếm: </span>
                    <input
                      required={true}
                      className='border self-center p-2 h-12 w-1/4  rounded'
                      name='search'
                      onChange={onSearchDelegate}
                      placeholder='Nhập đoàn đại biểu'
                    />
                  </div>
                  <table>
                    <thead>
                      <tr className='flex gap-x-6 px-5 mb-5 mt-2 font-workSansBold  '>
                        <th className='  w-4 max-w-16 text-center'>
                          <span className='  text-sm '>Id </span>{" "}
                        </th>

                        <th className=' w-32 max-w-48 text-center'>
                          <span className='  text-sm '>Mã đoàn </span>{" "}
                        </th>

                        <th className=' w-64 max-w-96  text-center'>
                          <span className='   text-sm  '>Tên đoàn đại biểu</span>{" "}
                        </th>

                        <th className=' w-32  text-center'>
                          <span className='   text-sm  '></span>{" "}
                        </th>
                      </tr>
                    </thead>
                    {!isPendingDelegate && filteredDelegateData && (
                      <tbody>
                        {filteredDelegateData?.map((item: any, i: number) => (
                          <tr
                            key={i}
                            className={`flex  gap-x-6 py-2  px-5 border-b     ${i % 2 == 0 ? "bg-slate-100" : ""}`}
                          >
                            <td className='text-center font-normal text-sm  mt-2  w-4 max-w-16 '>
                              <span className=' font-normal text-sm  '>{i}</span>
                            </td>

                            <td className='text-center font-normal text-sm w-32 max-w-48'>
                              <span className='font-normal text-sm'>{item.id}</span>
                            </td>

                            <td className='text-center font-normal text-sm whitespace-normal w-96 max-w-96'>
                              <span className=' font-normal text-sm  '>{item.name}</span>
                            </td>

                            <td className='text-center  flex  justify-end font-normal text-sm w-64    '>
                              <button
                                onClick={() => addPreview(item.id, 1)}
                                className=' bg-primary-500  py-1 border z-50  px-2   border-slate-400 rounded-md   text-white	'
                              >
                                Hiển thị lên màn hình lớn
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ListDelegate;
