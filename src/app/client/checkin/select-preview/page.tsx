"use client";
import { authApi } from "@/api-client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface ItemType {
  user: any;
  delegate: any;
  code: string;
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

    useEffect(() => {
      const intervalId = setInterval(() => {
        getData(intervalId);
      }, 1500);
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
          <div className=''>
            <body className='    bg-[#FFE18A]'>
              <div className='relative w-full   '>
                {data.user.code && (
                  <img
                    src={`https://mattranhanoi.com/api/common/images/horizontal/${data.user.code}.png`}
                    alt='Background Image'
                    className='w-full   h-[100lvh]    '
                  />
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
