"use client";

import { authApi } from "@/api-client";
import DelegateDropDown from "@/components/DropDown/DelegateDropDown";
import { AuthContext } from "@/context/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useContext, useState } from "react";
import { toast } from "react-toastify";
export interface ItemType {
  id: number;
  key: string;
  full_name: string;
  created_at: string;
  position: string;
  delegation: string;
  amount: number;
  friend: string;
  code: string;
}

export interface DelegationType {
  id: number;
  key: string;
  name: string;
  image: string;
}
export default function Home() {
  function MainView() {
    const { authState } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchTermDelegate, setSearchTermDelegate] = useState<string>("");
    const [delegation, setDelegation] = useState<any>("");
    const [tab, setTab] = useState<number>(0);

    const { data, isLoading, refetch, isPending } = useQuery<ItemType[]>({
      queryKey: ["getListUserSelectAN", authState?.access_token],
      queryFn: async () => await authApi.listDelegateUser(),
    });

    const {
      data: dataDelegate,
      isLoading: isLoadingDelegate,
      refetch: refetchDelegate,
      isPending: isPendingDelegate,
    } = useQuery<DelegationType[]>({
      queryKey: ["getListDelegateSelect", authState?.access_token],
      queryFn: async () => await authApi.listDelegate(),
    });

    const addPreview = async (id: number, type: number) => {
      toast.success("Hiển thị lên màn hình lớn thành công");
      let data = await authApi.addPreViewData(id, type);

      console.log("datadatadatadata", data.code);
      if (data.code === 0) {
      }
    };
    const onSearch = (e: any) => {
      setSearchTerm(e.target.value);
    };
    const onSearchDelegate = (e: any) => {
      setSearchTermDelegate(e.target.value);
    };
    const handleSelectDelegation = (item: string) => {
      setDelegation(item);
    };
    const filteredData = data?.filter((item) => item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()));

    const filteredDelegateData = dataDelegate?.filter((item) =>
      item.name?.toLowerCase().includes(searchTermDelegate.toLowerCase())
    );
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <iframe
          allowFullScreen={true}
          scrolling='no'
          className='fp-iframe'
          style={{
            border: "1px solid lightgray",
            width: "100%",
            height: "100%",
            margin: "0px",
            padding: "0px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
          src='https://mttq.hflip.co/20192024.html'
        />
      </div>
    );
  }
  return (
    <div className='   justify-center'>
      <Suspense>
        <MainView />
      </Suspense>
    </div>
  );
}
