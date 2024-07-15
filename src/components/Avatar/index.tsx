"use client";
import { AvatarIcon, DollarIcon } from "@/assets/icon";
import { AuthContext } from "@/context/useAuthContext";
import convertNumbThousand from "@/utils/convertNumbThousand";

import Image from "next/image";
import { FC, useContext } from "react";

interface Props {
  isShowRole?: boolean;
}

const Avatar: FC<Props> = ({ isShowRole = false }) => {
  const { accountExtendDetail } = useContext(AuthContext);
  return (
    <a href='/client/profile' className='cursor-pointer flex flex-col ml-4 w-full justify-center'>
      <div className='flex '>
        <div className='flex  w-full   gap-2 '>
          <div className='flex border border-red-500 size-11 items-center justify-center bg-white rounded-full  '>
            <Image src={AvatarIcon} className=' size-7' alt='avatar'></Image>
          </div>

          <div className='flex flex-col justify-center items-start  ml-1  '>
            <div className='flex'>
              <span className=' font-workSansSemiBold'>{accountExtendDetail?.full_name}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Avatar;
