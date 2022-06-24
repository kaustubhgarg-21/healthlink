import { Col, Form, Modal, Row } from "antd";
import {resend} from "../../../../images";
import Button from "../button";
import InputBox from "../inputBox";
import "./resetModal.less"

export const ResetModal = (props:any) =>{
    const {isResetModalVisible , onReset, value, cancelCallback } = props
    // console.log(isResetModalVisible)

    const onCancelCallback = () => {
        if (cancelCallback) {
          cancelCallback();
        }
    }
    return (
        <Modal
        key={isResetModalVisible}
          wrapClassName="resetModal"
          centered 
          footer={null}
          onCancel={onCancelCallback}
          visible={isResetModalVisible}
        >
              <Row className="rest-message">
                  <Col span={24} >
                      <span>Send Reset Password Link </span>
                  </Col>
              </Row>
              <Form layout="vertical">
              <Row justify="center" className="email-row">
                  <Col span={24}>
                  <InputBox 
                  labelSubName="Email Address"
                  value={value}
                  disabled
                  initialValue={value}
                  name="email"/>
                  </Col>
              </Row>
              </Form>
              <Row gutter={20} justify="center">
                  <Col span={24} className="button-modal">
                      <Button type="secondary reset-link" onClick={onReset} ><img className="resentLink" src={resend}/>Send Reset Link</Button>
                  </Col>
              </Row>
        </Modal>
    );
  
}