import React, { useEffect, useState } from "react";
import { Form, Input } from "antd";
import './inputBox.less';

const InputBox = (props: any) => {
    const {} =props
    const {placeholder,name,value,onChange,customInput, refer,
        type,labelSubName, initialValue, rules,customLabelClass, disabled, onBlur} = props 
  return (
      <Form.Item
        key={name}
        label={labelSubName}
        initialValue={initialValue}
        name={name}
        rules={rules}
        className={customLabelClass?`ib-0 ${customLabelClass}`: "ib-0"}
      >
        <Input
          key={name}
          ref={refer}
          placeholder={placeholder}
          // defaultValue={initialValue}
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          className={customInput? `ib-1 ${customInput}`: "ib-1"}
          disabled={disabled}
          onBlur={onBlur}
  
        />
      </Form.Item>
  );
};

export default InputBox;

