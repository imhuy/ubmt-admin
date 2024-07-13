"use client";

import { authApi } from "@/api-client";
import Dropdown from "@/components/DropDown";
import { AuthContext } from "@/context/useAuthContext";
import { ChangeEvent, FormEvent, useContext, useState } from "react";

interface FormData {
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
    email: " ",
    full_name: "",
    status: 0,
    avatar: "",
    role_id: 1,
    date_of_birth: "",
    number_card: " ",
    date_range: " ",
    issued: " ",
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

  const { authState, accountExtendDetail } = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [selectedItem, setSelectedItem] = useState<any>("");

  const handleItemSelected = (item: string) => {
    setSelectedItem(item);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let update = await authApi.upDateUserInfo(authState?.access_token, formData);
    console.log("payloadpayloadpayloadpayload", update);
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Tạo tài khoản và thông tin đại biểu</h2>

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

        <input
          required={true}
          className='border p-2 rounded'
          name='sex'
          value={formData.sex}
          onChange={handleChange}
          placeholder='Giới tính'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='date_of_birth'
          value={formData.date_of_birth}
          onChange={handleChange}
          placeholder='Năm sinh'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='place_of_residence'
          value={formData.place_of_residence}
          onChange={handleChange}
          placeholder='Quê quán'
        />

        {/* <input
          required={true}
          className='border p-2 rounded'
          name='delegation'
          value={formData.delegation}
          onChange={handleChange}
          placeholder='Đoàn'
        /> */}

        <Dropdown onItemSelected={handleItemSelected} />
        {selectedItem && (
          <form className='mt-4'>
            <input
              id='selectedItem'
              name='selectedItem'
              type='text'
              value={selectedItem.name}
              readOnly
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </form>
        )}

        <input
          required={true}
          className='border p-2 rounded'
          name='position'
          value={formData.position}
          onChange={handleChange}
          placeholder='Mã đại biểu'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='code'
          value={formData.code}
          onChange={handleChange}
          placeholder='Chức vụ'
        />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
