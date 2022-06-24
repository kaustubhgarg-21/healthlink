import { Card, Col, Dropdown, Menu, Row } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePayer } from "../../../../../redux/actions/payer/payerAction";
import { setSelectedPayer } from "../../../../../redux/reducers/payer/payerReducer";
import { replaceAll } from "../../../../../utility/appUtil";
import { ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType } from "../../../../constants/enums";
import { bin, editSmall, elipse } from "../../../../images";
import Payer from "../../../../models/payer/payer";
import { AppRoutes } from "../../../../router/appRoutes";
import ProfileIcon from "../../common/profileThumbnail";
import WarnModal from "../../common/warnModal";
import "./payerCard.less"
interface PayerCardProps{
    payer : Payer
}
export const PayerRowCard = (props:PayerCardProps) => {
    const { payer } = props;
    const history = useHistory();
    const dispatch = useDispatch()
    const [isModalVisible,setIsModalVisible] = useState(false)
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const editClick = () => {
        dispatch(setSelectedPayer(payer))
        history.push(AppRoutes.EDITPAYER)
    }
    const showModal = () =>{
        setIsModalVisible(true)
    }
    const handleDelete = () => {
        dispatch(deletePayer({id : payer?.id} as Payer))
        setIsModalVisible(false)
    }
    const menu = (
        <Menu className="actionMenu menuStyling">
          <Menu.Item key="0" className="menuItemStyling" onClick={editClick}>
           <img src={editSmall} className="red edIcon "/>Edit
          </Menu.Item>
          <Menu.Item key="1" className="menuItemStyling" onClick={showModal}>
          <img src={bin} className="red deIcon"/>Delete
          </Menu.Item>
        </Menu>
      );
      return (
        <div className='payerListContainer'>
            <Card className="payerListCard">
                <Row >
                    <Col md={22} lg={23} xl={23} xxl={23} className='userRow1'>
                        <Row className="userCard" >
                            <Col md={2} lg={2} xl={2} className="userProfile">
                                {/*  */}
                                <ProfileIcon name={payer?.companyName} size="48"/>
                            </Col>
                            <Col md={4} lg={4} xl={4} className="userName">
                                <div className="orgNameContentSlicing">{payer?.companyName}</div>
                            </Col>
                            <Col md={4} lg={3} xl={5} className="userProfile f-12">
                                {payer?.city}
                            </Col>
                            <Col md={8} lg={6} xl={6} className="userProfile f-12">
                                {payer?.email}
                            </Col>
                            <Col md={4} lg={3} xl={5} className="userContactNo f-12">
                            {payer?.mobileNumber}
                            </Col>
                            </Row>
                            </Col>
                            <Col md={2} xl={1} xxl={1} lg={1} className="userButton mbpadding userRow2 ddlpayor">
                                <Dropdown overlayClassName='actionMenu' overlay={menu}>
                                        <img src={elipse}/>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Card>
                    <WarnModal
        type={ModalType.WARN}
        isModalVisible={isModalVisible}
        primaryText={ModalPrimaryMessages.DELETE_PAYER}
        secondaryText={replaceAll(/\{0\}/gi, ModalSecondaryMessages.DELETE_ORGANIZATION, payer?.companyName )}
        cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.DELETE}
        cancelCallback={handleCancel}
        confirmCallback={handleDelete}      />
                </div>
                )
}