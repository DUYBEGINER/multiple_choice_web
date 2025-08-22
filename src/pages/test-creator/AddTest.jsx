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

import QuestionEditor from "./QuestionEditor";




function AddTest(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const [title, setTitle] = useState("");

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
                <QuestionEditor />
                <Divider />
                <div>
                  <Form.Item
                    className="font-bold"
                    layout="vertical"
                    label="Question 1"
                    name="Question"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      placeholder="Type your question here..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      rows={4}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Choices"
                    name="Choices"
                    required
                    className="mb-0"
                  >
                    <div className="flex items-center gap-4">
                      <Divider type="vertical" className="h-5 self-stretch" />
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span>Multiple answer</span>
                          <Switch name="required" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Answer with image</span>
                          <Switch name="image" />
                        </div>
                      </div>
                    </div>
                  </Form.Item>
                </div>

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
                    <div className="mt-3">
                      <Button type="dashed" icon={<PlusOutlined />}>
                        Add Answer
                      </Button>
                    </div>
                    
                    <div className="mt-3">
                      <label className="block font-semibold mb-2">Correct Answer</label>
                      <div className="flex space-x-2">
                        {[1,2,3,4,5].map((_, idx) => (
                          <button
                            key={idx}
                            
                            className="px-4 py-1 border rounded-md "
                          >
                            {String.fromCharCode(65 + idx)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Form.Item>
                </div>
                <Divider />

                {/* Bottom Controls */}
                <div className="flex gap-4">
                  <Form.Item
                    label={
                      <span className="text-sm font-medium text-gray-700">
                        Randomize Order
                      </span>
                    }
                    className="w-[250px] mb-0"
                    layout="vertical"
                  >
                    <Select
                      defaultValue="current"
                      options={[
                        {
                          value: "current",
                          label: "Keep choices in current order",
                        },
                        { value: "random", label: "Shuffle choices" },
                      ]}
                      className="bg-gray-50"
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-sm font-medium text-gray-700">
                        Estimation time
                      </span>
                    }
                    className="w-[180px] mb-0"
                    layout="vertical"
                  >
                    <Input
                      addonAfter={
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Mins</span>
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6v6l4 2"
                            />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        </div>
                      }
                      defaultValue="2"
                      className="bg-gray-50"
                    />
                  </Form.Item>

                  <Form.Item
                    label={
                      <span className="text-sm font-medium text-gray-700">
                        Mark as point
                      </span>
                    }
                    className="w-[180px] mb-0"
                    layout="vertical"
                  >
                    <Input
                      addonAfter={
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">Points</span>
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        </div>
                      }
                      defaultValue="1"
                      className="bg-gray-50"
                    />
                  </Form.Item>
                </div>
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
