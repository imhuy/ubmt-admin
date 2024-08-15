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
          "Bearer ya29.c.c0ASRK0GYRK5i7UmuJ_nveaucVxNfNPs7ov8YM7xwBQxBet3ZZaI3gZeomTPyQ-nICheEZmtAOAb26RQO3mjAMN0Utu2pEdEviHWtJdKXCmz3nNGeDjFaQ0BQCu2OoSsPxeOyOO4ULaAjAhMiHjln62ppFZwSYzjv1tmEsoaCe0n8sxuKwi3FpbXEcVNzjx9Lvyou_VaAI9XfodyH42SlsUtw-ShjhbC3WXe38S08Kh4yFyogvjE60ZE7BTV2v4meA4SIRnOWj3147gMu47MgU7HVDGDQvFqDlN3iPKXSKcCvKo5FKP7_wF_d7mW6j5wFa_CJMxbgGiCUDQGj4Q5RNYsZSqnl9QLhlaO2cd46uJu7TfuZ7y2512gsdL385P7YWdd_a6ww932b-j7s5iFrbfl2X8e3dQif7IFu6xeQBOZ6cIMe51a2ezR164nqauRybz3B6Ug8ZYyjcnSs_vYg0OYkw_XXbql5BMw7V7u7sy600xI_zdZWqpXnrjsccuaIp5fkeeak90Oi9omFmd5iFsel83aIx6Y1dpI3W2y1poZWBlq7sRRqpluudWI2R1QkzwYIMJ2oevQjubO_xwRaBbFQidxzi225dyBwwp3-I4Mqb9FYQWeWwe4iadeodejrmm2MvJZuu2-vFVuSjk9FyFzZdwXQ0Y6x4bZ83qW5U8ledpwufQi7d6fVmvOqFtvfjYa757yzIm_X3xnqMIr9R-gUiiw-b9rVWy7w8tJhjF392MO9zg5ooaZVBgRplyc5Owpoxp728qFsV_qMOBF6vr9sM9koSa0mr0ocBsvYap6QYszhcY23jnikMqYs4BB-OqMMy-kwOrwvpgYV-m6Q1uIUXVd6O32mif8b5Vp9z0Rt5UmhzOj26rtx6Uc1qSR4_yVolYon-qpuzM2pz-iWF1tFzswyZRRftF05prq31qryk4l3OmiBaUln6jJYMth6VanJx42toqzssXOMSSWU40Izhet6O-Bu6YW875vnywJpYj944vIjr0V8",
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
