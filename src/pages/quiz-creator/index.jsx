import React from "react";
import { useState, useEffect } from "react";
import Title from "@/components/Title";

import Header from "./Header";
import {
  Input,
  Form,
  Select,
  Switch,
  Button,
  Upload,
  message,
  Space,
  Dropdown,
  Menu,
} from "antd";
import useTheme from "../../hook/useTheme";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Divider } from "antd";
import SideBar from "./SideBar";
import {
  UserOutlined,
  SearchOutlined,
  EllipsisOutlined,
  PlusOutlined,
  MinusOutlined,
  HolderOutlined,
  DeleteOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";

import QuestionCardHeader from "./QuestionCardHeader";
import QuestionTitle from "./QuestionTitle";
import ChoiceSToolbar from "./ChoicesToolbar";
import CorrectAnswerPicker from "./CorrectAnswerPicker";
import QuestionFooter from "./QuestionFooter";
import QuestionCard from "./QuestionCard";

function QuizCreator(props) {

  return (
    <main className="h-screen flex flex-col w-full bg-gray-50 text-gray-900 ">
      <Header />
      <div className="flex-1 px-4 py-3 grid grid-cols-[300px_1fr] gap-2 overflow-hidden">
        <SideBar />
        <div className="overflow-y-auto max-h-[calc(100vh-90px)] bg-white rounded border border-gray-300">
          <div className="sticky top-0 z-10 bg-transparent p-3 border-b border-gray-300">
            <Input.Search
              size="large"
              placeholder="large size"
              prefix={<SearchOutlined />}
            />
          </div>

          <div className="flex flex-col items-center ">
             {[1,2,3,4,5,6,7,8,9].map((qs, index) =>
              <QuestionCard key={index} index={index} />
             )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default QuizCreator;
