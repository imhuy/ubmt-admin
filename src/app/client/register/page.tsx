"use client";
import { authApi } from "@/api-client";
import BMForm from "@/components/BMForm";
import BMInput from "@/components/BMForm/BMInput";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/context/useAuthContext";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import * as yup from "yup";

const loginValidationSchema = yup.object({
  username: yup.string().required("Vui lòng nhập tên đăng nhập"),
  email: yup.string().required("Vui lòng nhập email"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
  repassword: yup.string().required("Vui lòng nhập lại mật khẩu"),
});

const Login: NextPage<any> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogged, authState } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (authState) {
      router.push("/client/profile");
    } else {
      console.log("not logined");
    }
  }, [authState]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      let resR = await authApi.signUp({
        username: data.username,
        password: data.password,
        password_again: data.repassword,
        email: data.email,
        phone_number: data.phone,
      });

      if (resR.code == 999) {
        toast.error(resR.message, { autoClose: 4000 });
        setIsLoading(false);
        return;
      }
      toast.success(resR.message, { autoClose: 4000 });
      let resLogin = await authApi.login({
        username: data.username,
        password: data.password,
      });
      router.push("/client/profile");
      handleLogged(resLogin.data);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(`${error?.response?.data?.error_description ?? error?.message}`, {});
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className=' w-[100vw] h-screen flex flex-col'>
        <div className='p-6'>
          <Header title='Đăng ký' />
          <div className='h-[1px] bg-black   bg-opacity-20  max-lg:hidden' />
        </div>
        <div className=' flex    bg-[#E9F2FD] items-center  justify-center'>
          <div className='w-[580px] rounded-lg  shadow-2xl bg-white max-md:bg-transparent max-md:p-6 max-lg:p-8 px-8 py-4 z-[100]'>
            <h1 className='font-workSansSemiBold text-[32px]'>Đăng ký tài khoản</h1>

            <BMForm defaultValues={{}} onSubmit={onSubmit} validationSchemaParams={loginValidationSchema}>
              <BMInput
                name='username'
                labelText='Tên đăng nhập'
                placeholder='Enter username'
                containerClassName='mt-4 '
              />
              <BMInput
                name='email'
                labelText='Địa chỉ email'
                placeholder='Nhập địa chỉ email'
                containerClassName='mt-4'
              />

              <BMInput
                name='phone'
                labelText='Số điện thoại'
                placeholder='Nhập số điện thoại'
                containerClassName='mt-4'
              />

              <BMInput
                name='password'
                labelText='Mật khẩu'
                type='password'
                placeholder='Nhập mật khẩu'
                containerClassName='mt-4 flex items-center  '
              />
              <BMInput
                name='repassword'
                labelText='Nhập lại mật khẩu'
                type='password'
                placeholder='Nhập lại mật khẩu'
                containerClassName='mt-4 flex items-center  '
              />

              <button
                type='submit'
                className={`w-full mb-6 ${
                  isLoading ? "opacity-70" : "opacity-100"
                } flex justify-center items-center py-3 mt-5 bg-success-500`}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : null}
                <p>Đăng Ký</p>
              </button>
            </BMForm>

            <div className='w-[100%] flex  gap-x-2 text-sm justify-center  mb-2 '>
              <p>Đã có tài khoản?</p>

              <p className=' text-blue-500 font-workSansSemiBold'>
                {" "}
                <a href='/client/login'> Đăng nhập</a>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
