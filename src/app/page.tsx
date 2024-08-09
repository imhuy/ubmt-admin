"use client";
import html2canvas from "html2canvas";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useQRCode } from "next-qrcode";
import { productApi } from "@/api-client";
const axios = require("axios");

export default function Home() {
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
    console.log("idElementidElementidElement", id);
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
      })
        .then(async (canvas) => {
          const img = new Image();
          img.src = canvas.toDataURL("image/png");
          img.onload = () => {
            // Tạo một canvas mới với kích thước cố định 800x1200
            const fixedCanvas = document.createElement("canvas");
            fixedCanvas.width = 800;
            fixedCanvas.height = 1200;
            const ctx = fixedCanvas.getContext("2d");

            if (ctx) {
              // Vẽ nội dung của canvas ban đầu lên canvas mới với kích thước cố định
              ctx.drawImage(img, 0, 0, 800, 1200);

              const imgData = fixedCanvas.toDataURL("image/png");
              const link: any = document.createElement("a");

              productApi.uploadImageBase64({ type: 4, image: imgData }).then((dataUrl) => {
                if (imgData) {
                  link.href = imgData;
                } else {
                  link.href = dataUrl;
                }
                if (idElement === "captureId") {
                  link.download = `${stt}.${name}.jpg`;
                }
                if (idElement === "captureQr") {
                  link.download = `${stt}.${name}.Qr.jpg`;
                }

                document.body.appendChild(link);
                link.click();
                link.remove();

                style.remove();
              });
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
    const { SVG } = useQRCode();

    if (id == "" || id == undefined) {
      redirect("https://mttqhanoi.org.vn/");
    }
    const fetchData = async (id: string) => {
      if (typeof window !== "undefined") {
        const hostname = window.location.hostname;
        console.log("hostnamehostnamehostnamehostname", hostname);
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

    function createMarkup(text: string) {
      return { __html: text };
    }

    return (
      <div className='flex flex-col  h-full w-[400px]   '>
        <div className='  grid grid-cols-7  bg-[#1E6FA2] text-white items-center  pb-5 px-4 text  '>
          <img src='/icon.svg' alt='Sample Image' className=' col-span-1  max-w-[50px] mt-4   ' />

          <span className='  mt-5 col-span-6  text-sm  font-workSansBold  '>UỶ BAN MTTQ VIỆT NAM THÀNH PHỐ HÀ NỘI</span>
          {/* <button
            onClick={() => takeScreenshot(id, data.avatar)}
            className='  mt-5  col-span-2 text-center  font-workSansBold p-2 rounded-lg  uppercase  bg-white text-xs  text-red-600  '
          >
            Tải thẻ đại biểu
          </button> */}
        </div>
        <div className='flex flex-col '>
          <span className=' uppercase text-center  text-red-600 font-workSansBold mt-4'>Chào mừng đại biểu</span>
          <span className='  font-bold text-xl text-center font-workSansBold mt-2'>{data?.full_name}</span>
          <div className='flex shadow-lg rounded-lg justify-around      items-center    min-h-40 py-4'>
            <div className='w-[30%] ml-2  '>
              <SVG
                text={id ? id : "Không tìm thấy mã đại biểu"}
                options={{
                  width: 120,

                  color: {
                    dark: "#010599FF",
                    light: "#ffffff",
                  },
                }}
              />
            </div>

            <div className='flex flex-col   items-start gap-y-1'>
              <div className='flex items-center'>
                <div className='flex'>
                  <div className=' mx-2 w-2 h-2 bg-black' />
                </div>
                <span className=' font-light'>
                  Mã đại biểu: <span className=' font-workSansBold'>{data?.code}</span>
                </span>
              </div>
              {/* {data?.delegation && (
                <div className='flex items-center'>
                  <div className='flex'>
                    <div className=' mx-2 w-2 h-2 bg-black' />
                  </div>

                  <span className=' font-light'>
                    Đoàn: <span className=' font-workSansBold'>{data?.delegation} </span>
                  </span>
                </div>
              )} */}
              <div className='flex items-center'>
                <div className='flex'>
                  <div className=' mx-2 w-2 h-2 bg-black' />
                </div>
                <span className=' font-light'>
                  Chức vụ: <span className='font-workSansBold'>{data?.position.replace("<br/>", "")}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className=' w-[400px] h-[600px] flex items-center flex-col  relative' id='capture'>
          <img src='/anhnen.jpg' alt='Sample Image' className=' w-[400px] h-[600px]  rounded-[10px]' />

          {data?.avatar ? (
            <img
              src={data?.avatar}
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

          <div className='absolute w-[70px] h-[70]  top-[480px] left-[220px]'>
            <SVG
              text={id ? id : "Không tìm thấy mã đại biểu"}
              options={{
                margin: 2,
                width: 70,
                color: {
                  dark: "#010599FF",
                  light: "#ffffff",
                },
              }}
            />
          </div>
          <div className='flex flex-col self-center justify-start items-center absolute top-[365px] left-[150px]  w-[210px] '>
            <span className=' text-[#3760AE] uppercase  font-workSansBlack  text-[15px] text-center '>
              {data?.full_name}
            </span>
            <span className='  uppercase text-[#3760AE]  font-workSansBold  self-center text-center text-[15px]'>
              {data?.delegation}
            </span>
          </div>

          <div className='flex flex-col self-center justify-start items-center absolute top-[455px] left-[150px]  w-[210px] '>
            <span className=' text-[#3760AE] uppercase  font-workSansBold  text-[15px] '>
              Mã đại biểu : {data?.code}
            </span>
          </div>
        </div> */}

        <div className=' w-[400px] h-[600px] flex items-center mt-4 flex-col  relative' id='captureId'>
          <img src='/the1.jpg' alt='Sample Image' className=' w-[400px] h-[600px]  rounded-[10px]' />

          {data?.avatar ? (
            <img
              src={data?.avatar}
              alt='Sample Image'
              className='w-[104px] h-[150px]  absolute  top-[295px] left-[148px] '
            />
          ) : (
            <img
              src='/avatar.jpg'
              alt='Sample Image'
              className='w-[104px] h-[150px]  absolute  top-[295px] left-[148px] '
            />
          )}

          <div className='flex flex-col self-center justify-start items-center   absolute top-[455px] left-[0px]  w-full '>
            <span className=' text-[#0050A2] uppercase    font-utmHelvetIns  font-thin  text-[18px] text-center '>
              {data?.full_name}
              {/* <div dangerouslySetInnerHTML={createMarkup(data?.full_name)} /> */}
            </span>
            <span className='  uppercase text-[#0050A2]   font-utmHelvetIns  font-thin     self-center text-center text-[16px]'>
              {/* {data?.position} */}
              <div dangerouslySetInnerHTML={createMarkup(data?.position)} />
            </span>
          </div>

          <div className='flex flex-col self-center justify-start items-center absolute top-[455px] left-[150px]  w-[210px] '>
            <span className=' text-[#3760AE] uppercase  font-workSansBold  text-[15px] '>
              {/* Mã đại biểu : {data?.code} */}
            </span>
          </div>
        </div>

        <button
          className='px-4 py-3  uppercase  bg-[#1E6FA2] rounded-md my-2  text-center self-center text-white  font-workSansBold  w-full  '
          onClick={() => takeScreenshot(id, data.avatar, data.full_name, stt, "captureId")}
        >
          Tải thẻ đại biểu
        </button>

        <div className=' w-[400px] h-[600px] flex items-center flex-col  relative' id='captureQr'>
          <img src='/the2.jpg' alt='Sample Image' className=' w-[400px] h-[600px]  rounded-[10px]' />

          <div className='absolute w-[70px] h-[70]  top-[320px] left-[248.5px]'>
            <SVG
              text={id ? id : "Không tìm thấy mã đại biểu"}
              options={{
                margin: 2,
                width: 85,
                color: {
                  dark: "#D32A2C",
                  light: "#FFFFFF00",
                },
              }}
            />
          </div>

          <div className='absolute w-[70px] h-[70]  top-[320px] left-[74px]'>
            <SVG
              text={"https://chatbot.zalo.me/ref/4541578065285117921?id=tai-lieu-dai-hoi"}
              options={{
                margin: 2,
                width: 85,
                color: {
                  dark: "#D32A2C",
                  light: "#FFFFFF00",
                },
              }}
            />
          </div>
        </div>

        <button
          className='px-4 py-3  uppercase  bg-[#1E6FA2] rounded-md mt-2  text-center self-center text-white  font-workSansBold  w-full  '
          onClick={() => takeScreenshot(id, data.avatar, data.full_name, stt, "captureQr")}
        >
          Tải thẻ Qr
        </button>
      </div>
    );
  }
  return (
    <div className=' flex   justify-center'>
      <Suspense>
        <div className='flex flex-col w-[400px]'>
          <MainView />
          <div className='px-4 py-3  uppercase  bg-[#1E6FA2] mt-2 flex flex-col  text-center self-center text-white  font-bold    '>
            <img src='/icon.svg' alt='Sample Image' className='w-[98px] self-center  ' />

            <span className='  mt-5  px-1 font-workSansBold '>
              BAN TỔ CHỨC ĐẠI HỘI ĐẠI BIỂU MẶT TRẬN TỔ QUỐC VIỆT NAM THÀNH PHỐ HÀ NỘI
            </span>
            <span className='     font-workSansBold '>LẦN THỨ XVIII NHIỆM KỲ 2024 - 2029</span>
          </div>

          <div className='px-4 py-3  uppercase  bg-[#1E6FA2]  mt-[2px] flex flex-col  text-center self-center w-full h-[20px] text-white  font-bold    '></div>
        </div>
      </Suspense>
    </div>
  );
}
