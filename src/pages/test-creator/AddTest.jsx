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
} from "@ant-design/icons";

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
            <div className="mt-10 px-3 py-4 min-w-2xl border border-gray-500">
              <Form name="basic" className=" w-full space-y-2 ">
                <div className="flex items-center justify-between">
                  <Form.Item noStyle>
                    <Select
                      defaultValue="Multiple choice"
                      style={{ width: 300 }}
                      options={[
                        {
                          label: (
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-5"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                />
                              </svg>
                              <span className="text-gray-700">
                                Multiple choice
                              </span>
                            </div>
                          ),
                          value: "Multiple choice",
                        },
                        {
                          label: (
                            <div className="flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-5"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                />
                              </svg>
                              <span className="text-gray-700">True/False</span>
                            </div>
                          ),
                          value: "True/False",
                        },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Required"
                    name="required"
                    valuePropName="checked"
                    noStyle
                  >
                    <div className="flex items-center gap-2">
                      <label htmlFor="required">Required</label>
                      <Switch name="required" />
                      <Button icon={<EllipsisOutlined />} />
                    </div>
                  </Form.Item>
                </div>
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
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddTest;
