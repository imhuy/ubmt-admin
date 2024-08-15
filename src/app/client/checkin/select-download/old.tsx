"use client";
import { authApi } from "@/api-client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
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

    const takeScreenshot = (id: string, avatar: string, name: string, stt: string, idElement: string) => {
      const style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet?.insertRule("body > div:last-child img { display: inline-block; }");
      const element = document.getElementById(idElement);

      if (element) {
        html2canvas(element, {
          useCORS: false,
          proxy: `${avatar ? avatar : "https://daihoi.mttqhanoi.org.vn/avatar.jpg"}`,
          allowTaint: true,
          logging: true,
          scale: 2,
        })
          .then(async (canvas) => {
            const img = new Image();
            img.src = canvas.toDataURL("image/png");
            img.onload = () => {
              // Tạo một canvas mới với kích thước cố định 800x1200
              const fixedCanvas = document.createElement("canvas");
              fixedCanvas.width = 2400;
              fixedCanvas.height = 1350;
              const ctx = fixedCanvas.getContext("2d");
              if (ctx) {
                // Vẽ nội dung của canvas ban đầu lên canvas mới với kích thước cố định
                ctx.drawImage(img, 0, 0, 2400, 1350);

                const imgData = fixedCanvas.toDataURL("image/png");
                const link: any = document.createElement("a");
                link.href = imgData;
                if (idElement === "captureId") {
                  link.download = `${stt}.${name}.png`;
                }
                if (idElement === "captureQr") {
                  link.download = `${stt}.${name}.Qr.jpg`;
                }

                document.body.appendChild(link);
                link.click();
                link.remove();

                style.remove();
                // productApi.uploadImageBase64({ type: 4, image: imgData }).then((dataUrl) => {
                //   if (imgData) {
                //     link.href = imgData;
                //   } else {
                //     link.href = dataUrl;
                //   }
                //   if (idElement === "captureId") {
                //     link.download = `${stt}.${name}.png`;
                //   }
                //   if (idElement === "captureQr") {
                //     link.download = `${stt}.${name}.Qr.jpg`;
                //   }

                //   document.body.appendChild(link);
                //   link.click();
                //   link.remove();

                //   style.remove();
                // });
              }
            };
          })
          .catch((err) => {
            console.error("Error taking screenshot:", err);
          });
      } else {
        console.error("Element to capture not found!");
      }
    };
    return (
      <>
        {!isPending && data?.user && (
          <div className=''>
            <body className='    bg-[#FFE18A]'>
              <button
                id='downloadImage'
                className='px-4 py-3  uppercase  bg-[#1E6FA2] rounded-md my-2  text-center self-center text-white  font-workSansBold  w-full  '
                onClick={() => takeScreenshot("id", data.user?.avatar, "Huy lưu", "1", "captureId")}
              >
                Tải ảnh đại biểu
              </button>
              <div className='relative w-full' id='captureId'>
                <img src='/bgmttq.jpg' alt='Background Image' className='w-full   h-[100lvh]' />

                <div className='delegate-position text-center  flex- flex-col    '>
                  <p className='  mb-8  text-[#2857A5]  font-utmHelvetIns  text-4xl font-utmHelvetIn   uppercase'></p>
                  <p className='mb-4  text-red-600  text-center font-utmHelvetIns text-4xl md:text-5xl lg:text-6xl xl:text-6xl uppercase'>
                    {data.user?.full_name}
                  </p>
                  <p className='  mb-8   text-[#2857A5] text-center font-utmHelvetIns  italic  text-3xl  max-md:text-xl uppercase'>
                    {data.user.position.replace("<br/>", "")}
                  </p>
                </div>

                {data.user?.avatar ? (
                  <img
                    src={data.user?.avatar}
                    alt='Black Image'
                    className='rounded-full border-blue-400  border-b-2 custom-position'
                  />
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
