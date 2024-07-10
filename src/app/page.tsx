import AppContent from "@/components/App";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import { NextPage } from "next";
export const metadata: Metadata = {
  title: "UBMT - Hệ thống quản trị App UBMT",
  description: "UBMT - Hệ thống quản trị App UBMT",
};

const Home: NextPage<any> = () => {
  const lstTop = [
    {
      name: "Tool Quản Lí Tài Khoản",
      description: "Quản Lí Tài Khoản , Đá Admin ẩn và nhiều chức năng khác  ",
      className: "bg-gradient-to-r from-[#DD96FA] to-[#9357FF]",
      image: "/images/home/ads.png",
    },
    {
      name: "Mini Tools",
      description: "Tool lọc text, lọc trùng, lọc UID Pass Cookie",
      className: "bg-gradient-to-r from-[#8964FB] to-[#4AC5E1]",
      image: "/images/home/tools.png",
    },
    {
      name: "Tạo phôi kháng",
      description: "Tool tạo phôi kháng XMDT VS 902 Tỷ lệ về cao",
      className: "bg-gradient-to-r from-[#F875B0] to-[#F24D66]",
      image: "/images/home/card.png",
    },
    {
      name: "Nhóm Chat Chung",
      description: "Chia sẻ, trao đổi kinh nghiệm chạy Ads",
      className: "bg-gradient-to-r from-[#C0F48B] to-[#3FBEC1]",
      image: "/images/home/chat.png",
    },
    {
      name: "Hệ Thống Like Sub",
      description: "Dịch vụ tăng like, tăng sub giá rẻ",
      className: "bg-gradient-to-r from-[#FEBA18] to-[#FF8355]",
      image: "/images/home/like.png",
    },
    {
      name: "Đăng Ký Cộng Tác Viên",
      description: "Chinh sách ưu đãi, hoa hồng cực lớn",
      className: "bg-gradient-to-r from-[#C983E8] to-[#57198A]",
      image: "/images/home/affiliate.png",
    },
  ];
  return (
    <AppLayout>
      <div className='w-full flex flex-col'>
        <div className='p-2  '>
          <Header />
          <div className='h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden' />

          <div className='  bg-[#CEF4FC] rounded-md '>
            <p className='flex  flex-row my-4  p-5 max-lg:p-1 text-[15px] text-[#06798F] font-workSansMedium text-center'>
              <InformationCircleIcon className='w-6 h-6  text-[#06798F]' />
              Hệ thống quản trị App UBMT
            </p>
          </div>

          <div className=' h-96 grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-8 text-white leading-6  '>
            {/* {lstTop.map((item, i) => (
              <div key={i} className={`flex  ${item.className}    items-center p-6 rounded-lg`}>
                <Image
                  priority={true}
                  src={item.image}
                  width={80}
                  height={80}
                  alt='home-bg'
                  className='h-16 bg-white   rounded-md p-2 w-16 mr-2'
                />
                <div className='p-2'>
                  <p className=' font-workSansSemiBold'>{item.name}</p>
                  <p className='text-sm'>{item.description}</p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
        <AppContent />
      </div>
    </AppLayout>
  );
};

export default Home;
