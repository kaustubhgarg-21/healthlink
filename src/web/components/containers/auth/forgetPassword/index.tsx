import { useState, useEffect } from "react";
import { Row, Col, Form, message, Spin } from 'antd';
import { Card } from 'antd';
import Button from "../../../stateless/common/button";
import InputBox from "../../../stateless/common/inputBox";
import AuthLayout from "../../../stateless/layouts/authLayout";
import "./forgetPassword.less"
import { CommonIcons, ModalCallBackTypes, ModalPrimaryMessages, ModalSecondaryMessages, ModalType } from "../../../../constants/enums";
import { useDispatch, useSelector } from "react-redux";
import WarnModal from "../../../stateless/common/warnModal"
import { requestChangePassword } from "../../../../../redux/actions/auth/authAction";
import { AuthStateSelector, clearPassword } from "../../../../../redux/reducers/authReducer/authReducer";
import { useHistory } from "react-router-dom";
import { AppRoutes } from "../../../../router/appRoutes";
import { RegExpressions } from "../../../../constants/regexp";

const ForgetPassword = (props: any) => {
    const { user } = props
    const [entries, setEntries] = useState({
        email: ""
    });
    const { passwordGenerated } = useSelector(AuthStateSelector)
    const [isWarnModalVisible, setIsWarnModalVisible] = useState(false)

    const history = useHistory()

    const handleCancelPass = () => {
        setIsWarnModalVisible(false)
    }
    const dispatch = useDispatch()
    const handleChange = (event: any) => {
        setEntries({
            ...entries,
            [event.target.name]: event.target.value,
        })
    }
    useEffect (()=>{
        if(passwordGenerated.isSuccess){
            message.success({content:`Link to change Password sent succesfully`})
            setIsWarnModalVisible(false)
            history.push(AppRoutes.LOGIN)
        } else if (passwordGenerated.isError) {
            setIsWarnModalVisible(true)
          }
          dispatch(clearPassword()) 
          },[passwordGenerated.isSuccess, passwordGenerated.isError])
          
    const handleFormSubmit =()=>{
        dispatch(requestChangePassword(entries))
    }
    return (
        <>
            <Spin spinning={passwordGenerated.loading} >
                <AuthLayout>
                    <Row justify="center">
                        <Col xs={20} sm={16} md={12} lg={12} xl={8}>
                            <Card className="Card change" bordered={false}>
                                <p className="forget f-20"><b>Forgot Password</b></p>
                                <p className="text2">Enter the email address associated with your account,
                                    and we will email you a link to reset your password.</p>
                                <Form onFinish={handleFormSubmit} layout="vertical">
                                    <Row className="email">

                                        <Col span={24} >
                                            <Row>
                                                <Col span={24}>
                                                    <InputBox
                                                        labelSubName="Email Address"
                                                        placeholder="Email Address"
                                                        name='email'
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "Please enter the Email Address"
                                                            },
                                                            {
                                                                pattern: RegExpressions.Email,
                                                                message: "Please enter valid email"
                                                            }]}
                                                        value={entries.email}
                                                        onChange={handleChange}>
                                                    </InputBox>

                                                </Col>
                                            </Row>
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Button type="primary" htmlType="submit"> <span className="material-icons-outlined">{CommonIcons.reset}</span>Send reset link</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </AuthLayout>
                <WarnModal
                    type={ModalType.WARN}
                    isModalVisible={isWarnModalVisible}
                    primaryText={ModalPrimaryMessages.NO_USER_FOUND}
                    secondaryText={
                        ModalSecondaryMessages.CONTACT_ADMIN}
                    cancelButton={ModalCallBackTypes.OK}
                    confirmButton={null}
                    cancelCallback={handleCancelPass}
                />
            </Spin>
        </>
    )
}
export default ForgetPassword;