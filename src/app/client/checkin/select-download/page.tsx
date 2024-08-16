"use client";
import html2canvas from "html2canvas";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useQRCode } from "next-qrcode";
import { productApi } from "@/api-client";
const axios = require("axios");

export default function Home() {
  const [loading, setLoading] = useState(false);
  var base64ToBlob = function (base64: any) {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: base64.split(",")[0].split(":")[1].split(";")[0] });
    return blob;
  };
  const takeScreenshot = (id: string, avatar: string, name: string, stt: string, idElement: string) => {
    setLoading(true);
    const style = document.createElement("style");
    document.head.appendChild(style);
    style.sheet?.insertRule("body > div:last-child img { display: inline-block; }");
    const element = document.getElementById(idElement);

    if (element) {
      html2canvas(element, {
        useCORS: false,
        proxy: `${avatar}`,
        allowTaint: true,
        logging: true,
        // scale: 8,
      })
        .then(async (canvas) => {
          const img = new Image();
          img.src = canvas.toDataURL("image/png");
          img.onload = () => {
            // Tạo một canvas mới với kích thước cố định 800x1200
            const fixedCanvas = document.createElement("canvas");
            fixedCanvas.width = 2400;
            fixedCanvas.height = 1400;
            const ctx = fixedCanvas.getContext("2d");
            if (ctx) {
              // Vẽ nội dung của canvas ban đầu lên canvas mới với kích thước cố định
              ctx.drawImage(img, 0, 0, 2400, 1400);

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

  function MainView() {
    const searchParams = useSearchParams();
    const [id] = searchParams.getAll("id") || "";
    const [stt] = searchParams.getAll("stt") || "";
    const [data, setData] = useState<any>(null);

    if (id == "" || id == undefined) {
      redirect("https://mttqhanoi.org.vn/");
    }
    const fetchData = async (id: string) => {
      if (typeof window !== "undefined") {
        const hostname = window.location.hostname;
      }
      try {
        const response = await axios.get(`https://mattranhanoi.com/api/user/get-delegation?code=${id}`);

        const { data } = response.data;
        setData(data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    useEffect(() => {
      if (id) {
        fetchData(id);
      }
    }, [id]);

    return (
      <>
        <div className='bg-[#FFE18A]'>
          <button
            id='downloadImage'
            className='px-4 py-3  uppercase  bg-[#1E6FA2] rounded-md my-2  text-center self-center text-white  font-workSansBold  w-full  '
            onClick={() => takeScreenshot(data?.code, data?.avatar, data?.full_name, stt, "captureId")}
          >
            Tải ảnh đại biểu
          </button>
          <div className='relative w-full' id='captureId'>
            <img src='/bgmttq.jpg' alt='Background Image' className='w-full   h-[100lvh]' />

            <div className='delegate-position text-center  flex- flex-col    '>
              <p className='  mb-8  text-[#2857A5]  font-utmHelvetIns  text-4xl font-utmHelvetIn   uppercase'></p>
              <p className='mb-4  text-red-600  text-center font-utmHelvetIns text-4xl md:text-5xl lg:text-6xl xl:text-6xl uppercase'>
                {data?.full_name}
              </p>
              <p className='  mb-8   text-[#2857A5] text-center font-utmHelvetIns  italic  text-3xl  max-md:text-xl uppercase'>
                {data?.position}
              </p>
            </div>

            {data?.avatar ? (
              <img src={data.avatar} alt='Black Image' className='rounded-full border-blue-400    custom-position' />
            ) : (
              <img src='/avatar.jpg' alt='Black Image' className='rounded-full custom-position' />
            )}
          </div>
        </div>
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
