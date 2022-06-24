import { Row, Col, Form } from "antd";
import InputBox from "../../common/inputBox";
import SelectInput from "../../common/selectInput";
import "./rolesFormStyle.less";
import TextArea from "../../common/textArea";
import { RegExpressions } from "../../../../constants/regexp";

function RolesForm(props: any) {
  const {
    data,
    setData,
    formId,
    getFormInfo,
    roleSelected,
    roleOptions,
    onRoleSelect,
    disableSave , 
    setDisableSave 
  } = props;
  const selectValue = [
    {
      text: "A",
      value: "a",
    },
    {
      text: "B",
      value: "b",
    },
  ];
  const handleChange = (e: any) => {
    var { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const roleStatus = (value: any) => {
    onRoleSelect(value);
  };
  const detectChange=()=>{
    if(setDisableSave){
      setDisableSave(false)
    }
  }
  return (
    <div>
      <Form layout="vertical" onFinish={getFormInfo} id={formId} onValuesChange={detectChange}>
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <InputBox
              labelSubName="Role Name"
              name="name"
              initialValue={data?.name}
              rules={[
                {
                  required: true,
                  message: "Please enter Role name",
                },
                {
                  pattern: RegExpressions.RoleName,
                  message: "Role name can have only alphabets"
                }
              ]}
              value={data?.name}
              onChange={handleChange}
            />
          </Col>
          {
            formId == "updateRole" ? null:
            <Col span={12}>
            <SelectInput
              labelSubName="Base Permissions"
              name="basicPermisson"
              bordered={true}
              value={roleSelected}
              optionValue={roleOptions}
              onChange={roleStatus}
            />
          </Col>
          }
          <Col span={24}>
            <TextArea
              labelSubName="Role Description"
              name="description"
              initialValue={data?.description}
              value={data?.roleDescription}
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: "Please enter Role Description",
                },
              ]}
            ></TextArea>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
export default RolesForm;