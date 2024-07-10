"use client";
import { IconVn, TickCircle, UnCheckIcon } from "@/assets/icon";
import convertNumbThousand from "@/utils/convertNumbThousand";
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { FC, useContext, useState } from "react";
import BuyModal from "../Modal/BuyModal";
import InfoModal from "../Modal/InfoModal";
import { FacebookIcon } from "@/assets/images";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/api-client";
import { AuthContext } from "@/context/useAuthContext";
import { useRouter } from "next/navigation";
interface AppContentTypes {
  listItemsProps?: any[];
  totalCountProps?: string;
  tab?: "watchlist" | "trending" | "newest" | string;
}

export interface ItemType {
  id: number;
  name: string;
  type: number;
  icon?: JSX.Element;
  nation: string;
  date: string;
  friend: string;
  checkpoint: string;
  inventory: number;
  price: number;
  categories_id: number;
  sold: number;
  description_detail: string;
  price_original: number;
}

const AppContent: FC<AppContentTypes> = () => {
  const [isOpenBuyModal, setIsOpenBuyModal] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [dataBuy, setDataBuy] = useState<ItemType>({} as ItemType);
  const { handleLogged, authState } = useContext(AuthContext);
  const router = useRouter();

  const buyModal = (item: ItemType) => {
    if (authState) {
      console.log("not logined");
    } else {
      router.push("/client/login");
    }
    setDataBuy(item);
    setIsOpenBuyModal(true);
  };

  const infoModal = (item: ItemType) => {
    setDataBuy(item);
    setIsOpenInfo(true);
  };

  const { isPending, error, data } = useQuery<ItemType[]>({
    queryKey: ["getAllProduct"],
    queryFn: async () => await productApi.allProduct(authState?.access_token ?? ""),
  });

  const IconCountry = (country: string) => {
    switch (country) {
      case "VN":
        return IconVn;
      default:
        return UnCheckIcon;
    }
  };

  const FooterMenu = () => {
    return (
      <div className='flex font-workSansMedium  flex-col bg-white justify-center mt-10 mb-5 rounded-md shadow-xl w-full'>
        <div className='flex   max-sm:flex-col max-md:flex-col   justify-center   gap-y-5   w-[94%] px-2  border-b-2  pb-5    mt-5'>
          <div className='flex flex-col max-sm:border-b-2 pb-2   min-w-[40%]'>
            <h5 className=' font-workSansSemiBold   ml-1 text-xl'>HỆ THỐNG CHÚNG TÔI</h5>
            <div className='flex flex-col gap-y-3 mt-4 ml-2 '>
              <div className=' flex  items-center gap-x-2 '>
                <div className=' size-8 bg-[#FEEAF3] rounded-full flex justify-center items-center'>
                  <Icon color='#f25062' icon='ri-facebook-circle-fill' />
                </div>
                <span className='text-sm'>
                  Hệ thống <span className=' font-workSansSemiBold'> Quản trị</span>
                </span>
              </div>

              <div className=' flex  items-center gap-x-2 '>
                <div className=' size-8 bg-[#FEEAF3] rounded-full flex justify-center items-center'>
                  <Icon color='#f25062' icon='ri-profile-fill' />
                </div>
                <span className='text-sm'>Hệ thống đăng bài</span>
              </div>
              <div className=' flex  items-center gap-x-2 '>
                <div className=' size-8 bg-[#FEEAF3] rounded-full flex justify-center items-center'>
                  <Icon color='#f25062' icon='ri-shield-check-fill' />
                </div>
                <span className='text-sm'>Hệ thống tạo sự kiện</span>
              </div>
            </div>
          </div>

          <div className='flex flex-col max-sm:border-b-2 pb-2  min-w-[25%]'>
            <h5 className=' font-workSansSemiBold   ml-1 text-xl'>HƯỚNG DẪN</h5>
            <div className='flex flex-col gap-y-3 mt-4 ml-2 '>
              <div className=' flex  items-center gap-x-2 '>
                <div className=' size-8 bg-[#FEEAF3] rounded-full flex justify-center items-center'>
                  <Icon color='#f25062' icon='ri-money-dollar-circle-fill' />
                </div>
                <span className='text-sm'>Thanh toán</span>
              </div>
              <div className=' flex  items-center gap-x-2 '>
                <div className=' size-8 bg-[#FEEAF3] rounded-full flex justify-center items-center'>
                  <Icon color='#f25062' icon='ri-shield-keyhole-fill' />
                </div>
                <span className='text-sm'>Bảo mật tài khoản</span>
              </div>
              <div className=' flex  items-center gap-x-2 '>
                <div className=' size-8 bg-[#FEEAF3] rounded-full flex justify-center items-center'>
                  <Icon color='#f25062' icon='ri-medal-fill' />
                </div>
                <span className='text-sm'>Chính sách bảo hành</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col  pb-2  min-w-[33%]'>
            <h5 className=' font-workSansSemiBold  text-xl'>LIÊN HỆ</h5>
            <div className='flex flex-col gap-y-3 mt-4 ml-2 '>
              <div className=' flex  items-center gap-x-2 '>
                <div className=' size-8 bg-[#FEEAF3] rounded-full flex justify-center items-center'>
                  <Icon color='#f25062' icon='ri-map-pin-fill' />
                </div>
                <span className='text-sm'>Địa Chỉ: Hà Nội</span>
              </div>
              <div className=' flex  items-center gap-x-2 '>
                <div className=' size-8 bg-[#FEEAF3] rounded-full flex justify-center items-center'>
                  <Icon color='#f25062' icon='ri-phone-fill' />
                </div>
                <span className='text-sm'>Phone: 085.420.8888</span>
              </div>
              <div className=' flex  items-center gap-x-2 '>
                <div className=' size-8 bg-[#FEEAF3] rounded-full flex justify-center items-center'>
                  <Icon color='#f25062' icon='ri-mail-fill' />
                </div>
                <span className='text-sm'>Email: ceo@asiamartech.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex   max-sm:flex-col max-md:flex-col justify-center    text-sm   w-[96%] px-2  '>
          <div className='flex flex-col max-sm:border-b-2  py-2  min-w-[40%]'>
            <h5 className='  uppercase  '>Copyright © asiamartech</h5>
          </div>
          <div className='flex flex-col  py-2 min-w-[25%]'>
            <h5 className=''>
              <span className='text-red-500 font-workSansSemiBold'>Điều khoản </span> &{" "}
              <span className='text-red-500 font-workSansSemiBold'>Bảo mật </span>
            </h5>
          </div>
          <div className='flex flex-col gap-y-3 min-w-[33%]'></div>
        </div>
      </div>
    );
  };

  const HomeHeading: React.FC<{ title: string }> = ({ title }) => {
    return (
      <div className=' font-workSansSemiBold bg-gradient-to-r flex  py-3   rounded-md text-white from-[#F25FA2] to-[#3279E1] text-xl my-4 pl-3'>
        <Image src={FacebookIcon} width={30} height={30} alt='home-bg' className=' size-7 mr-4   ' />
        <span> {title}</span>
      </div>
    );
  };

  const ListItem: React.FC<{ title: string }> = ({ title }) => {
    return (
      <div className=' font-workSansSemiBold bg-gradient-to-r flex  py-3   rounded-md text-white from-[#F25FA2] to-[#3279E1] text-xl my-4 pl-3'>
        <Image src={FacebookIcon} width={30} height={30} alt='home-bg' className=' size-7 mr-4   ' />
        <span> {title}</span>
      </div>
    );
  };

  return (
    <div className='w-full relative '>
      <div className=' flex flex-col w-full px-2 gap-x-8'>
        <FooterMenu />
      </div>
      {isOpenBuyModal && (
        <BuyModal data={dataBuy} isOpen={isOpenBuyModal} closeModal={() => setIsOpenBuyModal(false)} />
      )}
      {isOpenInfo && <InfoModal data={dataBuy} isOpen={isOpenInfo} closeModal={() => setIsOpenInfo(false)} />}
    </div>
  );
};

export default AppContent;
