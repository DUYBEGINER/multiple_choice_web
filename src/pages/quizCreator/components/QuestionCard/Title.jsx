import React, {useState} from 'react';
import {Form, Input} from 'antd';

function Title(props) {

    const [title, setTitle] = useState("");

    return (
        <>
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
        </>
    );
}

export default Title;