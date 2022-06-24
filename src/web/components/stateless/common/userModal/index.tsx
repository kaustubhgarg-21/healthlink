import { Card, Col, Modal, Row } from "antd"
import { link } from "fs";
import { greenTick, redCross } from "../../../../images";
import "./userModal.less"

export const UserModal = (props: any) => {
    const {
        isModalVisible,
        cancelCallback,
        confirmCallback,
        uploadedUsers
    } = props;

    const onCancelCallback = () => {
        if (cancelCallback) {
            cancelCallback();
        }
    };

    const onConfirmCallback = () => {
        if (confirmCallback) {
            confirmCallback();
        }
    };

    const getIconType = () => {
        if(uploadedUsers?.successCount == "0"){
        return redCross
    }else{
        return greenTick
    }
}
    
    return (
        <Modal
            wrapClassName="userModal"
            onCancel={onCancelCallback}
            centered
            footer={null}
            visible={isModalVisible}
        >
            <Row justify="center" gutter={[0,20]}>
                <Col>
                    <img className="redCoss" src={getIconType()} />
                </Col>
                <Col></Col>
            </Row>
            <Row justify="center">
                <Col xl={24} className={`primary-text`}>
                    <span>{`${uploadedUsers?.successCount} users imported successfully`} </span>
                    <span>{`, ${uploadedUsers?.failedCount} failed`}</span>
                   { uploadedUsers?.alreadyExistCount > 0 ? <span>{`, ${uploadedUsers?.alreadyExistCount} users already exist .`}</span> : null}
                </Col>
            </Row>
            <Row justify="center" className="userModalRow">
                <Col xl={24} className="secondary-text f-14">
                    <span>Click {<u><a className="linkUserModal" href={uploadedUsers?.excel_URL}><b>here</b></a></u>} to download the detailed report .</span>
                </Col>
            </Row>
        </Modal>
    )
}