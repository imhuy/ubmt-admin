"use client";

import { authApi, productApi } from "@/api-client";
import Dropdown from "@/components/DropDown";
import PartyMember from "@/components/DropDown/PartyMember";
import SexDropDown from "@/components/DropDown/SexDropDown";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";

const CustomerForm: React.FC = () => {
  function MainView() {
    const [formData, setFormData] = useState<any>({
      username: "",
      email: "",
      full_name: "",
      status: 0,
      // avatar: "",
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

    const searchParams = useSearchParams();

    const [code] = searchParams.getAll("code") || "";

    const [data, setData] = useState<any>(null);

    if (code == "" || code == undefined) {
      console.log("không tìm thấy mã ");
    }

    const fetchData = async (id: string) => {
      try {
        const response = await axios.get(`https://mattranhanoi.com/api/user/get-delegation?code=${id}`);

        const { data } = response.data;

        setFormData({ ...formData, ...data });
        setData(data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    useEffect(() => {
      if (code) {
        fetchData(code);
      }
    }, [code]);
    const handleItemSelected = (item: string) => {
      setSelectedItem(item);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePartyMember = (item: any) => {
      setSelectedMember(item);
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
      console.log(selectedMember);

      if (!image) {
        toast.error("Vui lòng chọn ảnh đại diện", { autoClose: 4000 });
        return false;
      }

      return true;
    };
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!formValidate()) return;

      // formData.code = `HC${formData.phone.slice(-7)}`;
      formData.password = formData.phone;
      formData.username = formData.phone;
      formData.avatar = image.toString();
      // formData.avatar = "";
      formData.sex = selectedItem.id;
      formData.is_party_member = selectedMember.id;
      formData.delegation = delegation?.id?.toString();

      let update = await authApi.upDateUserInfo(formData);

      if (update.code === 0) {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success("Cập nhật thông tin đại biểu thành công", { autoClose: 4000 });
        window.location.replace("list-delegate");
      } else {
        toast.error(update.message, { autoClose: 4000 });
      }
    };

    return (
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-bold mb-4'>Tạo thông tin đại biểu</h2>
        <div className='grid grid-cols-1 gap-4'>
          {/* <input
      type='number'
      required={true}
      className='border p-2 rounded'
      name='phone'
      value={formData.phone}
      onChange={handleChange}
      placeholder='Số điện thoại'
    /> */}

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
            // value={moment(formData.date_of_birth).format("YYYY-MM-DD")}
            value={formData.date_of_birth}
            // ent(item?.date_of_birth).format('YYYY ')
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
            // required={true}
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
            // required={true}
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
  }
  return (
    <Suspense>
      <MainView />
    </Suspense>
  );
};

export default CustomerForm;
