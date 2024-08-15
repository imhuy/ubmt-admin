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
    sendPush();
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
          "Bearer ya29.c.c0ASRK0Ga_mS-oOAJdJEcR7Wcthzis2BLHejPk3MQtl_QDfcyyYH8LDJLDk3p4Dy84SBOIxGQQUr0bMoJ-4Et8oPDBgdc5Q_f89sJ_vN9uDEyUXVGaB2GlFKXj8Qn5NtbkE6hrA5JhoVuv2UmXvcs8DySjODnniwGPqfmv3HySzYrS1Iv2gKlyzz2wxxcQdrci-Ky-or7ZkjMbMnME2FSxzspos0-wjLrzWAsEiq7XJuecdoWIw5izPaeTISqRdrzBFtHJQ8b-1l7UTKfofsZNL7GrqT-W8zQsgFCEZQp2T059q0WJV1YvoHDpfBnEXRxaB2ZkZzyLQx42iLYj64wDCJdbr9dwIvXwaikU7Uy_c3SUKcNz6qSB9CUT384AbojUIxYIvrvwUr2qwc8vJ2Vs-stXsrb5S0_2Un9fWtOw_-I_etlm64dn1v-olSm6Z5wJiik-d-04mhF0euWiM64W1zYYeU7U25cp2uwtubVwQFZf5MyzORhS32ofxfOsFl4Speyr9m2Q1vyWt2zwl07OmkJgswkaUlmowR_M4QSMuh_n7rJ8mfbtysMWRwwwdMmr8FiiJcRwFp80Ssp7cj54h6-9a53hmUIh7Z4Oqd0XsVWXQM4bmUmnard-useyW9R_YRt89SaRX7cZexXZ5kfV5OQMmOxYy5nYBbF_qgbntw29_JdQt85cJpkXJxVZ9awbp7n542Rc2-Uu2y4ioMYwYfMo-gRe49FdsJymngXRo2Ov5FeBpvtSuguiIwkgYtxz7v1z8Qz-a8MtuR-ykYrdx2aeomOOdlctqO4oi9QBySlFv-lkZUUrrOguQSrn_rusXmdBuy_351YFht-SRVFvoFepxRBjJvlYMX1Z8qk6-fhxbM_puawo12p8VQUr5lRtn1MlwaMQusfUgX2Jm5_n66oi611fgFB60edzR2queYUw-sb23ZBYgVXB7FuB-f5VjYMQjnywv_FWdpll1imwjaz1nZMQr0BBf2q8B-mulVZIepW_izfqyt4",
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
