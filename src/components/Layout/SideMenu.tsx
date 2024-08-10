"use client";
import { LoginIcon } from "@/assets/icon";
import { AdsIcon, ContactIcon, FacebookIcon, ProfileIcon, TicketIcon } from "@/assets/images";
import { AuthContext } from "@/context/useAuthContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import Avatar from "../Avatar";

interface MenuItemType {
  key: string;
  icon: any;
  label: string;
  active: boolean;
}

const SideMenu = () => {
  let pathname = usePathname();
  const { authState } = useContext(AuthContext);
  const [listMenu] = useState<MenuItemType[]>([
    {
      key: "",
      icon: ProfileIcon,
      label: "Trang chủ ",
      active: false,
    },
  ]);

  const [listMenu2] = useState<MenuItemType[]>([
    {
      key: "client/post-news",
      icon: ProfileIcon,
      label: "Đăng bài",
      active: false,
    },

    {
      key: "client/create-delegate",
      icon: ProfileIcon,
      label: "Tạo và thêm thông tin đại biểu",
      active: false,
    },

    {
      key: "client/list-delegate",
      icon: ProfileIcon,
      label: "Danh sách đại biểu",
      active: false,
    },

    {
      key: "client/checkin/select",
      icon: ProfileIcon,
      label: "Checkin",
      active: false,
    },

    {
      key: "client/list-news",
      icon: ProfileIcon,
      label: "Danh sách bài viết",
      active: false,
    },
    // {
    //   key: "client/update-delegate",
    //   icon: ProfileIcon,
    //   label: "Cập nhật thông tin ",
    //   active: false,
    // },

    {
      key: "client/list-delegation",
      icon: ProfileIcon,
      label: "Danh sách đoàn đại biểu",
      active: false,
    },

    {
      key: "client/list-docs",
      icon: ProfileIcon,
      label: "Danh sách tài liệu",
      active: false,
    },
    {
      key: "client/profile",
      icon: ProfileIcon,
      label: "Thông tin cá nhân",
      active: false,
    },

    {
      key: "client/push-notification",
      icon: ProfileIcon,
      label: "Gửi thông báo",
      active: false,
    },

    {
      key: "client/upload-document",
      icon: ProfileIcon,
      label: "Upload tài liệu",
      active: false,
    },
  ]);

  const [listMenu4] = useState<MenuItemType[]>([]);

  const _checkActiveTab = (item: MenuItemType, index?: number) => {
    if (`${pathname}` === `/${item.key}`) return true;
    return false;
  };

  return (
    <aside className='fixed transition-all bg-white  overflow-auto  duration-300 top-0 left-0 z-40 w-80 h-screen border-r border-black  border-opacity-10  py-6 max-lg:hidden'>
      <ul className='w-full    '>
        <li className='mb-4 border-b border-black border-opacity-10'>
          <div className='flex mb-4'>
            {authState ? (
              <Avatar />
            ) : (
              <a href='/client/login' className='flex w-full justify-center text-white '>
                <div
                  className='flex w-[90%] rounded-full items-center  justify-around    font-workSansSemiBold text-md
                   bg-gradient-to-r  from-[#FF5E6A] to-[#FF8C50] h-12'
                >
                  <Image src={LoginIcon} className=' size-6' alt='avatar'></Image>
                  <span>Đăng nhập</span>
                  <span></span>
                </div>
              </a>
            )}
          </div>
        </li>
        <div className=' border-b border-black border-opacity-10'>
          <p className='px-[10px] pl-5  font-workSansSemiBold text-sm text-gray-600 '>Hệ thống</p>
          {listMenu.map((value, index) => {
            return (
              <li className='mt-1 text-[15px] ' key={value.key}>
                <div
                  className={`p-[10px] pl-5     border-l-4   transition-all duration-300 ${
                    _checkActiveTab(value) ? "bg-select-500 border-select-700" : ""
                  } w-full`}
                >
                  <Link
                    href={`/${value.key}`}
                    className={`flex transition-all  items-center  hover:font-workSansSemiBold  hover:px-2  ${
                      _checkActiveTab(value) ? "text-select-700" : ""
                    }    duration-300 ${
                      pathname === value.key
                        ? "text-dark-900 font-workSansSemiBold"
                        : "  font-workSansMedium text-dark-900"
                    }`}
                  >
                    <Image src={value.icon} width={30} height={30} alt='home-bg' className=' size-7 mr-4   ' />
                    {/* {value.icon} */}
                    {value.label}
                  </Link>
                </div>
              </li>
            );
          })}
        </div>
        {authState && (
          <div className=' border-b border-black border-opacity-10'>
            <p className='px-[10px] pl-5 mt-4 font-workSansSemiBold text-md  text-gray-600 '>Tài khoản</p>
            {listMenu2.map((value, index) => {
              return (
                <li className='mt-1  text-[15px] ' key={value.key}>
                  <div
                    className={`p-[10px] pl-5    border-l-4   transition-all duration-300  ${
                      _checkActiveTab(value) ? "bg-select-500 border-select-700" : ""
                    } w-full`}
                  >
                    <Link
                      href={`/${value.key}`}
                      className={`flex transition-all  items-center  hover:font-workSansSemiBold  hover:px-2  ${
                        _checkActiveTab(value) ? "text-select-700" : ""
                      }   duration-300 ${
                        pathname === value.key
                          ? "text-dark-900 font-workSansSemiBold"
                          : "  font-workSansMedium text-dark-900"
                      }`}
                    >
                      <Image src={value.icon} width={30} height={30} alt='home-bg' className=' size-7 mr-4   ' />
                      {/* {value.icon} */}
                      {value.label}
                    </Link>
                  </div>
                </li>
              );
            })}
          </div>
        )}

        <div className='   border-black border-opacity-10'>
          <p className='px-[10px] pl-5 mt-4 font-workSansSemiBold text-md  text-gray-600 '>Liên hệ</p>
          {listMenu4.map((value, index) => {
            return (
              <li className='mt-1  text-[15px] ' key={value.key}>
                <div
                  className={`p-[10px] pl-5    border-l-4   transition-all duration-300  ${
                    _checkActiveTab(value) ? "bg-select-500 border-select-700" : ""
                  } w-full`}
                >
                  <Link
                    href={`/${value.key}`}
                    className={`flex transition-all  items-center  hover:font-workSansSemiBold  hover:px-2  ${
                      _checkActiveTab(value) ? "text-select-700" : ""
                    }   duration-300 ${
                      pathname === value.key
                        ? "text-dark-900 font-workSansSemiBold"
                        : "  font-workSansMedium text-dark-900"
                    }`}
                  >
                    <Image src={value.icon} width={30} height={30} alt='home-bg' className=' size-7 mr-4   ' />
                    {/* {value.icon} */}
                    {value.label}
                  </Link>
                </div>
              </li>
            );
          })}
        </div>
      </ul>
      {/* <div className="absolute  bg-white left-0 bottom-0 border-t border-black border-opacity-10 w-full px-6 pt-4 pb-6">
        <ul>
          <li className="mt-2">
            <Link href={"https://twitter.com/"} target="_blank">
              Twitter
            </Link>
          </li>

          <li className="mt-2">
            <Link href={"https://t.me/imhuy"} target="_blank">
              Support
            </Link>
          </li>
          <li className="mt-2">
            <Link href={"https://discord.gg/"} target="_blank">
              Discord
            </Link>
          </li>
        </ul>
      </div> */}
    </aside>
  );
};

export default SideMenu;
