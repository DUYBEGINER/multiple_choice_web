import React from "react";
import { useState, useEffect } from "react";
import QuestionCard from "@/components/QuestionCard";
import Title from "@/components/Title";

import Header from "./Header";
 import { Input } from 'antd';
import useTheme from "../../hook/useTheme";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
import SideBar from "./SideBar";
import { UserOutlined, SearchOutlined } from '@ant-design/icons';


function AddTest(props) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  return (
    <main className="h-screen flex flex-col w-full bg-gray-50 text-gray-900 ">
      <Header />  
      <div className="flex-1 px-4 py-3 grid grid-cols-[300px_1fr] gap-2 overflow-hidden">
        <SideBar />
        <div className="overflow-y-auto max-h-[calc(100vh-90px)] bg-white-100 ">
          <div className="sticky top-0 z-10 bg-white p-3 border-b">
            <Input.Search size="large" placeholder="large size" prefix={<SearchOutlined />} />
          </div>
          <div className="p-5 bg-red-300">test</div>
           <div className="p-5 bg-red-300">test</div>
            <div className="p-5 bg-red-300">test</div>
             <div className="p-5 bg-red-300">test</div>
              <div className="p-5 bg-red-300">test</div>
               <div className="p-5 bg-red-300">test</div>
           <div className="p-5 bg-red-300">test</div>
            <div className="p-5 bg-red-300">test</div>
             <div className="p-5 bg-red-300">test</div>
              <div className="p-5 bg-red-300">test</div>
               <div className="p-5 bg-red-300">test</div>
           <div className="p-5 bg-red-300">test</div>
            <div className="p-5 bg-red-300">test</div>
             <div className="p-5 bg-red-300">test</div>
              <div className="p-5 bg-red-300">test</div>
        </div>
      </div>
    </main>
  );
}

export default AddTest;
