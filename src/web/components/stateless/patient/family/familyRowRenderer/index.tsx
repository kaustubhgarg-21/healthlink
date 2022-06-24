import { Form } from "antd";
import { useEffect, useState } from "react";
import InputBox from "../../../common/inputBox";

const CentreFamilyRendrer = (props: any) => {
  const { value } = props;
  const [initialValue, setValue] = useState(value);
  const [isEditEnable, setEditEnable] = useState(false);

  useEffect(() => {
    if (value == "") {
      setEditEnable(true);
    }
  }, []);

  return (
    <div className="cellRenderer">
      <div className="input-container">
        {isEditEnable ? (
          <Form id="familyMemberForm" onFinish={() => console.log(value)}>
            <InputBox
              name="centreName"
              initialValue={initialValue}
              value={initialValue}
              rules={[{ required: true, message: "Please enter the Name!" }]}
              onChange={(e: any) => setValue(e.target.value)}
            />
          </Form>
        ) : (
          <span>{value}</span>
        )}
      </div>
    </div>
  );
};
export default CentreFamilyRendrer;
