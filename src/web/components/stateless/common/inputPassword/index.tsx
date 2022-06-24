import React, { useState } from "react";
import { Form, Input } from "antd";
import '../inputBox/inputBox.less';

const InputPassword = (props: any) => {
    const {} =props
    const {placeholder,name,value,onChange,customInput, 
        type,labelSubName, initialValue, rules,customLabelClass} = props
  return (

      <Form.Item
        label={labelSubName}
        initialValue={initialValue}
        name={name}
        rules={rules}
        className={customLabelClass?`ib-0 f-12 ${customLabelClass}`: "ib-0 f-12"}
      >
        <Input.Password
          placeholder={placeholder}
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          className={customInput? `ib-1 ${customInput}`: "ib-1"}
        />
      </Form.Item>
  );
};

export default InputPassword;

