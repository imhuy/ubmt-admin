"use client";
import html2canvas from "html2canvas";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const [done, setDone] = useState(false);
  let load = false;
  useEffect(() => {
    takeScreenshot();
  }, [load]);

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

  const takeScreenshot = () => {
    const style = document.createElement("style");
    document.head.appendChild(style);
    style.sheet?.insertRule("body > div:last-child img { display: inline-block; }");
    const element = document.getElementById("capture");
    if (element) {
      html2canvas(element)
        .then((canvas) => {
          // const img = canvas.toDataURL("image/png");
          const link: any = document.createElement("a");
          link.href = URL.createObjectURL(base64ToBlob(canvas.toDataURL("image/png")));

          // window.open(link, "_blank");
          // link.href = img;

          // link.download = `card.png`;
          // console.log("linklinklink", img);
          // window.open(img);

          document.body.appendChild(link);
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
  };

  function Search() {
    const searchParams = useSearchParams();
    const [name] = searchParams.getAll("name") || "";
    const [delegate] = searchParams.getAll("delegate") || "";
    const [avatar] = searchParams.getAll("avatar") || "";

    return (
      <div className=' w-[400px] h-[600px] flex items-center flex-col bg-slate-500 relative' id='capture'>
        <img src='/anhnen.png' alt='Sample Image' className=' w-[400px] h-[600px]' />

        <img src={avatar} alt='Sample Image' className='w-[110px] h-[150px]  absolute top-[285px] left-[30px] ' />

        <div className='flex flex-col self-center justify-start items-center absolute top-[365px] left-[150px]  w-[210px] gap-y-2 '>
          <span className=' text-[#00428A] uppercase  font-black  text-[15px] '>{name}</span>
          <span className='  uppercase text-[#00428A] font-black  self-center text-center text-[15px]'>{delegate}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=' flex w-screen h-screen justify-center'>
        <Suspense>
          <Search />
        </Suspense>
      </div>
      <button
        className='px-4 py-2   text-center self-center text-blue-600  font-bold  w-full  rounded'
        onClick={takeScreenshot}
      >
        Lưu ảnh về máy
      </button>
    </>
  );
}
