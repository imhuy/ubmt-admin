"use client";
import ApiAuth from "@/api-client/auth";
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
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

const Login: NextPage<any> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogged, authState } = useContext(AuthContext);
  const authApi = new ApiAuth();

  const router = useRouter();

  useEffect(() => {
    if (authState) {
      router.push("/");
    } else {
      console.log("not logined");
    }
  }, [authState]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      let resLogin = await authApi.login({ username: data.username, password: data.password });
      if (resLogin.code == 999) {
        toast.error(resLogin.message, { autoClose: 4000 });
        setIsLoading(false);
        return;
      }

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
          <Header title='Login' />
          <div className='h-[1px] bg-black   bg-opacity-20 my-4 max-lg:hidden' />
        </div>
        <div className=' flex    bg-[#E9F2FD] items-center   justify-center'>
          <div className='w-[580px] shadow-2xl rounded-lg bg-white mt-4  max-md:bg-transparent max-md:p-6 max-lg:p-8 p-10 z-[100]'>
            <h1 className='font-workSansSemiBold text-[32px]'>Log in</h1>

            <BMForm defaultValues={{}} onSubmit={onSubmit} validationSchemaParams={loginValidationSchema}>
              <BMInput
                name='username'
                labelText='Tên đăng nhập'
                placeholder='Enter username'
                containerClassName='mt-4 '
              />
              <BMInput
                name='password'
                labelText='Mật khẩu'
                type='password'
                placeholder='Enter password'
                containerClassName='mt-4'
              />

              <button
                type='submit'
                className={`w-full mb-6 ${
                  isLoading ? "opacity-70" : "opacity-100"
                } flex justify-center items-center py-3 mt-5 bg-success-500`}
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : null}
                <p>Đăng Nhập</p>
              </button>
            </BMForm>

            <div className='w-[100%] flex  gap-x-2 text-sm justify-center  mb-2 '>
              <p>Chưa có tài khoản?</p>

              <p className=' text-blue-500 font-workSansSemiBold'>
                {" "}
                <a href='/client/register'> Đăng ký tài khoản</a>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Login;
