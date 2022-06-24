import React, { useState } from "react";
import { Form, Input } from "antd";
import './textAreaStyle.less';

const TextArea = (props: any) => {
    const {} =props
    const {placeholder,name,value,onChange,customInput, refer,
        type,labelSubName, initialValue, rules,customLabelClass} = props
  return (
      <Form.Item
        label={labelSubName}
        initialValue={initialValue}
        name={name}

        rules={rules}
        
        className={customLabelClass?`ib-0 ${customLabelClass}`: "ib-0"}
      >
        <Input.TextArea
        ref={refer}
          placeholder={placeholder}
          name={name}
          value={value}         
          onChange={onChange}
          className={customInput? `ib-1 ${customInput}`: "ib-1"}
          rows={3}
          
        />
      </Form.Item>
  );
};

export default TextArea;

