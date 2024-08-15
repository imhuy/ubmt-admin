"use client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";

import { NextPage } from "next";
import dynamic from "next/dynamic";
import { FormEvent, useContext, useState, useRef, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { productApi } from "@/api-client";
import { AuthContext } from "@/context/useAuthContext";
import SelectCategory from "@/components/DropDown/SelectCategory";
import { toast } from "react-toastify";
import axios from "axios";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const Profile: NextPage<any> = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [checkValue, setCheckValue] = useState([]);
  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }, { direction: "rtl" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["code-block"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "indent",
    "direction",
    "color",
    "background",
    "align",
    "link",
    "image",
    "video",
    "code-block",
  ];
  const [selectedItem, setSelectedItem] = useState<any>("");
  const handleItemSelected = (item: string) => {
    console.log("itemitemitemitem", item);
    setSelectedItem(item);
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const isChecked = e.target.checked;
    setCheckValue((prev: any) => {
      if (isChecked) {
        return [...prev, id];
      } else {
        return prev.filter((item: any) => item !== id);
      }
    });
  };

  const formValidate = () => {
    if (!title) {
      toast.error("Vui lòng nhập tiêu đề", { autoClose: 4000 });
      return false;
    }

    if (!content) {
      toast.error("Vui lòng nhập nội dung", { autoClose: 4000 });
      return false;
    }
    if (checkValue.length === 0) {
      toast.error("Vui lòng chọn danh mục", { autoClose: 4000 });
      return false;
    }
    if (!image) {
      toast.error("Vui lòng chọn hình ảnh", { autoClose: 4000 });
      return false;
    }

    return true;
  };

  const handleSubmit = async (id: number) => {
    const postForm: any = {
      title: title,
      content: content,
      image: image,
      cat_id: id,
      hashtag: [],
      day: "1",
      short_description: description,
    };

    console.log(postForm);
    try {
      const data = await productApi.postNews(postForm);
      if (data.code === 0) {
        setTitle("");
        setContent("");
        setDescription("");
        setImage("");
        setSelectedItem(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success("Đăng bài thành công", { autoClose: 4000 });
      } else {
        toast.error("Xảy ra lỗi vui lòng thử lại", { autoClose: 4000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const sendPostAll = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValidate()) return;
    for (let index = 0; index < checkValue.length; index++) {
      const element = checkValue[index];

      handleSubmit(element);
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

  const handleUploadImage = async (files: any) => {
    const formData = new FormData();
    formData.append("images", files[0]);
    const data = await productApi.uploadProduct(formData);
    setImage(data[0]);
  };
  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  return (
    <AppLayout>
      <div className='w-full bg-white  h-screen flex flex-col'>
        <div className='p-6'>
          <Header title='Đăng bài viết' />
          <div className='h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden' />
          <div className=' h-lvh    rounded-xl '>
            <div className='flex flex-col justify-between   '>
              <p className=' font-workSansMedium text-lg'>Tiêu đề</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-[80%] border h-12 rounded-md px-2 mt-2'
                placeholder={"Tiêu đề bài viết"}
              ></input>
            </div>

            <div className='flex flex-col justify-between  mt-4  '>
              <p className=' font-workSansMedium text-lg'>Mô tả bài viết</p>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='w-[80%] border h-12 rounded-md px-2 mt-2'
                placeholder={"Mô tả bài viết"}
              ></input>
            </div>

            <div className='flex gap-x-8 mt-6 mb-2'>
              {/* <SelectCategory onItemSelected={handleItemSelected} /> */}
              <div>
                <span className=' mr-4'> Tin tức</span>

                <input type='checkbox' onChange={(e) => handleCheckboxChange(e, 1)} />
              </div>
              <div>
                <span className=' mr-4'>Thông tin đại hội</span>
                <input type='checkbox' onChange={(e) => handleCheckboxChange(e, 2)} />
              </div>

              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={(e) => handleUploadImage(e.target.files as any)}
              />
            </div>

            <button
              className='  mt-6 h-16  w-1/2  '
              onClick={(e) => {
                sendPostAll(e);
              }}
            >
              <p className=' bg-primary-500 font-extrabold text-lg border z-50  px-8 py-2 border-slate-400 rounded-md flex items-center justify-center text-white	'>
                Đăng bài
              </p>
            </button>
            {/* <span>{content}</span> */}
            <div className='flex  flex-col h-screen '>
              <QuillEditor
                value={content}
                onChange={handleEditorChange}
                modules={quillModules}
                formats={quillFormats}
                className='w-full h-[80lvh]   mt-10 bg-white'
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
export default Profile;
