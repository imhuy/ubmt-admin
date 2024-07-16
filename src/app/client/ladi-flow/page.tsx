"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormData {
  id: number;
  full_name: string;
  phone: string;
  gender: string;
  tags: Array<string>;
  custom_fields: string;
  city: string;
  address: string;
  address_2: string;
  district: string;
  company: string;
  job_title: string;
  ward: string;
  lang: string;

  //custom_fields:
  daihoi_daibieu_namsinh: string;
  daihoi_daibieu_quequan: string;
  daihoi_daibieu_doan: string;
  daihoi_daibieu_ma: string;
  daihoi_daibieu_chucvu: string;
}

const CustomerForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    full_name: "",
    phone: "",
    gender: "",
    tags: ["668b91ec1c659e0012bdd29c"],
    city: "",
    address: "",
    address_2: "",
    custom_fields: "",
    district: "",
    company: "",
    job_title: "",
    ward: "",
    lang: "vi",
    daihoi_daibieu_namsinh: "",
    daihoi_daibieu_quequan: "",
    daihoi_daibieu_doan: "",
    daihoi_daibieu_ma: "",
    daihoi_daibieu_chucvu: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      email: "test@gmail.com",
      first_name: "test",
      full_name: "test",
      dob: "1989-11-03",
      phone: null,
      gender: "male",
      city: "Hà Nội",
      address: "68 Nguyễn Cơ Thạch",
      address_2: "",
      district: "Nam Từ Liêm",
      company: "LadiPage",
      job_title: "Coder",
      ward: "Mỹ Đình 1",
      custom_fields: [
        {
          name: "daihoi_daibieu_namsinh",
          value: formData.daihoi_daibieu_namsinh,
        },
        {
          name: "daihoi_daibieu_quequan",
          value: formData.daihoi_daibieu_quequan,
        },
        {
          name: "daihoi_daibieu_doan",
          value: formData.daihoi_daibieu_doan,
        },
        {
          name: "daihoi_daibieu_ma",
          value: formData.daihoi_daibieu_ma,
        },
        {
          name: "daihoi_daibieu_chucvu",
          value: formData.daihoi_daibieu_chucvu,
        },
      ],
    };

    console.log("payloadpayloadpayloadpayload", payload);
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Gửi thông tin</h2>
      <div className='grid grid-cols-1 gap-4'>
        <input
          required={true}
          className='border p-2 rounded'
          name='full_name'
          value={formData.full_name}
          onChange={handleChange}
          placeholder='Nhập id đại biểu muốn cập nhật'
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
          name='gender'
          value={formData.gender}
          onChange={handleChange}
          placeholder='Giới tính'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='daihoi_daibieu_namsinh'
          value={formData.daihoi_daibieu_namsinh}
          onChange={handleChange}
          placeholder='Năm sinh'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='daihoi_daibieu_quequan'
          value={formData.daihoi_daibieu_quequan}
          onChange={handleChange}
          placeholder='Quê quán'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='daihoi_daibieu_doan'
          value={formData.daihoi_daibieu_doan}
          onChange={handleChange}
          placeholder='Đoàn'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='daihoi_daibieu_chucvu'
          value={formData.daihoi_daibieu_chucvu}
          onChange={handleChange}
          placeholder='Mã đại biểu'
        />

        <input
          required={true}
          className='border p-2 rounded'
          name='daihoi_daibieu_ma'
          value={formData.daihoi_daibieu_ma}
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
