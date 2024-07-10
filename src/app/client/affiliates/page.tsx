"use client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { NextPage } from "next";

const Profile: NextPage<any> = () => {
  return (
    <AppLayout>
      <div className="w-full  h-screen flex flex-col">
        <div className="p-6">
          <Header />
          <div className="h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden" />
        </div>
      </div>
    </AppLayout>
  );
};
export default Profile;
