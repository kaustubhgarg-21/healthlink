import { Checkbox, Form, Select } from "antd"
import { useEffect } from "react";
import "./multiInput.less"
export const MultiSelectInput = (props: any) => {
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
        showSearch,
        checkType,
        sel
    } = props;
    const getChecked = (option:any)=>{
        switch(checkType){
            case "centres":{
                return value?.some((data: any) => data?.centerId === option?.value)
            }
            case "department":{
                return value?.some((data: any) => data?.departmentId === option?.value)
            }
        }
    }


    useEffect(()=>{
        console.log("Update")
    },[value, initialValue])

    return (
        <Form.Item
            label={labelSubName}
            // initialValue={initialValue}
            name={name}
            rules={rules}
            className={customLabelClass ? `ib-0 f-12 ${customLabelClass}` : "ib-0 f-12"}
        >
            <Select
                className={className ? `custom f-12 ${className}` : "custom f-12"}
                bordered={bordered}
                style={{width:'100%'}}
                onChange={onChange}
                value={sel?sel:value}
                mode={mode}
                showArrow
                dropdownClassName="dropdown"
                placeholder={placeholder}
                defaultValue={initialValue}
                maxTagCount="responsive"
                showSearch={showSearch}
                filterOption={(input: any, option: any) =>{
                    console.log("yyyyy", option)
                
                return   (option.children[1]?.toLowerCase().indexOf(input.toLowerCase()) >= 0)
                }
                   }
                
            >
               
                 {optionValue?.map((option: any, index: any) => {
          return (
            <Option

              value={option?.value}
              key={option?.value}
              className={optionClass ? `optionClass` : "options multiselect"}
            > {option?.text}<Checkbox className="checkbox" checked={getChecked(option)}/>
               {/* {console.log(">>>>>",showChecked)} */}
            </Option>
          );
        })}
            </Select>
        </Form.Item>
    )
}