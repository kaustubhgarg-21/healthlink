import React from "react";
import { Select, Form } from "antd";
import "./selectInput.less";
import { downArrow, downIcon } from "../../../../images";

const SelectInput = (props: any) => {
  const ArrowIcon = () => {
    return   <img src={downIcon}/>
  }
  const { Option } = Select;
  const {
    className,
    bordered,
    defaultValue,
    onChange,
    optionValue,
    value,
    placeholder,
    optionClass,
    mode,
    labelSubName,
    initialValue,
    customLabelClass,
    name,
    rules,
    disabled,
    showSearch
  } = props;

  return (
    <Form.Item
      label={labelSubName}
      initialValue={initialValue}
      name={name}
      rules={rules}
      className={customLabelClass ? `ib-0 f-12 ${customLabelClass}` : "ib-0 f-12"}
    >
      <Select
        disabled={disabled}
        className={className ? `custom ${className}` : "custom"}
        bordered={bordered}
        // defaultValue={initialValue}
        onChange={onChange}
        value={value}
        mode={mode}
        dropdownClassName="dropdown"
        placeholder={placeholder}
        showSearch={showSearch}
        suffixIcon={ArrowIcon()}
        filterOption={(input: any, option: any) =>
         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
         
        }
        getPopupContainer={(trigger:any)=>trigger.parentNode}
      >
        {optionValue?.map((option: any, index: any) => {
          return (
            <Option
              value={option.value}
              key={option.value}
              className={optionClass ? `optionClass` : "options"}
            >
              {option.text}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};
export default SelectInput;
