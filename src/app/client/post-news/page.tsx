"use client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";

import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { productApi } from "@/api-client";
import { AuthContext } from "@/context/useAuthContext";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const Profile: NextPage<any> = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const { authState, accountExtendDetail } = useContext(AuthContext);

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

  const handleSubmit = () => {
    console.log("title", title);
    console.log("description", description);
    console.log("image", image);
    console.log("content", content);

    try {
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleUploadImage = async (files: any) => {
    const formData = new FormData();
    formData.append("images", files[0]);
    const data = await productApi.uploadProduct(authState?.access_token, formData);
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
                onChange={(e) => setTitle(e.target.value)}
                className='w-[50%] border h-12 rounded-md px-2 mt-2'
                placeholder={"Tiêu đề bài viết"}
              ></input>
            </div>

            <div className='flex flex-col justify-between  mt-4  '>
              <p className=' font-workSansMedium text-lg'>Mô tả bài viết</p>
              <input
                onChange={(e) => setDescription(e.target.value)}
                className='w-[50%] border h-12 rounded-md px-2 mt-2'
                placeholder={"Mô tả bài viết"}
              ></input>
            </div>

            <input type='file' accept='image/*' onChange={(e) => handleUploadImage(e.target.files as any)} />

            <button
              className='  mt-6 h-16  w-1/2  '
              onClick={() => {
                handleSubmit();
              }}
            >
              <p className=' bg-primary-500 font-extrabold text-lg border z-50  px-8 py-2 border-slate-400 rounded-md flex items-center justify-center text-white	'>
                Đăng bài
              </p>
            </button>

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
