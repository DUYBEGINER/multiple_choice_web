import React from 'react';
import {
  PlusOutlined,
} from "@ant-design/icons";

import {
  Input,
  Form,
  Button,
  Divider,
} from "antd";

import Header from "./Header";
import Title from "./Title";
import ChoiceSToolbar from "./ChoicesToolbar";
import CorrectAnswerPicker from "./CorrectAnswerPicker";
import Footer from "./Footer";
import ChoicesItem from './ChoicesItems';

function QuestionCard(props) {

    const { index } = props;
    return (
        <div className="mt-10 px-3 py-4 min-w-2xl mb-2 border rounded-md border-gray-300">
              <Form name={`form_${index}`} className=" w-full space-y-2 ">
                {/* Question Header */}
                <Header />

                <Divider />

                {/* Question Title */}
                <Title />
                {/* Question Toolbar */}
                <ChoiceSToolbar />

                {/* Answer Choices */}
                <div className="flex flex-col">
                  <Form.Item noStyle>
                    {[1, 2, 3, 4].map((question, index) => (
                     <ChoicesItem key={index} index={index} />
                    ))}
                  </Form.Item>
                </div>

                {/* Add Answer Button */}
                <div className="mt-3">
                    <Button type="dashed" icon={<PlusOutlined />}>
                      Add Answer
                    </Button>
                </div>

                {/* Correct Answer Picker */}
                <CorrectAnswerPicker />
                <Divider />

                {/* Bottom Controls */}
                <Footer />
              </Form>
            </div>
    );
}

export default QuestionCard;