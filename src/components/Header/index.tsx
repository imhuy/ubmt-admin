"use client";
import { AuthContext } from "@/context/useAuthContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Bars3Icon, FolderIcon, HeartIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter, usePathname } from "next/navigation";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import Avatar from "../Avatar";

interface IHeader {
  title?: string;
}

type SideMenuMobile = {
  icon?: JSX.Element;
  label: string;
  href: string;
  isChildren?: boolean;
  isParent?: boolean;
};

const Header: FC<IHeader> = ({ title }) => {
  const [searchString, setSearchString] = useState("");
  const router = useRouter();
  let searchRef: React.MutableRefObject<any> = useRef();
  const [openSeachMobile, setOpenSearchMobile] = useState(false);

  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const pathname = usePathname();
  const { authState } = useContext(AuthContext);

  const renderTitle = () => {
    if (pathname === "/alpha-hunters/mentioned") return "Projects Mentioned by Top Alpha Hunters";
    if (pathname.indexOf("client/recharge") !== -1) return "Nạp Tiền";
    if (pathname.indexOf("client/profile") !== -1) return "Thông tin cá nhân";
    if (pathname.indexOf("/order/history") !== -1) return "Lịch sử giao dịch";
    if (pathname.indexOf("client/contact") !== -1) return "Liên hệ";
    if (title) return title;
    return "Home";
  };

  const sideMenuMobile: SideMenuMobile[] = [
    {
      label: "Mua tài khoản",
      icon: <HeartIcon className='h-6 w-6' />,
      href: "/",
    },

    {
      label: "Tài khoản",
      icon: <FolderIcon className='h-6 w-6' />,
      href: "",
      isParent: true,
    },
    {
      label: "Nạp tiền",
      href: "/client/recharge",
      isChildren: true,
    },
    {
      label: "Thông tin cá nhân",
      href: "/client/profile",
      isChildren: true,
    },
    {
      label: "Lịch sử giao dịch",
      href: "/order/history",
      isChildren: true,
    },
    {
      label: "Công cụ",
      icon: <FolderIcon className='h-6 w-6' />,
      href: "",
      isParent: true,
    },
    {
      label: "Tut miễn phí",
      href: "https://2fa.live/",
      isChildren: true,
    },
    {
      label: "Tạo phôi XMDT",
      href: "https://2fa.live/",
      isChildren: true,
    },
    {
      label: "Tool 2fa  ",
      href: "https://2fa.live/",
      isChildren: true,
    },
  ];

  return (
    <div className='flex  justify-between  items-center w-full'>
      <div>
        <h1 className='font-workSansSemiBold text-[36px] max-lg:hidden'>{renderTitle()}</h1>
        <div className='hidden max-lg:block'>
          <div className='flex gap-2 items-center'>
            <Bars3Icon className='h-6 w-6' color='black' onClick={() => setOpenMenuMobile(true)} />
            <h1 className=' font-workSansBold  text-center'>BM2FA </h1>
          </div>
          {openMenuMobile && (
            <div className='fixed h-screen  bg-white z-[1000] top-0 left-0 w-full flex flex-col gap-4 px-6 pt-6'>
              <XMarkIcon className='h-7 w-7 transition-all duration-300' onClick={() => setOpenMenuMobile(false)} />
              <div className='flex flex-col'>
                {sideMenuMobile?.map((sideItem: SideMenuMobile, i: number) => (
                  <a
                    key={i}
                    className={`${
                      sideItem?.isChildren ? "py-4 ml-14" : "flex gap-4 items-center p-4"
                    } mr-4 border-b border-gray-800 ${!sideItem.isParent ? " hover:bg-success-500" : ""}`}
                    href={sideItem?.href}
                  >
                    <button
                      onClick={() => {
                        setOpenMenuMobile(false);
                      }}
                      className=' flex gap-x-4'
                    >
                      {sideItem?.icon}
                      <span className=' font-workSansSemiBold'>{sideItem?.label}</span>
                    </button>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-center items-center'>
        <div className='relative mr-6 max-lg:mr-2 ml-4 max-lg:hidden' ref={searchRef}>
          <MagnifyingGlassIcon className='w-5 h-5 max-lg:w-4 max-lg:h-4  absolute max-lg:top-[6px] top-[11px] left-[5px]' />

          <input
            className='w-52 max-lg:w-32 max-lg:py-1   py-2 pl-8 max-lg:pl-7 max-lg:text-sm '
            placeholder='Search'
            value={searchString}
            onChange={(e) => {
              setSearchString(e?.target?.value);
            }}
          />
        </div>
        <div className='hidden max-lg:block'>
          {openSeachMobile ? (
            <div className='fixed h-screen bg-white  z-[1000] top-0 left-0 w-full flex flex-col gap-4 px-6 pt-6'>
              <XMarkIcon className='h-7 w-7 transition-all duration-300' onClick={() => setOpenSearchMobile(false)} />
              <div className='relative max-lg:overflow-auto' ref={searchRef}>
                <MagnifyingGlassIcon className='w-5 h-5 text-white absolute top-2 left-[5px]' />
                <input
                  className='w-full bg-white py-2 pl-8 text-sm'
                  placeholder='Search'
                  value={searchString}
                  onChange={(e) => {
                    setSearchString(e?.target?.value);
                  }}
                  // onKeyPress={(event) => {
                  //   if (event.key === "Enter" && event.currentTarget.value) {
                  //     setKeyword(event.currentTarget.value ?? "");
                  //     router.push("/search?keyword=" + event.currentTarget.value);
                  //   }
                  // }}
                />
              </div>
            </div>
          ) : (
            <MagnifyingGlassIcon
              className='w-6 h-6  max-lg:mr-3'
              onClick={() => {
                setSearchString("");
                setOpenSearchMobile(true);
              }}
            />
          )}
        </div>
        {/* 
        <button id="search-btn">
          <MagnifyingGlassIcon className="w-5 h-5 text-white hidden max-lg:block" />
        </button> */}
        {authState ? (
          <Avatar isShowRole />
        ) : (
          <div className='flex'>
            <div className='  max-lg:mx-0'>
              <a href='/client/login'>
                <button className='py-2 px-4  border  text-sm  font-workSansSemiBold border-[#00e3b4]   '>Login</button>
              </a>
            </div>
            <div className='max-lg:mx-0'>
              <a href='/client/register'>
                <button
                  // onClick={onGoSignup}
                  className='py-2 px-4  font-workSansSemiBold text-sm  '
                >
                  Sign up
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
