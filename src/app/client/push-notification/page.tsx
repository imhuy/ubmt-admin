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
        topic: "news",
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
          "Bearer ya29.c.c0ASRK0GbgjzcnFoF8D0W_GE1noUffrTFBNl5zKmsGrbq16c32oBGrDdKyxKfqUcoOt69FIszdmqDCMldVhjXSm3RVXYOVuBvrUTI-jXIfgGfJF38q3b-TmFwKioHKVXVWuiQzsui05XxWJzxmihPcNIQC5lKAfnOpiQZTf8GpE0ZvdDwVPyiAd8dWLuGUcEUr9uJiA6BFt_aSemYmRd_Wzmr1XtQV7uB4jNWqmHFvvezUew-YGfYYcbRah99eDPzNiPbZ5OXalSzhDAytPHMN3RGrQSx59_N0UKMtL_qNviO99sLiIVhGXt0tJwjrOUMPGyPif5lx72WFE8SpVQooBf2olYBwPZuR2kuSxLxw1A5Xa-hsC75w3JSdE385DoFo3c4Fnhjvh10wolswfnS4oc6tY36fjSnjnVzgjzugpquiQttBZBae2jSSmcIXYxbsbVBpwj_2RIUIon_Rzg_z9Vcs_xb5uXcq34dggOinvyX-g3v5bBkZMhi7u0Bin0jhe0OO-Vxxztkt_m9OZbOfigUreZrW_tMQ0Rr97sOui6mze4ZRafmm1tt_UyRl3dIl6t0x0tg5biXJ0Sss3epqYfBu8S8o5cdoqBh0pqov35tShQmQZ6Jg7ztSuYJ0anv18wjjpVu09xyY-Fl4Y0a1-j1MO7QYWs3-4Ixodp9yxy_ppuwsMUaUu5Q0JI38x211e8FfpvMw4s4acRJw5jOlVW1fO-oWk4gcyfZUZ9aisQv43V05X3Qdk3dItj2bOsUXos9qsUuw-J3vOxb6kkSOYRd9s50Zy8XIn_33Mnw5ha0ngklOVuywBaiS-IXuVFBe3fd2R-prv2cJ0jkl9VyWfU-xqSFOYe-bwlcbZn2QXpF1V2YadmkfuJXjdq91hZxFssfw0hWq6qgJe1zqrz7_xvfb2gpnOXu6MnukF5MbkX5vkc7hhmpy5rbo__S29mxUz2361dtId75pxwYwcyhJx587W888SMkik0mqcgjh5W31mzljpfUb4JR",
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