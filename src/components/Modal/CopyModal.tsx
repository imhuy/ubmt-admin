import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FC, Fragment, useState } from "react";
import Spinner from "../Spinner";

interface IChangePasswordModal {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
}

const InfoModal: FC<IChangePasswordModal> = ({ isOpen, closeModal, title }) => {
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
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-xl  rounded-sm transform overflow-hidden rounded-ms bg-white p-6 text-left align-middle shadow-xl transition-all'>
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
                <div className='mt-8 flex flex-col gap-y-6'>
                  <p className=' text-base'>{`Đã sao chép ${title} thành công!`}</p>
                </div>

                <div className='mt-4 flex justify-center'>
                  <button
                    onClick={closeModal}
                    type='submit'
                    className='inline-flex ml-3 justify-center items-center rounded-md border border-transparent bg-success-500 hover:bg-success-600 px-4 py-2   font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    disabled={isLoading}
                  >
                    {isLoading ? <Spinner /> : <p>Ok</p>}
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
