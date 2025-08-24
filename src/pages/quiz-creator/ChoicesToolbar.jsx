import React from 'react';
import { Form, Select, Switch, Dropdown, Button, Menu, Divider } from 'antd';


function ChoiceSToolbar(props) {
    return (
        <div>
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
    );
}

export default ChoiceSToolbar;