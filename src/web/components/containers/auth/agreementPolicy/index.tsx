import React, { useState, useEffect } from "react";
import { Row, Col, Form, Spin, Checkbox } from 'antd';
import Button from "../../../stateless/common/button"
import AuthLayout from "../../../stateless/layouts/authLayout";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateSelector, clearState } from "../../../../../redux/reducers/authReducer/authReducer";
import { SideBarStateSelector } from "../../../../../redux/reducers/sideBarReducer";
import "./agreementPolicy.less"
import { updatePolicyCheck } from "../../../../../redux/actions/auth/authAction";

export const AgreementPolicy = () => {
    const {appUser, formState} = useSelector(AuthStateSelector)
    const {filesList} = useSelector(SideBarStateSelector)
    const [isPolicyRead,setIsPolicyRead] = useState(false)
    const dispatch = useDispatch()

    const onAgreeClick = (e:any) => {
        const {checked} = e.target
        setIsPolicyRead(checked)
    }

    const onConfirm = () => {
        dispatch(updatePolicyCheck(appUser))
    }

    useEffect(()=>{
        if(formState?.isSuccess){
            dispatch(clearState())
        }else if(formState?.isError){
            dispatch(clearState())
        }
    },[formState.isSuccess, formState.isSuccess])

return(
<AuthLayout>
    <Spin spinning={formState.loading}>
            <Row >
                <Col span={16} offset={4} className="mainAgrmtPolicy">
                <div className="agreementPolicy">
                <div className="agreementHeader">
                TERMS &amp; CONDITIONS OF USE  
                </div>
                <div dangerouslySetInnerHTML={{__html: filesList?.agreementPolicy?.fileCode}}></div>
               <Row>
                 <Col span={24} className="agreeText">
                 <Checkbox value={isPolicyRead} onChange={onAgreeClick}>
                    I agree with the legal terms & condition
                </Checkbox> 
                 </Col>  
               </Row>
               <Row justify="end">
                   <Col span={6}>
                       <div className="btncontinue">
                       <Button type="primary" disabled={!isPolicyRead} onClick={onConfirm}>Continue</Button>
                       </div>

                   </Col>
               </Row>
                </div>
              
              
                </Col>           
            </Row>
            
    </Spin>
</AuthLayout>
)
}