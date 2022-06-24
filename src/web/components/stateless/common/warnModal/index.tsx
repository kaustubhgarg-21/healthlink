import {Col, Modal, Row} from 'antd';
import { redCross,  greenTick } from "../../../../images";
import Button from "../button";
import "./warnModal.less"
import { ModalType } from "../../../../constants/enums";

interface WarnModalProps {
    type: ModalType.SUCCESS | ModalType.WARN,
    primaryText: string,
    secondaryText: string,
    isModalVisible: boolean,
    confirmButton: string | null,
    cancelButton: string | null,
    confirmCallback?: Function,
    cancelCallback: Function,
    tertiaryText? : string 
} 
const WarnModal = (props: WarnModalProps) => {
  const {
    type,
    primaryText,
    secondaryText,
    isModalVisible,
    confirmButton,
    cancelButton,
    confirmCallback,
    cancelCallback,
    tertiaryText
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
  if(type == ModalType.WARN){
    return redCross
  }else return greenTick
}
  return (
      <Modal
        wrapClassName="warnModal"
        onCancel={onCancelCallback}
        centered 
        footer={null}
        visible={isModalVisible}
      >
         <Row justify="center">
                <Col>
                    <img className="redCoss" src={getIconType()} />
                </Col>
            </Row>
            <Row justify="center">
                <Col xl={24} className={`primary-text ${type}`}>
                    <span>{primaryText}</span>
                </Col>
            </Row>
            <Row justify="center">
                <Col xl={24} className="secondary-text f-14">
                    <span>{secondaryText}</span>
                </Col>
            </Row>
            <Row justify="center">
                <Col xl={24} className="tertiary-text f-14">
                    <span>{tertiaryText}</span>
                </Col>
            </Row>
            <Row gutter={20} justify="center">
              {cancelButton ? 
                <Col md={12} lg={12} xl={12} xxl={12} className="button-modal">
                    <Button type="secondary cancelClick" onClick={onCancelCallback}>{cancelButton}</Button>
                </Col>
                : null
              }
              {confirmButton ? 
                <Col md={12} lg={12} xl={12} xxl={12} className="button-modal">
                    <Button type="secondary deleteClick" onClick={onConfirmCallback}>{confirmButton}</Button>
                </Col>
                : null}
            </Row>
      </Modal>
  );
};

export default WarnModal;