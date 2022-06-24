import { useEffect, useState } from "react";
import { Col, Row, Spin, message } from "antd";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import Button from "../../../stateless/common/button";
import "./createPayer.less";
import { PayerForm } from "../../../stateless/payer/payerForm";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import Payer from "../../../../models/payer/payer";
import { useDispatch, useSelector } from "react-redux";
import { PayerStateSelector,  clearState} from "../../../../../redux/reducers/payer/payerReducer";
import { createPayer } from "../../../../../redux/actions/payer/payerAction";
import { ModalSecondaryMessages, ModalType } from "../../../../constants/enums";
import WarnModal from "../../../stateless/common/warnModal";
import { useHistory } from "react-router-dom";
import { AppRoutes } from "../../../../router/appRoutes";
import { removeEmptyKeys } from "../../../../../utility/utils";
const CreatePayer = () => {
  const [payerDetails, setList] = useState<Payer>({
    companyName: "",
    contactName: "",
    contactNumber: "",
    mobileNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const dispatch = useDispatch()
  const history = useHistory();
  const { formState} = useSelector(PayerStateSelector)
  const [showModal, setShowModal] = useState(false)
  const handleSave = (payerDetails: any) => {
   dispatch(createPayer(removeEmptyKeys(payerDetails)))
  };
  useEffect(()=>{
    if(formState.isSuccess == true){
      setShowModal(true)
      dispatch(clearState())
    }else if(formState.isError){
      message.error({content:formState?.errorStack ? formState?.errorStack : "Something went wrong", key:"appNotification"})
      dispatch(clearState())
    }
  },[formState.isSuccess, formState.isError])
  const onModalClose = () => {
    history.push(AppRoutes.PAYERLIST)
  }
  const payerBreadCrumbs = [
    {
        text: "Dashboard",
        link: AppRoutes.LANDING,
    },
    {
        text: "Settings",
    },
];
  return (
    <Spin spinning={formState.loading}>
      <Row className="innerHeader ">
        <Col span={20} className="payerBrd">
          <Breadcrumbs  breadcrumbs={payerBreadCrumbs}/>
          <p className="brdOrganisations f-20">CREATE PAYER</p>
        </Col>
        <Col span={4}>
          <Button type="primary" form="payerId" htmlType="submit">
            Save
          </Button>
        </Col>
      </Row>
      <CompWrapper observeOn="innerHeader">
        <div style={{marginTop:"30px"}}>
        <PayerForm payerDetails={payerDetails} setDetails={setList} handleSave={handleSave} formId="payerId"/>
        </div>
      </CompWrapper>
      <WarnModal cancelButton={null} confirmButton={null} isModalVisible={showModal} type={ModalType.SUCCESS} cancelCallback={onModalClose} primaryText={`${payerDetails?.companyName}`} secondaryText={ModalSecondaryMessages.ENTITY_ADDED}/>
    </Spin>
  );
};
export default CreatePayer;