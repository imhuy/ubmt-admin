"use client";

import { authApi, productApi } from "@/api-client";
import Dropdown from "@/components/DropDown";
import PartyMember from "@/components/DropDown/PartyMember";
import SexDropDown from "@/components/DropDown/SexDropDown";
import axios from "axios";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
interface FormData {
  id: any;
  username: string;
  email: string;
  full_name: string;
  avatar: string;
  date_of_birth: string;
  sex: string;
  issued: string;
  place_of_residence: string;
  current_residence: string;
  number_card: string;
  date_range: string;
  nation: string;
  image_card: Array<string>;
  tags: Array<string>;
  custom_fields: string;
  city: string;
  nationality: string;
  religion: string;
  job: string;
  district: string;
  company: string;
  job_title: string;
  ward: string;
  lang: string;
  qualification: string;
  political_theory: string;
  degree: string;
  academic_rank: string;
  is_party_member: true;

  is_delegate: true;
  //custom_fields:
  educational_level: string;
  delegation: string;
  code: string;
  position: string;
}

const CustomerForm: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    username: "",
    email: "",
    full_name: "",
    status: 0,
    avatar: "",
    role_id: 1,
    date_of_birth: "",
    number_card: "",
    date_range: "",
    issued: "",
    place_of_residence: "",
    current_residence: "",
    image_card: [],
    sex: "",
    code: "",
    nation: "",
    religion: "",
    nationality: "",
    job: "",
    position: "",
    qualification: "",
    educational_level: "",
    political_theory: "",
    degree: "",
    academic_rank: "",
    is_party_member: true,
    delegation: "",
    is_delegate: true,
  });

  const [image, setImage] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [selectedItem, setSelectedItem] = useState<any>("");
  const [selectedMember, setSelectedMember] = useState<any>("");
  const [delegation, setDelegation] = useState<any>("");
  const [selected, setSelected] = useState<any>(1);
  const handleItemSelected = (item: string) => {
    setSelectedItem(item);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const senDataladiFlow = async (inputData: any) => {
    let data = JSON.stringify({
      email: formData.email,
      full_name: formData.full_name,
      phone: formData.phone,
      gender: formData.sex == "Bà" ? "female" : "male",
      tags: ["668b91ec1c659e0012bdd29c"],
      custom_fields: [
        {
          name: "daihoi_daibieu_namsinh",
          value: formData.date_of_birth,
        },
        {
          name: "daihoi_daibieu_quequan",
          value: formData.place_of_residence,
        },
        {
          name: "daihoi_daibieu_doan",
          value: delegation.name,
        },
        {
          name: "daihoi_daibieu_ma",
          value: formData.code,
        },
        {
          name: "daihoi_daibieu_chucvu",
          value: formData.position,
        },
      ],
      city: formData.place_of_residence,
      address: formData.current_residence,
      job_title: formData.job,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.service.ladiflow.com/1.0/customer/create",
      headers: {
        "Api-Key": "1280044757dc09f18836126588eb6160",
        "Content-Type": "application/json",
      },
      data: data,
    };
    let senData = await axios(config);
    return senData;
  };

  const handlePartyMember = (item: any) => {
    setSelectedMember(item);
  };
  const handleUploadImage = async (files: any) => {
    const formData = new FormData();
    formData.append("images", files[0]);
    const data = await productApi.uploadAvatar(formData);
    console.log("datadatadatadata", data);
    setImage(data[0]);
  };
  const handleSelectDelegation = (item: string) => {
    setDelegation(item);
  };

  const formValidate = () => {
    console.log(selectedMember);

    if (!selectedItem.name) {
      toast.error("Vui lòng chọn giới tính", { autoClose: 4000 });
      return false;
    }
    if (!image) {
      toast.error("Vui lòng chọn ảnh đại diện", { autoClose: 4000 });
      return false;
    }

    if (!delegation?.id) {
      toast.error("Vui lòng chọn đoàn đại biểu", { autoClose: 4000 });
      return false;
    }
    if (!selectedMember.name) {
      toast.error("Vui lòng chọn thông tin đảng viên", { autoClose: 4000 });
      return false;
    }

    return true;
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValidate()) return;

    formData.code = `HC${formData.phone.slice(-7)}`;
    formData.password = formData.phone;
    formData.username = formData.phone;
    formData.avatar = image.toString();
    formData.sex = selectedItem.id;
    formData.is_party_member = selectedMember.id;
    formData.delegation = delegation?.id?.toString();

    let update = await authApi.createUser(formData);

    if (update.code === 0) {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      // senDataladiFlow(formData);
      toast.success("Thêm đại biểu thành công", { autoClose: 4000 });
    } else {
      toast.error(update.message, { autoClose: 4000 });
    }
    console.log("payloadpayloadpayloadpayload", update);
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Tạo thông tin đại biểu</h2>
      <div className='grid grid-cols-1 gap-4'>
        <input
          type='number'
          required={true}
          className='border p-2 rounded'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          placeholder='Số điện thoại'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='full_name'
          value={formData.full_name}
          onChange={handleChange}
          placeholder='Họ tên'
        />

        <div className='flex gap-x-8 mt-2 mb-2'>
          <SexDropDown onItemSelected={handleItemSelected} />
          {/* <div className='flex gap-x-4  p-4'>
            <label className='flex items-center mb-2'>
              <input
                type='radio'
                name='radio'
                value={5}
                className='form-radio text-blue-600 h-4 w-4'
                onChange={(e) => setSelected(e.target.value)}
                // checked={selected == 5}
              />
              <span className='ml-2'>Nam</span>
            </label>
            <label className='flex items-center mb-2'>
              <input
                type='radio'
                name='radio'
                value={2}
                className='form-radio text-blue-600 h-4 w-4'
                onChange={(e) => setSelected(e.target.value)}
                // checked={selected == 2}
              />
              <span className='ml-2'>Nữ</span>
            </label>
          </div> */}
          <div className=' flex gap-x-2'>
            <p>Ảnh đại diện</p>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={(e) => handleUploadImage(e.target.files as any)}
            />
          </div>
        </div>

        <input
          required={true}
          className='border p-2 rounded'
          name='position'
          value={formData.position}
          onChange={handleChange}
          placeholder='Chức vụ'
        />

        <input
          // required={true}
          className='border p-2 rounded'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='date_of_birth'
          value={formData.date_of_birth}
          onChange={handleChange}
          placeholder='Ngày sinh: vd :20/11/1986'
        />

        <input
          // required={true}
          className='border p-2 rounded'
          name='place_of_residence'
          value={formData.place_of_residence}
          onChange={handleChange}
          placeholder='Quê quán'
        />
        <input
          // required={true}
          className='border p-2 rounded'
          name='current_residence'
          value={formData.current_residence}
          onChange={handleChange}
          placeholder='Nơi ở hiện tại'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='religion'
          value={formData.religion}
          onChange={handleChange}
          placeholder='Tôn giáo'
        />
        <input
          // required={true}
          className='border p-2 rounded'
          name='qualification'
          value={formData.qualification}
          onChange={handleChange}
          placeholder='Học vấn'
        />

        <Dropdown onItemSelected={handleSelectDelegation} />
        <PartyMember onItemSelected={handlePartyMember} />
        <input
          // required={true}
          className='border p-2 rounded'
          name='job'
          value={formData.job}
          onChange={handleChange}
          placeholder='Công việc hiện tại'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='nation'
          value={formData.nation}
          onChange={handleChange}
          placeholder='Dân tộc'
        />

        <input
          // required={true}
          className='border p-2 rounded'
          name='nationality'
          value={formData.nationality}
          onChange={handleChange}
          placeholder='Quốc tịch'
        />

        <input
          // required={true}
          className='border p-2 rounded'
          name='degree'
          value={formData.degree}
          onChange={handleChange}
          placeholder='Học vị'
        />
        <input
          // required={true}
          className='border p-2 rounded'
          name='academic_rank'
          value={formData.academic_rank}
          onChange={handleChange}
          placeholder='Học hàm'
        />

        <input
          // required={true}
          className='border p-2 rounded'
          name='political_theory'
          value={formData.political_theory}
          onChange={handleChange}
          placeholder='Lý luận chính trị'
        />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
