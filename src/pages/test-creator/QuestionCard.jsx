import React from 'react';
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

function QuestionCard(props) {

    const { index } = props;
    return (
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
    );
}

export default QuestionCard;