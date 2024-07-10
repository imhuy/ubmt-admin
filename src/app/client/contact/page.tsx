"use client";
import { Contact2Icon } from "@/assets/images";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import CopyModal from "@/components/Modal/CopyModal";
import { Icon } from "@iconify/react";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const Rechange: NextPage<any> = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [title, setTitle] = useState("");
  const lstTop = [
    {
      name: "Bộ phận",
      description: "BÁN BUÔN",
      note: "Mua Số Lượng Lớn",
      className: "bg-white",
      image: "/images/home/ads.png",
    },
    {
      name: "Bộ phận",
      description: "CHẠY QUẢNG CÁO",
      note: "Phí Chỉ 3%",
      className: "bg-white",
      image: "/images/home/tools.png",
    },
    {
      name: "Bộ phận",
      description: "BẢO HÀNH",
      note: "Bảo Hành + Báo Lỗi",
      className: "bg-white",
      image: "/images/home/card.png",
    },
    {
      name: "Cộng đồng",
      description: "NHÓM ZALO",
      note: "Bảo Hành + Báo Lỗi, Chia sẻ kinh nghiệm",
      className: "bg-white",
      image: "/images/home/chat.png",
    },
    {
      name: "Cộng đồng",
      description: "NHÓM TELE",
      note: "Bảo Hành + Báo Lỗi, Chia sẻ kinh nghiệm",
      className: "bg-white",
      image: "/images/home/like.png",
    },
  ];

  return (
    <AppLayout>
      <div className="w-full h-screen flex flex-col mb-20">
        <div className="p-6">
          <Header />
          <div className="h-[1px] bg-black bg-opacity-20 my-4 max-lg:hidden" />
        </div>
        <div className="flex w-full justify-center  ">
          <div className=" grid grid-cols-3  w-[95%] max-sm:grid-cols-1 max-md:grid-cols-2 gap-8   leading-6  ">
            {lstTop.map((item, i) => (
              <div
                key={i}
                className={`flex  ${item.className}  flex-col  gap-y-3  items-center p-6 rounded-lg`}
              >
                <Image
                  src={Contact2Icon}
                  width={80}
                  height={80}
                  alt="home-bg"
                  className=" size-28 bg-white  rounded-full p-2 mr-2"
                />

                <p className=" font-workSansMedium">{item.name}</p>
                <p className=" font-workSansSemiBold  text-2xl text-green-800">
                  {item.description}
                </p>
                <p className="text-sm font-workSansMedium">{item.note}</p>

                <div className=" w-[100%] bg-blue-500 py-3 mt-2 rounded-md flex justify-center items-center gap-x-2  ">
                  <div className="   size-4">
                    <Icon color=" white" className="" icon="ri-phone-fill" />
                  </div>
                  <span className=" text-white  font-workSansSemiBold ">
                    {" "}
                    Gọi ngay
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <CopyModal
        title={title}
        isOpen={isOpenInfo}
        closeModal={() => setIsOpenInfo(false)}
      />
    </AppLayout>
  );
};

export default Rechange;
