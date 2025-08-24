import React from "react";
import {
  Input,
  Button,
} from "antd";

import {
  HolderOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function ChoicesItem(props) {
    const { index } = props;
  return (
    <div className="flex items-center gap-2 w-full mb-2">
      <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center">
        {String.fromCharCode(65 + index)}
      </div>
      <Input placeholder="Your answer here" className="flex-1 bg-gray-100" />
      <Button type="text" icon={<HolderOutlined />} />
      <Button type="text" icon={<DeleteOutlined />} danger />
    </div>
  );
}

export default ChoicesItem;
