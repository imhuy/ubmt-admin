"use client";
import html2canvas from "html2canvas";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  const takeScreenshot = () => {
    const style = document.createElement("style");
    document.head.appendChild(style);
    style.sheet?.insertRule("body > div:last-child img { display: inline-block; }");
    const element = document.getElementById("capture");
    if (element) {
      html2canvas(element)
        .then((canvas) => {
          const img = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = img;
          console.log("link.hreflink.hreflink.href", link.href);
          link.download = `card.png`;
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
