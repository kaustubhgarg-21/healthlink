import React from "react";
import { Col, Form, Input, Modal, Row } from "antd";
import { redCross, check } from "../../../../images";
import Button from "../button";
import "./inputModal.less";
import { ModalType } from "../../../../constants/enums";

interface InputModalProps {
  type: ModalType.SUCCESS | ModalType.WARN;
  labelSubName?: string;
  initialValue?: any;
  rules?: any;
  name?: string;
  onChange?: any;
  customModelLabelClass?: any;
  customModalInput?: any;
  value?: string;
  placeholder?: string;
  secondaryText?: string;
  isWarnModalVisible?: boolean;
  confirmButton?: string;
  cancelButton?: string;
  customLabelClass?: string;
  confirmCallback?: Function;
  cancelCallback?: Function;
}

const InputModal = (props: InputModalProps) => {
  const {
    type,
    name,
    onChange,
    value,
    initialValue,
    rules,
    customLabelClass,
    customModalInput,
    customModelLabelClass,
    secondaryText,
    labelSubName,
    placeholder,
    isWarnModalVisible,
    confirmButton,
    cancelButton,
    confirmCallback,
    cancelCallback,
  } = props;

  const onConfirmCallback = () => {
    if (confirmCallback) {
      confirmCallback();
    }
  };

  const onCancelCallback = () => {
    if (cancelCallback) {
      cancelCallback();
    }
  };
  const getIconType = () => {
    if (type == ModalType.WARN) {
      return redCross;
    } else return check;
  };

  return (
    <Modal
      wrapClassName="inputModal"
      onCancel={onCancelCallback}
      centered
      footer={null}
      visible={isWarnModalVisible}
    >
      <Form layout="vertical">
        <Form.Item
          label={labelSubName}
          initialValue={initialValue}
          name={name}
          rules={rules}
          className={
            customModelLabelClass ? `im-0 ${customModelLabelClass}` : "im-0"
          }
        >
          <Input.TextArea
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            className={customModalInput ? `ib-1 ${customModalInput}` : "ib-1"}
            rows={7}
          />
        </Form.Item>
      </Form>
      <Row gutter={20} justify="end">
        <Col xl={7} className="button-modal">
          <Button type="secondary cancelClick" onClick={onCancelCallback}>
            {cancelButton}
          </Button>
        </Col>
        <Col xl={7} className="button-modal">
          <Button type="secondary deleteClick" onClick={onConfirmCallback}>
            {confirmButton}
          </Button>
        </Col>
      </Row>
    </Modal>
  );
};

export default InputModal;
