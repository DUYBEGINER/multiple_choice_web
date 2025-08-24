import React from 'react';
import {Input} from 'antd';
import QuestionCard from '../components/QuestionCard/QuestionCard'; 
import {
  SearchOutlined,
} from "@ant-design/icons";

function EditorArea(props) {
    return (
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
    );
}

export default EditorArea;