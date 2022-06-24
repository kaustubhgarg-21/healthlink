import {Col, Modal, Row} from 'antd';
import { redCross,  greenTick,  clockIcon } from "../../../../../images";
import Button from "../../../common/button";
import "./conflictModal.less"
import { ModalType } from "../../../../../constants/enums";
import moment from 'moment';
import { biometricNamesObject } from '../../../../../constants/constants';

interface WarnModalProps {
    type: ModalType.SUCCESS | ModalType.WARN,
    primaryText: string,
    providerName: string,
    isModalVisible: boolean,
    confirmButton: string | null,
    cancelButton: string | null,
    confirmCallback?: Function,
    cancelCallback: Function,
    biometricType : string,
    startTime: string,
    endTime: string
} 
const ConflictModal = (props: WarnModalProps) => {
  const {
    type,
    primaryText,
    providerName,
    isModalVisible,
    confirmButton,
    cancelButton,
    confirmCallback,
    cancelCallback,
    biometricType,
    startTime,
    endTime
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
      wrapClassName="connflictModal"
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
      <Row justify="center" className="mt-12">
        <Col xl={24} className="primary-text">
          <span className="primary-text f-16">{primaryText}</span>
        </Col>
      </Row>
      <Row justify="center" className="mt-12">
        <Col xl={12} style={{ textAlign: "right", paddingRight: "8px" }}>
          <span className="conflictSecondary providerKey f-14">
            Provider Name :{" "}
          </span>
        </Col>
        <Col xl={12} style={{ textAlign: "left" }}>
          <span className="conflictSecondary f-14"> {providerName}</span>
        </Col>
      </Row>
      <Row justify="center" className="mt-12">
        <Col xl={12} style={{ textAlign: "right", paddingRight: "8px" }}>
          <span className="conflictSecondary providerKey f-14">
            Biometric Type :{" "}
          </span>
        </Col>
        <Col xl={12} className="f-14" style={{ textAlign: "left" }}>
          <span className="conflictSecondary f-14"> {biometricNamesObject[biometricType]}</span>
        </Col>
      </Row>
      <Row justify="center" className="mt-12">
        <Col xl={12} style={{ textAlign: "right", paddingRight: "5px" }}>
          <img src={clockIcon} style={{ marginRight: "8px" }} />{" "}
          <span className="conflictSecondary providerKey f-14">
            Start Time :{" "}
          </span>
          <span className="conflictSecondary f-14">{moment.utc(startTime, 'HH:mm:ss').local().format('HH:mm')}</span>
        </Col>

        <Col xl={12} style={{ textAlign: "center", paddingRight: "5px" }}>
          <img src={clockIcon} style={{ marginRight: "8px" }} />{" "}
          <span className="conflictSecondary providerKey f-14">End Time :</span>{" "}
          <span className="conflictSecondary f-14">{moment.utc(endTime, 'HH:mm:ss').local().format('HH:mm')}</span>
        </Col>
      </Row>
      <Row gutter={20} justify="center">
        {cancelButton ? (
          <Col md={12} lg={12} xl={8} xxl={8} className="button-modal">
            <Button type="secondary cancelClick" onClick={onCancelCallback}>
              {cancelButton}
            </Button>
          </Col>
        ) : null}
        {confirmButton ? (
          <Col md={12} lg={12} xl={8} xxl={8} className="button-modal">
            <Button type="secondary deleteClick" onClick={onConfirmCallback}>
              {confirmButton}
            </Button>
          </Col>
        ) : null}
      </Row>
    </Modal>
  );
};

export default ConflictModal;