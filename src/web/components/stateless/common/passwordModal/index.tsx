import { Card, Col, Modal, Row } from "antd"
import copy from "copy-to-clipboard";
import { useRef, useState } from "react";
import { copyIcon, greenTick } from "../../../../images"
import Button from "../button";
import "./passwordModal.less"

export const PasswordModal = (props: any) => {
    const { userName, password, modalText, onCancel, nameText } = props;
    const [copyText, setCopyText] = useState();

    const handleCopyText = (e: any) => {
        setCopyText(e.target.value);
    }

    const copyToClipboard = () => {
        copy(`${userName} ${password}`);
    }

    const { isPasswordModalVisible } = props
    return (
        <Modal
            wrapClassName="passwordModal"
            centered
            footer={null}
            visible={isPasswordModalVisible}
            onCancel={onCancel}
            
        >
            <Row className="pass-message">
                <Col span={24}><img src={greenTick} /></Col>
                <Col span={24} className="secondary-text f-14">
                    <span className="pass-text">{nameText}</span>
                </Col>
                <Col span={24}>{modalText}</Col>
                <Col span={24} className="copyCard">
                    <Card className="card-modal">
                        <Row>
                            <Col span={22}>
                                <Row className="copyRow">
                                    <Col span={24}>
                                        <span onChange={handleCopyText}><b>User ID:</b> {userName}</span>
                                    </Col>
                                    <Col span={24}>
                                        <span onChange={handleCopyText} ><b>Password:</b> {password}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={2} className="copyIconCol">
                                <img className="copyIcon" onClick={copyToClipboard} src={copyIcon} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Modal>
    )
}