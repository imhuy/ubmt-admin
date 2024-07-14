"use client";

import { authApi, productApi } from "@/api-client";
import Dropdown from "@/components/DropDown";
import SexDropDown from "@/components/DropDown/SexDropDown";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, Suspense, useState } from "react";
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
  function MainView() {
    const searchParams = useSearchParams();
    const [id] = searchParams.getAll("id") || "";
    const [formData, setFormData] = useState<any>({
      id: id,
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
    const [delegation, setDelegation] = useState<any>("");
    const handleItemSelected = (item: string) => {
      setSelectedItem(item);
    };
    const handleUploadImage = async (files: any) => {
      const formData = new FormData();
      formData.append("images", files[0]);
      const data = await productApi.uploadAvatar(formData);
      setImage(data[0]);
    };
    const handleSelectDelegation = (item: string) => {
      setDelegation(item);
    };

    const formValidate = () => {
      if (!selectedItem.name) {
        toast.error("Vui lòng chọn Giới tinh", { autoClose: 4000 });
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

      return true;
    };
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!formValidate()) return;

      formData.code = `HC${formData.phone.slice(-7)}`;
      formData.password = formData.phone;

      formData.avatar = image.toString();
      formData.sex = selectedItem.name;
      formData.delegation = delegation?.id?.toString();
      console.log("formDataformDataformData", formData);
      let update = await authApi.createUser(formData);
      if (update.code === 0) {
        toast.success("Thêm đại biểu thành công", { autoClose: 4000 });
      } else {
        toast.error("Xảy ra lỗi vui lòng thử lại", { autoClose: 4000 });
      }
      console.log("payloadpayloadpayloadpayload", update);
    };
    return (
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold mb-4'>Cập nhật thông tin đại biểu</h2>
        <div className='grid grid-cols-1 gap-4'>
          <input
            disabled={true}
            required={true}
            className='border p-2 rounded'
            name='id'
            value={formData?.id}
            onChange={handleChange}
            placeholder='Nhập id đại biểu muốn cập nhật'
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
            name='full_name'
            value={formData.full_name}
            onChange={handleChange}
            placeholder='Họ tên'
          />

          <div className='flex gap-x-8 mt-2 mb-2'>
            <SexDropDown onItemSelected={handleItemSelected} />
            <div className=' flex gap-x-2'>
              <p>Ảnh đại diện</p>
              <input type='file' accept='image/*' onChange={(e) => handleUploadImage(e.target.files as any)} />
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
            required={true}
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

          <input
            required={true}
            className='border p-2 rounded'
            name='qualification'
            value={formData.qualification}
            onChange={handleChange}
            placeholder='Trình độ chuyên môn'
          />

          <Dropdown onItemSelected={handleSelectDelegation} />

          <input
            required={true}
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
            required={true}
            className='border p-2 rounded'
            name='nationality'
            value={formData.nationality}
            onChange={handleChange}
            placeholder='Quốc tịch'
          />

          <input
            required={true}
            className='border p-2 rounded'
            name='degree'
            value={formData.degree}
            onChange={handleChange}
            placeholder='Bằng cấp'
          />

          <input
            required={true}
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
  }

  return (
    <>
      <Suspense>
        <MainView />
      </Suspense>
    </>
  );
};

export default CustomerForm;
