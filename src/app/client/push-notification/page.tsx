"use client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";

import { productApi } from "@/api-client";
import { NextPage } from "next";
import { FormEvent, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
const axios = require("axios");

const Push: NextPage<any> = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checkValue, setCheckValue] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedItem, setSelectedItem] = useState<any>("");
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckValue(isChecked);
    if (isChecked) {
      // Call your processing function here
      console.log("Checkbox is checked");
      // Add your processing code here
    } else {
      console.log("Checkbox is unchecked");
    }
  };

  const sendPush = async () => {
    let data = JSON.stringify({
      message: {
        topic: "test",
        android: {
          priority: "high",
        },
        notification: {
          title: title,
          body: description,
        },
        data: {
          screen: "NotificationPush",
          message: title,
        },
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://fcm.googleapis.com/v1/projects/pushnotifi-52af9/messages:send",
      headers: {
        Authorization:
          "Bearer ya29.c.c0ASRK0GYLavzHJbvT5dNuQinW699YqsGLNVVuGK6nNNjynd6WOc5Pfs_4JMHMR9BRbX8XC6CnQKNLbrY2SJ2YTAQt7QQUWEKmIJ46OUu9lWHNZaKd81GtVxwtnCzIK4tBbXThfYeW6vFX1ui_QGOuTEMxHKNDeup-LnFmzmJ91-tKIUuCIfFDl0LB7cUfNWwA8qZwgy4M2pyJaJo-FLsbY_FFVzyO6_NwEMG96iDR79UsF7wN9ihfpjERcffcqTepcqS5etYRkyDGERI44NcRRWrlxXtI-cdEh6e8cDb6OxSrdBu_BVNQSFAS4G98UIkZ_kbbWZpZvhAtZ6dwRJmCaJjnuT3txSIljRsj4-8Snki2c_f8abL8fDhbbAN387Au33_d5xoiQ8Ze_uVhyO8QfgrnxzI6R618JIW4SXQa1ka95csyrfb5iUw0ujxztjBdVXJxxXtotl7t9Ss55jxwYqmwfh7U_-vY0d5Qk3cowoR6ywdxz-3gnsvZ9agXoZ-7g0t3uezheiafOMjSOJnvUSwxd5Jzb6MYcJIZIIvRzk5ObIY921Me0BYpgo_Z7_4oxinRFg1Ijoa0IF2jf7Jrn2Vli1nQv-4j_8M0lfs0dWovnacr8QqfwQt4xq8B8i00Bkx5c-ul3-0lvWnIvBBayipm6jMjuMQ24a0sal5I94kt6IudtOxS5Ih1QBuxynufwya1FVJFWZbBuwtq82c-W2atir2osS0IkfdzVFoywgu6y38ZhZVYhVb38Wp77uZnrrkvM6ike9jwVOMO-4du1fbSXtvnwJejimW4Y78Rdk4Q6pf0m1J0YoMnFkriejedj4s7mXqkyk12Uvuwha1xs58QXnVfzfxqp2OkZOe0SfkhnFxzFZhnkkJjbfv1_ZBRW_aaWqxMgwr2nv4oVOe2xJ3h9kkpjwud-4_MYzcR8f8Fpso0xwko1x8Z-2p4zq9nFmlmh013Sy7-R_q5xSyjfZ14RBruw659vdj-jaugXrUwaevxMW7tqXU",
        "Content-Type": "application/json",
      },
      data: data,
    };

    let send = await axios.request(config);
    console.log("sendsend", send);
  };

  const formValidate = () => {
    if (!title) {
      toast.error("Vui lòng nhập tiêu đề", { autoClose: 4000 });
      return false;
    }

    if (!description) {
      toast.error("Vui lòng nhập tiêu đề", { autoClose: 4000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValidate()) return;

    const postForm: any = {
      title: title,
      content: content,
      image: "1",
      cat_id: 5,
      hashtag: [],
      day: "1",
      short_description: description,
    };

    try {
      const data = await productApi.postNews(postForm);
      if (data.code === 0) {
        setTitle("");
        setContent("");
        setDescription("");

        setSelectedItem(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        if (checkValue) {
          sendPush();
        }
        // sendPush();
        toast.success("Đăng bài thành công", { autoClose: 4000 });
      } else {
        toast.error("Xảy ra lỗi vui lòng thử lại", { autoClose: 4000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <div className='w-full bg-white  h-screen flex flex-col'>
        <div className='p-6'>
          <Header title='Đăng bài viết' />
          <div className='h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden' />
          <div className=' h-lvh    rounded-xl '>
            <div className='flex flex-col justify-between   '>
              <p className=' font-workSansMedium text-lg'>Tiêu đề thông báo</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-[80%] border h-12 rounded-md px-2 mt-2'
                placeholder={"Tiêu đề thông báo"}
              ></input>
            </div>

            <div className='flex flex-col justify-between  mt-4  '>
              <p className=' font-workSansMedium text-lg'>Chi tiết thông báo</p>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-[80%] border h-12 rounded-md px-2 mt-2'
                placeholder={"Chi tiết thông báo"}
              ></input>
            </div>

            <div className='flex items-center mt-6   gap-x-5'>
              <div>
                <span className=' mr-4'> Gửi push notification</span>
                <input type='checkbox' onChange={handleCheckboxChange} />
              </div>
              <button
                className='     w-1/2  '
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                <p className=' bg-primary-500 font-extrabold text-lg border z-50  px-8 py-2 border-slate-400 rounded-md flex items-center justify-center text-white	'>
                  Đăng bài
                </p>
              </button>
            </div>

            <span>{content}</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
export default Push;
