"use client";
import { authApi } from "@/api-client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";

export default function Home() {
  function MainView() {
    const searchParams = useSearchParams();
    const [id] = searchParams.getAll("id") || "";
    const [imageUrl, setImageUrl] = useState<string>("");
    const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
    const listHistory = useQuery({
      queryKey: ["checkinHistory"],
      queryFn: async () => await authApi.CheckinHistory(),
    });

    const lastItem = listHistory?.data?.length - 3;

    useEffect(() => {
      if (listHistory.data && lastItem >= 0) {
        const avatarUrl = listHistory.data[lastItem]?.avatar;
        if (avatarUrl) {
          setImageUrl(avatarUrl);
        }
      }
    }, [listHistory.data]);

    useEffect(() => {
      if (imageUrl) {
        handleCropImage();
      }
    }, [imageUrl]);

    const handleCropImage = () => {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;

      imgElement.onload = () => {
        document.body.appendChild(imgElement); // Append image to body to render it on the page temporarily
        console.log("imgElementimgElementimgElement", imgElement);
        html2canvas(imgElement, {
          useCORS: false,
          proxy: `${imageUrl ? imageUrl : "https://daihoi.mttqhanoi.org.vn/avatar.jpg"}`,
          allowTaint: true,
          logging: true,
        }).then((canvas) => {
          const ctx = canvas.getContext("2d");

          // Tính toán phần cần crop
          const cropHeight = canvas.height * 0.8; // 80% chiều cao của ảnh
          const startY = canvas.height * 0.1; // Bỏ 10% phía trên và 10% phía dưới

          const croppedCanvas = document.createElement("canvas");
          const croppedCtx = croppedCanvas.getContext("2d");

          croppedCanvas.width = canvas.width;
          croppedCanvas.height = cropHeight;

          if (ctx && croppedCtx) {
            croppedCtx.drawImage(canvas, 0, startY, canvas.width, cropHeight, 0, 0, canvas.width, cropHeight);

            setCroppedImageUrl(croppedCanvas.toDataURL());
          }

          document.body.removeChild(imgElement); // Remove the temporary image element
        });
      };
    };

    return (
      <>
        {!listHistory.isLoading && (
          <div className='bg-[#FFE18A]'>
            <div className='relative w-full'>
              <img src='/anhnen.jpg' alt='Background Image' className='w-full h-[100lvh]' />

              <div className='delegate-position text-center flex flex-col'>
                <p className='mb-4 text-[#2857A5] font-workSansBold text-4xl uppercase'>Chào mừng đại biểu</p>
                <p className='mb-4 text-red-600 text-center font-workSansBlack text-4xl md:text-5xl lg:text-6xl xl:text-6xl uppercase'>
                  {listHistory.data[lastItem]?.full_name}
                </p>
                <p className='mb-8 text-[#2857A5] text-center italic font-workSansBold text-3xl uppercase'>
                  {listHistory.data[lastItem]?.position.replace("<br/>", " ")}
                </p>
                <p className='text-[#2857A5] text-center font-workSansBlack text-3xl uppercase'>
                  ĐẠI BIỂU CHÍNH THỨC DỰ ĐẠI HỘI ĐẠI BIỂU MTTQ VIỆT NAM THÀNH PHỐ HÀ NỘI, LẦN THỨ XVIII, NHIỆM KỲ
                  2024-2029
                </p>
              </div>

              {croppedImageUrl ? (
                <img src={croppedImageUrl} alt='Cropped Image' className='rounded-full custom-position' />
              ) : (
                <img
                  src={listHistory.data[lastItem]?.avatar || "/avatar.jpg"}
                  alt='Avatar Image'
                  className='rounded-full custom-position'
                />
              )}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className='justify-center'>
      <Suspense>
        <MainView />
      </Suspense>
    </div>
  );
}
