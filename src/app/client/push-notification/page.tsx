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
          "Bearer ya29.c.c0ASRK0GaGpBSAU_AeAzE5YgpJoUQII6VWYNxkTxYa3H1UBAhi2myJwJ9WjGAJE2ddwRbytqlOVNYIcOM7qo6hO9n5RycI4N1XmKZYnpxWt9JCJrZ4oqbPO7ANE6eBfy-R7gCrR7hRHc-XpbnmeIEoklUA07_LHANuFJ7iMSFTI7oPEnnuTZ3dDoYMItKyfKPYiYwMd5WgODenl8eDS_Dqk9toPOwaQcblruAmhM0nHShtVPZI74QFtaiv_kKQTclIXFxIXjDJWByrZugB2iDhfwxkD6RLmOITrNz7tQvQU5S8UEOLGqJSf3yt-wxcuY7ZG3gf_frwlpB6YNb_v-vrlxUWHrWhKm-aBOC5Y6knEFsce9dN-zvsyh0TL385Kmear97w598pgQMqvg4dfxY0ySQ7SyRqoBZjIVY3bi4pn-6afrSi1dRXfOqaRZJovvnczuQ2FUMBFxmQ3y-sSwf4--byqJzp0Fn7zUmQ-k5W1mh1Y7aMp--Jnsdy-JtcvjUm4gZt8pu8JVl2Rrk6UdIqr1iYU_2FcBvfzQ8SmqJpucyrwYhpMhpp_03wbWQJoYeQvXUyqj761jh1qY69vohhk_9g9e3Z3dgFjx3gaO4bq45zlw0Qt0Mgk-p6cnYYf2R8BQXUdbn2-oBxMc_iJfF8ZodxdWkbxqpgjY65M-XUVaVwdyx71_98t10dzYygwpnVQokc51Xr6936prWUnue9cwgftuspsvJdQ6QgSmRS4MIYIQbfcSUQxIS_icoWB6f7o8kvy4toe_FqFnql3R4JcldyeJMn44krucIeifr275oJoOuu303yvhqtldiiVWUi6fn4F-7ZfIuFRv3Q-7ZoeMel6UQOU4ZwRh7JatOfsJSzw6Ui6_82zJXuxcnSj5vjutgWMbWOj4y9hF5J5rw7nyh60b0sshQkyJvrJQxuOXFYh0SrkySdnVBi011U_m5rqMXpWJjSrdeIBwS4u1FWnpxpuQhotpVSMFI3jVwd7XSyhJVB7pijXSi",
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
