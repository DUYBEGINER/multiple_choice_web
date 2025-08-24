import React from 'react';
import { Form, Select, Switch, Dropdown, Button, Menu } from 'antd';
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


const menuItems = [
  { key: 'edit', label: 'Edit', icon: <EditOutlined /> },
  { key: 'delete', label: 'Delete', icon: <DeleteOutlined />, danger: true },
];


function QuestionCardHeader(props) {
    return (
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
                        <Dropdown menu={{ items: menuItems}} trigger={['click']}>
                      <Button
                        icon={<EllipsisOutlined />}
                        className="border border-gray-300 shadow-sm hover:border-gray-500"
                      />
                    </Dropdown>
                    </div>
                  </Form.Item>
                </div>
    );
}

export default QuestionCardHeader;