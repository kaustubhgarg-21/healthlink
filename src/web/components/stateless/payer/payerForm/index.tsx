import { Card, Col, Form, Row } from "antd"
import { getCountriesList } from "../../../../../utility/appUtil"
import { RegExpressions } from "../../../../constants/regexp"
import Button from "../../common/button"
import InputBox from "../../common/inputBox"
import { PhoneInput } from "../../common/phoneInput"
import SelectInput from "../../common/selectInput"
export const PayerForm = (props: any) => {
  const { payerDetails, setDetails, handleSave, setSelectedTab, setpayerForm, formId ,disableSave , setDisableSave } = props
  const handleChange = (e: any) => {
    setDetails({ ...payerDetails, [e.target.name]: e.target.value })
  }
  const handleCountrySelect = (value: any) => {
    setDetails({
      ...payerDetails,
      ["country"]: value,
    });
  }
  const detectChange=()=>{
    if(setDisableSave){
      setDisableSave(false)
    }
  }
  return (
    <div >
      <Card className="addPayer">
        <Form
          id={formId}
          layout="vertical"
          onFinish={() => handleSave(payerDetails)}
          onValuesChange={detectChange}
        >
          <Row className="row">
            <Col
              span={8}
              className="col"
              xs={20}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            >
              <InputBox
                labelSubName="Company Name"
                name="companyName"
                value={payerDetails?.companyName}
                initialValue={payerDetails?.companyName}
                rules={[
                  {
                    required: true,
                    message: "Please enter Company Name",
                  },
                  {
                    pattern: RegExpressions.CompanyName,
                    message: "Please enter a valid Company name"
                  }
                ]}
                onChange={handleChange}
              />
            </Col>
            <Col
              span={8}
              className="col"
              xs={20}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            >
              <InputBox
                labelSubName="Contact Name"
                name="contactName"
                value={payerDetails?.contactName}
                initialValue={payerDetails?.contactName}
                selectInput={" "}
                onChange={handleChange}
              />
            </Col>
            <Col
              span={8}
              className="col"
              xs={35}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            >
              <InputBox
                labelSubName="Email Address"
                name="email"
                value={payerDetails?.email}
                initialValue={payerDetails?.email}
                rules={[
                  {
                    required: false,
                    message: "Please enter Email Address",
                  },
                  {
                    pattern:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+).*$/,
                    message: "Please enter a valid email",
                  },
                ]}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="row">
            <Col
              span={8}
              className="col"
              xs={20}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            > <PhoneInput
                name="contactNumber"
                label="Contact Number"
                value={payerDetails?.contactNumber}
                initialValue={payerDetails?.contactNumber}
                obj={payerDetails}
                setObj={setDetails}
                detectChange={detectChange}
              />
            </Col>
            <Col
              span={8}
              className="col"
              xs={20}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            ><PhoneInput
                name="mobileNumber"
                label="Mobile Number"
                value={payerDetails?.mobilNumber}
                initialValue={payerDetails?.mobilNumber}
                // rules={
                //   {
                //     required: false,
                //     message: "Please enter mobile number",
                //   }}
                obj={payerDetails}
                setObj={setDetails}
                detectChange={detectChange}
              />
            </Col>
            <Col
              span={8}
              className="col"
              xs={20}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            >
              <InputBox
                labelSubName="Address 1"
                name="address1"
                value={payerDetails?.address1}
                initialValue={payerDetails?.address1}
                rules={[
                  {
                    required: false,
                    message: "Please enter Address 1",
                  },
                ]}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="row">
            <Col
              span={8}
              className="col"
              xs={20}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            >
              <InputBox
                labelSubName="Address 2"
                name="address2"
                value={payerDetails?.address2}
                initialValue={payerDetails?.address2}
                rules={[
                  {
                    required: false,
                    message: "Please enter Address 2",
                  },
                ]}
                onChange={handleChange}
              />
            </Col>
            <Col
              span={8}
              className="col"
              xs={20}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            >
              <InputBox
                labelSubName="City"
                name="city"
                value={payerDetails?.city}
                initialValue={payerDetails?.city}
                rules={[
                  {
                    required: false,
                    message: "Please enter City",
                  },
                  {
                    pattern: RegExpressions.City,
                    message: "Please enter valid city"
                  }
                ]}
                onChange={handleChange}
              />
            </Col>
            <Col
              span={8}
              className="col"
              xs={20}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            >
              <InputBox
                labelSubName="State/Province"
                name="state"
                value={payerDetails?.state}
                initialValue={payerDetails?.state}
                rules={[
                  {
                    required: false,
                    message: "Please enter State/Province",
                  },
                  {
                    pattern: RegExpressions.State,
                    message: "Please enter valid state/province"
                  }
                ]}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row className="row">
            <Col
              span={8}
              className="col"
              xs={20}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            >
              <SelectInput
                labelSubName="Country"
                placeholder="Select country"
                name="country"
                initialValue={payerDetails?.country}
                rules={[
                  {
                    required: false,
                    message: "Please select Country",
                  },
                ]}
                className="card-dropdown with-search"
                bordered={true}
                value={payerDetails?.country}
                optionValue={getCountriesList()}
                onChange={handleCountrySelect}
                showSearch
              />
            </Col>
            <Col
              span={8}
              className="col"
              xs={20}
              sm={16}
              md={12}
              lg={8}
              xl={40}
            >
              <InputBox
                labelSubName="Zip/PostalCode"
                name="zipCode"
                placeholder="eg. 00000-0000"
                value={payerDetails?.zipCode}
                initialValue={payerDetails?.zipCode}
                rules={[
                  {
                    required: false,
                    message: "Please enter Zip/PostalCode",
                  },
                  {
                    pattern: RegExpressions.ZipCode,
                    message: "Please enter valid Zip/Postal code",
                  }
                ]}
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Form>
        {
        setSelectedTab ?
          <Row className="btnpateintfooter" justify="end" gutter={20}>
            <Col span={4}>
              <Button type="primary" onClick={() => setpayerForm(false)}>Cancel</Button>
            </Col>
          </Row> :
          null
      }
      </Card>      
    </div>
  )
}