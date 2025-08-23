import React from "react";
import { useState, useEffect } from "react";
import QuestionCard from "@/components/QuestionCard";
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


function AddTest(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();


  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
            <div className="mt-10 px-3 py-4 min-w-2xl mb-2 border rounded-md border-gray-300">
              
              <Form name={`form_${index}`} className=" w-full space-y-2 ">
                <QuestionCardHeader />
                <Divider />
                <QuestionTitle />
                <ChoiceSToolbar />

                <div className="flex flex-col">
                  <Form.Item noStyle>
                    {[1, 2, 3, 4].map((question, index) => (
                      <div className="flex items-center gap-2 w-full mb-2">
                        <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <Input
                          placeholder="Your answer here"
                          className="flex-1 bg-gray-100"
                        />
                        <Button type="text" icon={<HolderOutlined />} />
                        <Button type="text" icon={<DeleteOutlined />} danger />
                      </div>
                    ))}
                  </Form.Item>
                </div>
                <div className="mt-3">
                    <Button type="dashed" icon={<PlusOutlined />}>
                      Add Answer
                    </Button>
                </div>
                <CorrectAnswerPicker />
                <Divider />

                {/* Bottom Controls */}
                <QuestionFooter />
              </Form>
            </div>
             )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddTest;
