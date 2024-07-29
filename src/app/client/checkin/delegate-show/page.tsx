"use client";
import { authApi } from "@/api-client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface ItemType {
  user: any;
  delegate: any;
}
export default function Home() {
  function MainView() {
    const searchParams = useSearchParams();
    const [id] = searchParams.getAll("id") || "";
    // const [data, setData] = useState<any>(null);

    const { data, isLoading, isPending, refetch } = useQuery<ItemType>({
      queryKey: ["checkinHistory"],
      queryFn: async () => await authApi.preViewShow(),
    });

    console.log("datadatadatadatadatadata", data);

    useEffect(() => {
      const intervalId = setInterval(() => {
        getData(intervalId);
      }, 1000);
      getData(intervalId);
      return () => clearInterval(intervalId);
    }, []);

    const getData = async (clearId?: any) => {
      try {
        refetch();
      } catch (error) {}
    };
    return (
      <>
        {!isPending && data?.user && (
          <div className='   '>
            <body className='    bg-[#FFE18A]'>
              <div className='relative w-full   '>
                <img src='/anhnen.jpg' alt='Background Image' className='w-full   h-[100lvh]    ' />

                <div className='delegate-position text-center  flex- flex-col    '>
                  <p className='  mb-8  text-[#2857A5]  font-workSansBold  text-4xl    uppercase'>Chào mừng đại biểu</p>{" "}
                  <p className='mb-4  text-red-600  text-center  font-workSansBlack text-4xl md:text-5xl lg:text-6xl xl:text-6xl uppercase'>
                    {data.user?.full_name}
                  </p>
                  <p className='  mb-8   text-[#2857A5] text-center  italic font-workSansBold  text-3xl  uppercase'>
                    {data.user.position}
                  </p>
                  <p className='  text-[#2857A5] text-center  font-workSansBlack  text-3xl  uppercase'>
                    ĐẠI BIỂU CHÍNH THỨC DỰ ĐẠI HỘI ĐẠI BIỂU MTTO VIỆT NAM THÀNH PHỐ HÀ NỘI, LẦN THỨ XVIII, NHIỆM KỲ
                    2024-2029
                  </p>
                </div>

                {data.user?.avatar ? (
                  <img src={data.user?.avatar} alt='Black Image' className='rounded-full custom-position' />
                ) : (
                  <img src='/avatar.jpg' alt='Black Image' className='rounded-full custom-position' />
                )}
              </div>
            </body>
          </div>
        )}

        {!isPending && data?.delegate && (
          <div className='   '>
            <body className='    bg-[#FFE18A]'>
              <div className='relative w-full   '>
                {data.delegate?.image ? (
                  <img src={data.delegate?.image} alt='Background Image' className='w-full   h-[100lvh]    ' />
                ) : (
                  <img src='/anhnen.jpg' alt='Background Image' className='w-full   h-[100lvh]    ' />
                )}
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
