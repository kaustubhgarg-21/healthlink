import { Col, message, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePayer } from "../../../../../redux/actions/payer/payerAction";
import { clearState, PayerStateSelector } from "../../../../../redux/reducers/payer/payerReducer";
import Payer from "../../../../models/payer/payer";
import { AppRoutes } from "../../../../router/appRoutes";
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs";
import Button from "../../../stateless/common/button";
import { CompWrapper } from "../../../stateless/common/contentWrapper";
import { PayerForm } from "../../../stateless/payer/payerForm";
import "./payerEdit.less"
export const PayerDetails = (props: any) => {
    const { formState,selectedPayer, isUpdated } = useSelector(PayerStateSelector)
    const [disableSave , setDisableSave] = useState(true)
    const [payerEdit, setPayerEdit] = useState<Payer>({
        id: selectedPayer?.id? selectedPayer?.id : "" ,
        companyName: selectedPayer?.companyName? selectedPayer?.companyName : "",
        contactName: selectedPayer?.contactName? selectedPayer?.contactName : "",
        contactNumber: selectedPayer?.contactNumber? selectedPayer?.contactNumber : "",
        mobileNumber: selectedPayer?.mobileNumber? selectedPayer?.mobileNumber : "",
        address1: selectedPayer?.address1? selectedPayer?.address1 : "",
        address2: selectedPayer?.address2? selectedPayer?.address2 : "",
        city: selectedPayer?.city? selectedPayer?.city : "",
        state: selectedPayer?.state? selectedPayer?.state : "",
        country: selectedPayer?.country? selectedPayer?.country : "",
        zipCode: selectedPayer?.zipCode? selectedPayer?.zipCode : "",
        email: selectedPayer?.email? selectedPayer?.email : ""
    });
    const dispatch = useDispatch()
    const payerBreadCrumbs = [
        {
            text: "Dashboard",
            link: AppRoutes.LANDING,
        },
        {
            text: "Settings",
        },
    ];
    const history = useHistory();
    const onModalClose = () => {
        history.push(AppRoutes.PAYERLIST)
      }
    const handleSave = (payerDetails: any) => {
        dispatch(updatePayer(payerEdit))
    }
    useEffect(()=>{
        if(isUpdated.isSuccess == true){
          message.success(`${selectedPayer?.companyName} Updated Successfully`)
          dispatch(clearState())
          setDisableSave(true)
        }else if(isUpdated.isError){
          message.error({content:isUpdated?.errorStack ? isUpdated?.errorStack : "Something went wrong", key:"appNotification"})
          dispatch(clearState())
        }
      },[isUpdated.isSuccess, isUpdated.isError])
    return (
        <Spin spinning={formState.loading || isUpdated.loading}>
            <Row className="innerHeader payerDetails">
                <Col md={18} lg={20} xl={20} xxl={20}>
                    <Breadcrumbs breadcrumbs={payerBreadCrumbs} />
                    <p className="brdOrganisations f-20">{selectedPayer?.companyName}</p>
                </Col>
                <Col md={6} lg={4} xl={4} xxl={4}>
                    <Button type="primary" form="payerUpdate" htmlType="submit" disabled={disableSave}>
                        Save Changes
                    </Button>
                </Col>
            </Row>
            <CompWrapper observeOn="innerHeader">
                <div style={{ marginTop: "30px" }}>
                    <PayerForm payerDetails={payerEdit} setDetails={setPayerEdit} handleSave={handleSave} formId="payerUpdate"  setDisableSave={setDisableSave}
                disableSave={disableSave}/>
                </div>
            </CompWrapper>
        </Spin>
    );
};