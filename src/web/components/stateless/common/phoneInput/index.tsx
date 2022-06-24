import { Form, Input, Select } from "antd";
import { Country } from 'country-state-city'
import { resolve } from "node:path/win32";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Messages } from "../../../../constants/messages";
import { downIcon } from "../../../../images";
import "./phoneInput.less"

export const PhoneInput = (props: any) => {
  const [contryCodes, setcountryCode] = useState<string[]>([]);
  const cCodes = Country.getAllCountries().map((country) => country.phonecode);
  function reverseString(str: any) {
    if (obj[name]) {
      const arrayStrings = str.split("");
      const reverseArray = arrayStrings.reverse();
      const joinArray = reverseArray.join("");

      return joinArray;
    }
    else {
      return []
    }
  }

  function splitString(str: any) {
    if (obj[name]) {
      const splitArray = str.match(/.{1,10}/g)
      return splitArray.map((x: string) => {
        return reverseString(x)
      });
    }
    else {
      return []
    }
  }
  const ArrowIcon = () => {
    return <img src={downIcon} />
  }
  const { label, name, rules, obj, setObj, expanded, detectChange } = props
  const { Option } = Select
  const [selectedCode, setSelectedCode] = useState(obj ? splitString(reverseString(obj[name]))[1]|| "+1" : "+1")
  const [phone, setPhone] = useState(obj ? splitString(reverseString(obj[name]))[0] : "")
  const onSelect = (value: any) => {
    detectChange()
    setSelectedCode(value.replace(/[()]/g, ''))
  }
  const handleChange = (e: any) => {
    setPhone(e.target.value)
    detectChange()
    setObj({ ...obj, [name]: selectedCode ? selectedCode + e.target.value.replace(/[-]/g, '') : e.target.value.replace(/[-]/g, '') })
  }
  const options = Country.getAllCountries().map((country) => {
    return (
      {
        label: `${country.name}`,
        value: `+${country.phonecode}`
      }
    )
  })
  let x = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./[0-9]*$")
  useEffect(() => {
    setObj({ ...obj, [name]: (selectedCode && phone?.length) ? selectedCode + phone?.replace(/[-_]/g, '') : phone?.replace(/[-_]/g, '') })
  }, [selectedCode,phone])
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={obj ? obj[name] : ""}
      rules={rules ? [rules, {
        message: `Please enter the valid ${label}`,
        validator: (_: any, value: any) => {
          const s = selectedCode?.substring(1)
          let z = phone?.replace(/[-_]/g, '')
          if (selectedCode && cCodes.includes(s)) {
          if (!z) {
            return Promise.reject()
          } else {
            if (x.test(phone)) {
              return Promise.resolve();
            } else {
              return Promise.reject();
            }
          }
        }
      }
      }] : [{
        message: `Please enter the valid ${label}`,
        validator: (_: any, value: any) => {
          let z = phone?.replace(/[-_]/g, '')
          if (!z) {
            return Promise.resolve();
          } else {
            if (x.test(phone)) {
              return Promise.resolve();
            } else {
              return Promise.reject(Messages.PWD_DOESNOT_MATCH);
            }
          }
        }
      }]}
      className={"ib-0 f-12"}
    >
      <div className={expanded ? "phoneInput expanded" : "phoneInput"} >
        <Select
          className="custom "
          bordered={false}
          defaultValue="+1"
          onChange={onSelect}
          value={selectedCode}
          dropdownClassName="dropdown"
          dropdownMatchSelectWidth={150}
          placeholder=""
          suffixIcon={ArrowIcon()}
          showSearch
          filterOption={(input: any, option: any) =>
            option.children[0]?.props?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          getPopupContainer={(trigger: any) => trigger.parentNode}
        >
          {options.map((option, index) => {
            return (
              <Option key={index} value={option.value}>
                <span className="label">{option.label}</span>
                <span> ({option.value})</span>
              </Option>
            )
          })}
        </Select>
        <InputMask
          className="maskedInput"
          value={phone}
          onChange={handleChange}
          mask="999-999-9999"
        // maskPlaceholder={null}
        />
      </div>
    </Form.Item>
  )
}

