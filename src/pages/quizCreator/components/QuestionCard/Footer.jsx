import React from "react";
import {
  Input,
  Form,
  Select,
} from "antd";



function Footer(props) {
  return (
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
  );
}

export default Footer;
