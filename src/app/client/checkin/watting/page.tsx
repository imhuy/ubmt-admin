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
                <main
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    width: "100vw",
                  }}
                >
                  <iframe
                    width='100%'
                    height='100%'
                    src='https://www.youtube.com/embed/Jn09UdSb3aA?si=J45wjY7aKEfn-L_n?autoplay=1'
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    style={{ border: "none" }}
                  ></iframe>
                </main>
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
