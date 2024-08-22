"use client";
import { authApi } from "@/api-client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  function MainView() {
    const searchParams = useSearchParams();
    const [id] = searchParams.getAll("id") || "";
    // const [data, setData] = useState<any>(null);

    const listHistory = useQuery({
      queryKey: ["checkinHistory"],
      queryFn: async () => await authApi.CheckinHistory(),
    });

    useEffect(() => {
      const intervalId = setInterval(() => {
        getData(intervalId);
      }, 1000);
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
          <div className='   '>
            <body className='    bg-[#FFE18A]'>
              <div className='relative w-full   '>
                {!listHistory.isPending && listHistory.data[0]?.code && (
                  <img
                    src={`https://mattranhanoi.com/api/common/images/vertical/${listHistory.data[0]?.code}.png`}
                    alt='Background Image'
                    className='w-full   h-[100lvh]    '
                  />
                )}
                {/* <span className='customText-position text-red-600  text-center  font-workSansBlack text-4xl md:text-5xl lg:text-6xl xl:text-6xl uppercase'>
                  {listHistory.data[0]?.code}
                </span> */}

                {/* <span className='textbase-position text-[#2857A5] text-center  font-workSansBlack  text-3xl  uppercase'>
                  ĐẠI BIỂU CHÍNH THỨC DỰ ĐẠI HỘI ĐẠI BIỂU MTTQ VIỆT NAM THÀNH PHỐ HÀ NỘI, LẦN THỨ XVIII, NHIỆM KỲ
                  2024-2029
                </span> */}

                {/* {listHistory.data[0]?.avatar ? (
                  <img src={listHistory.data[0]?.avatar} alt='Black Image' className='rounded-full custom-position' />
                ) : (
                  <img src='/avatar.jpg' alt='Black Image' className='rounded-full custom-position' />
                )} */}
              </div>
            </body>
          </div>
        )}
      </>
    );
  }
  return (
    <div className='   justify-center'>
      <Suspense>
        <MainView />
      </Suspense>
    </div>
  );
}
