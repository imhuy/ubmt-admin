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
    const [isWaiting, setIsWaiting] = useState(false);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

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
    }, [listHistory.data]);

    let previousData = "";
    const getData = async (clearId?: any) => {
      try {
        // setIsWaiting(false);

        listHistory.refetch();

        if (listHistory.data?.[0]?.code !== previousData) {
          setIsWaiting(false);
        }
        previousData = listHistory.data?.[0]?.code;
      } catch (error) {
        // toast.error("Error when payment, please try again!");
      }
    };

    return (
      <>
        {!listHistory.isLoading && (
          <div className='   '>
            <body className='bg-[#FFE18A]'>
              <div className='relative w-full   '>
                {isWaiting ? (
                  <img src={`/Led.jpg`} alt='Background Image' className='w-full   h-[100lvh]    ' />
                ) : (
                  !listHistory.isPending &&
                  listHistory.data[0]?.code && (
                    <img
                      src={`https://mattranhanoi.com/api/common/images/horizontal/${listHistory.data[0]?.code}.png`}
                      alt='Background Image'
                      className='w-full   h-[100lvh]    '
                    />
                  )
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
