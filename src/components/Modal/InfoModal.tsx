import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FC, Fragment, useState } from "react";
import Spinner from "../Spinner";
import { ItemType } from "../App";

interface IBuyModal {
  isOpen: boolean;
  closeModal: () => void;
  data: ItemType;
}

const InfoModal: FC<IBuyModal> = ({ isOpen, closeModal, data }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full  items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-xl   rounded-sm transform overflow-hidden rounded-ms bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title as='h3' className='text-2xl font-workSansBold leading-6 text-success-500'>
                  <div>
                    <p>Thông tin chi tiết</p>
                    <button
                      className='h-10 w-10   absolute top-3 right-2 flex justify-center items-center hover:text-success-500 hover:border-success-500 duration-100 transition-all'
                      onClick={closeModal}
                    >
                      <XMarkIcon className='h-7 w-7' />
                    </button>
                  </div>
                </Dialog.Title>
                <div className='mt-8    max-h-[60vh]   overflow-auto flex flex-col gap-y-6'>
                  <p className=' text-base'>{data.description_detail}</p>
                  <p className=' text-base'>
                    BM1 limit 250$ có một tài khoản quảng cáo, giới hạn 5 tài khoản trong BM sau khi chạy
                  </p>
                  <p className=' text-base'>
                    Bảo hành trong 24h (lỗi link, die bm khi chưa sử dụng, tụt ngưỡng), 4 tài khoản sau tạo múi giờ tiền
                    tệ theo mong muốn.
                  </p>{" "}
                  <p className=' text-base'>Không bảo hành với trường hợp add thẻ, tạo tài khoản quảng cáo.</p>
                  <p className=' text-base'>BM1 limit 250$ has an ad account, limit 5 accounts in BM after running</p>
                  <p className=' text-base'>
                    Warranty for 24 hours (link error, die bm when not in use, lower spending limit), The following 4
                    accounts create the desired currency time zone
                  </p>
                  <p className=' text-base'>No warranty in case of adding a card, creating an ad account.</p>
                  <p className=' text-base'>No warranty in case of adding a card, creating an ad account.</p>
                  <p className=' text-base'>No warranty in case of adding a card, creating an ad account.</p>
                  <p className=' text-base'>No warranty in case of adding a card, creating an ad account.</p>
                  <p className=' text-base'>No warranty in case of adding a card, creating an ad account.</p>
                  <p className=' text-base'>No warranty in case of adding a card, creating an ad account.</p>
                  <p className=' text-base'>No warranty in case of adding a card, creating an ad account.</p>
                  <p className=' text-base'>No warranty in case of adding a card, creating an ad account.</p>
                  <p className=' text-base'>No warranty in case of adding a card, creating an ad account.</p>
                </div>

                <div className='mt-4 flex justify-end'>
                  <button
                    onClick={closeModal}
                    type='submit'
                    className='inline-flex ml-3 justify-center items-center rounded-md border border-transparent bg-success-500 hover:bg-success-600 px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : <p>Đóng</p>}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InfoModal;
