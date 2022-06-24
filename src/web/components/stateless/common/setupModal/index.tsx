import {Col, Modal, Row} from 'antd';
import { redCross, check } from "../../../../images";
import Button from "../button";
import "./setupModal.less"
import { ModalType } from "../../../../constants/enums";

interface SetupModalProps {
    type: ModalType.SUCCESS | ModalType.WARN,
    primaryText: string,
    secondaryText?: string,
    isSetupModalVisible: boolean,
    confirmButton: string,
    customModalInput?:any,
    cancelButton: string,
    confirmCallback: Function,
    cancelCallback: Function,
} 
const SetupModal = (props: SetupModalProps) => {
  const {
    type,
    primaryText,
    secondaryText,
    customModalInput,
    isSetupModalVisible,
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
  if(type == ModalType.WARN){
    return redCross
  }else return check
}
  return (
      <Modal
        wrapClassName="warnModal"
        onCancel={onCancelCallback}
        className={customModalInput? `modal-1 ${customModalInput}`: "modal-1"}
        centered 
        footer={null}
        visible={isSetupModalVisible}
      >
         <Row justify="center">
                <Col>
                    <img className="redCoss" src={getIconType()} />
                </Col>
            </Row>
            <Row>
                <Col xl={24} className="delete-message">
                    <span>{primaryText}</span>
                </Col>
            </Row>
            <Row>
                <Col xl={24} className="delete-text f-14">
                    <span>{secondaryText}</span>
                </Col>
            </Row>
            <Row gutter={10} >
                <Col xl={11} className="button-modal">
                    <Button type="secondary cancelClick" onClick={onCancelCallback}>{cancelButton}</Button>
                </Col>
                <Col xl={13} className="button-modal">
                 <span className='bt1'><Button  type="secondary deleteClick" onClick={onConfirmCallback}>{confirmButton}</Button></span>  
                </Col>
            </Row>
      </Modal>
  );
};

export default SetupModal;
