"use client";
import { authApi } from "@/api-client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  function MainView() {
    const searchParams = useSearchParams();
    const [id] = searchParams.getAll("id") || "";
    // const [data, setData] = useState<any>(null);

    const listHistory = useQuery({
      queryKey: ["checkinHistory"],
      queryFn: async () => await authApi.CheckinHistory(),
    });

    if (!listHistory.isLoading) {
      console.log("listPostNewlistPostNewlistPostNew", listHistory.data[0]);
      // setData(listHistory.data[0]);
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        getData(intervalId);
      }, 3000);
      getData(intervalId);
      return () => clearInterval(intervalId);
    }, []);

    const getData = async (clearId?: any) => {
      try {
        listHistory.refetch();
      } catch (error) {
        // toast.error("Error when payment, please try again!");
      }
    };
    return (
      <>
        {!listHistory.isLoading && (
          <div className='flex flex-col   h-full w-[400px]   '>
            <div className='  grid grid-cols-7  bg-[#0984e3] text-white items-center  pb-5 px-4 text  '>
              <img src='/icon.svg' alt='Sample Image' className=' col-span-1  max-w-[50px] mt-4   ' />
              <span className='  mt-5 col-span-6  text-center text-sm  font-workSansBold  '>
                UỶ BAN MTTQ VIỆT NAM THÀNH PHỐ HÀ NỘI
              </span>
            </div>
            {/* <div className='flex flex-col '>
              <span className=' uppercase text-center  text-red-600 font-workSansBold  bg-white mt-4'>
                Chào mừng đại biểu
              </span>
              <span className='  font-bold text-xl text-center font-workSansBold my-6'>
                {listHistory.data[0]?.full_name}
              </span>
            </div> */}

            <div className=' w-[400px] h-[600px]  mt-10 flex items-center flex-col  relative' id='capture'>
              <img src='/anhnen.jpg' alt='Sample Image' className=' w-[400px] h-[600px]  rounded-[10px]' />

              {listHistory.data[0]?.avatar ? (
                <img
                  src={listHistory.data[0]?.avatar}
                  alt='Sample Image'
                  className='w-[98px] h-[147px]  absolute top-[287px] left-[35.5px] '
                />
              ) : (
                <img
                  src='/avatar.jpg'
                  alt='Sample Image'
                  className='w-[98px] h-[147px]  absolute top-[287px] left-[35px] '
                />
              )}

              <div className='flex flex-col self-center justify-start items-center absolute top-[365px] left-[150px]  w-[210px] '>
                <span className=' text-[#3760AE] uppercase  font-workSansBlack  text-[15px] text-center '>
                  {listHistory.data[0]?.full_name}
                </span>
                <span className='  uppercase text-[#3760AE]  font-workSansBold  self-center text-center text-[15px]'>
                  {listHistory.data[0]?.delegation}
                </span>
              </div>

              {/* <div className='flex flex-col self-center justify-start items-center absolute top-[455px] left-[150px]  w-[210px] '>
                <span className=' text-[#3760AE] uppercase  font-workSansBold  text-[15px] '>
                  Mã đại biểu : {listHistory.data[0].code}
                </span>
              </div> */}
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <div className=' flex bg-[#0984e3] h-screen   justify-center'>
      <Suspense>
        <div className='flex flex-col w-[400px]'>
          <MainView />

          {/* <div className='px-4 py-3  uppercase  bg-[#1E6FA2]  mt-[2px] flex flex-col  text-center self-center w-full h-[20px] text-white  font-bold    '></div> */}
        </div>
      </Suspense>
    </div>
  );
}
