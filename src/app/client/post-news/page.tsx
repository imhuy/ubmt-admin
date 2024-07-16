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
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const Profile: NextPage<any> = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setSelectedItem(item);
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
    if (!selectedItem.name) {
      toast.error("Vui lòng chọn danh mục", { autoClose: 4000 });
      return false;
    }
    if (!image) {
      toast.error("Vui lòng chọn ảnh đại diện", { autoClose: 4000 });
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
      image: image,
      cat_id: selectedItem.id,
      hashtag: [],
      day: "1",
      short_description: description,
    };
    console.log("postFormpostFormpostForm", postForm);
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
              <SelectCategory onItemSelected={handleItemSelected} />
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
                handleSubmit(e);
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
