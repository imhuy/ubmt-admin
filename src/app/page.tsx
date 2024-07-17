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
  const takeScreenshot = (id: string, avatar: string, idElement: string) => {
    console.log("idElementidElementidElement", idElement);
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
          const img = canvas.toDataURL("image/png");
          const link: any = document.createElement("a");

          const dataUrl = await productApi.uploadImageBase64({ type: 4, image: img });

          if (img) {
            link.href = img;
            // alert(link.href);
          } else {
            // alert("Đang tải ảnh.");
            link.href = dataUrl;
          }

          link.download = `${id}.png`;

          document.body.appendChild(link);
          // document.body.appendChild(canvas);
          link.click();
          link.remove();

          style.remove();
        })
        .catch((err) => {
          console.error("Error taking screenshot:", err);
        });
    } else {
      console.error("Element to capture not found!");
    }

    // if (element) {
    //   html2canvas(element)
    //     .then((canvas) => {
    //       const img = canvas.toDataURL("image/png");
    //       const link: any = document.createElement("a");
    //       // link.href = URL.createObjectURL(base64ToBlob(canvas.toDataURL("image/png")));
    //       link.href = img;
    //       // link.href = img;

    //       link.download = `card.png`;

    //       document.body.appendChild(link);
    //       link.click();
    //       link.remove();
    //       style.remove();
    //     })
    //     .catch((err) => {
    //       console.error("Error taking screenshot:", err);
    //     });
    // } else {
    //   console.error("Element to capture not found!");
    // }
  };
  function MainView() {
    const searchParams = useSearchParams();
    const [id] = searchParams.getAll("id") || "";
    const [data, setData] = useState<any>(null);
    const { SVG } = useQRCode();

    console.log("idididididid", id);
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
        console.log("responseresponseresponse", response.data);
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
          <div className='flex shadow-lg rounded-lg justify-around      items-center    h-40'>
            <div className='w-[30%]  '>
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

              <div className='flex items-center'>
                <div className='flex'>
                  <div className=' mx-2 w-2 h-2 bg-black' />
                </div>

                {/* <span className=' font-light'>
    <span className='font-workSansBold'>{data?.delegation}</span>
  </span> */}

                <span className=' font-light'>
                  Đoàn: <span className=' font-workSansBold'>{data?.delegation} </span>
                </span>
              </div>

              <div className='flex items-center'>
                <div className='flex'>
                  <div className=' mx-2 w-2 h-2 bg-black' />
                </div>
                <span className=' font-light'>
                  Chức vụ: <span className='font-workSansBold'>{data?.position}</span>
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
          <img src='/bg.jpg' alt='Sample Image' className=' w-[400px] h-[600px]  rounded-[10px]' />

          {data?.avatar ? (
            <img
              src={data?.avatar}
              alt='Sample Image'
              className='w-[98px] h-[147px]  absolute top-[260px] left-[150.5px] '
            />
          ) : (
            <img
              src='/avatar.jpg'
              alt='Sample Image'
              className='w-[98px] h-[147px]  absolute top-[260px] left-[151px] '
            />
          )}

          <div className='flex flex-col self-center justify-start items-center absolute top-[365px] left-[150px]  w-[210px] '>
            <span className=' text-[#3760AE] uppercase  font-workSansBlack  text-[15px] text-center '>
              {/* {data?.full_name} */}
            </span>
            <span className='  uppercase text-[#3760AE]  font-workSansBold  self-center text-center text-[15px]'>
              {/* {data?.delegation} */}
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
          onClick={() => takeScreenshot(id, data.avatar, "captureId")}
        >
          Tải thẻ đại biểu
        </button>

        <div className=' w-[400px] h-[600px] flex items-center flex-col  relative' id='captureQr'>
          <img src='/bgQr.jpg' alt='Sample Image' className=' w-[400px] h-[600px]  rounded-[10px]' />

          <div className='absolute w-[70px] h-[70]  top-[320px] left-[253px]'>
            <SVG
              text={id ? id : "Không tìm thấy mã đại biểu"}
              options={{
                margin: 2,
                width: 80,
                color: {
                  dark: "#D32A2C",
                  light: "#FFFFFF00",
                },
              }}
            />
          </div>

          <div className='absolute w-[70px] h-[70]  top-[323px] left-[78px]'>
            <SVG
              text={id ? id : "Không tìm thấy mã đại biểu"}
              options={{
                margin: 2,
                width: 78,
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
          onClick={() => takeScreenshot(id, data.avatar, "captureQr")}
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

            <span className='  mt-5 px-8  font-workSansBold '>
              BAN TỔ CHỨC ĐẠI HỘI ĐẠI BIỂU MẶT TRẬN TỔ QUỐC VIỆT NAM THÀNH PHỐ HÀ NỘI LẦN THỨ XVIII NHIỆM KỲ 2024 - 2029
            </span>
          </div>

          <div className='px-4 py-3  uppercase  bg-[#1E6FA2]  mt-[2px] flex flex-col  text-center self-center w-full h-[20px] text-white  font-bold    '></div>
        </div>
      </Suspense>
    </div>
  );
}
