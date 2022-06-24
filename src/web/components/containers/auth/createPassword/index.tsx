import { useState, useEffect } from "react";
import { Row, Col, Form, Spin, message } from 'antd';
import { Card } from 'antd';
import Button from "../../../stateless/common/button";
import AuthLayout from "../../../stateless/layouts/authLayout";
import "./createPassword.less"
import InputPassword from "../../../stateless/common/inputPassword";
import { useDispatch,useSelector } from "react-redux";
import { resetPassword } from "../../../../../redux/actions/auth/authAction";
import { useHistory } from "react-router-dom";
import { AuthStateSelector, clearState } from "../../../../../redux/reducers/authReducer/authReducer";
import { AppRoutes } from "../../../../router/appRoutes";
import { Messages } from "../../../../constants/messages";
import { CommonIcons } from "../../../../constants/enums";

const CreatePassword = (props: any) => {
    const dispatch = useDispatch()
        const {formState} = useSelector(AuthStateSelector)

    const [entries, setEntries] = useState({
        newPasssword: "",
        confirmPassword: ""
    });
    const [error , setError] = useState<any>("")
    useEffect(()=>{
        entries.newPasssword != entries.confirmPassword ? setError(Messages.PWD_DOESNOT_MATCH) : setError(null)
    },[entries.confirmPassword])
     var searchToken = window.location;
     var access_token = new URLSearchParams(searchToken.search).get('token');
     
const history = useHistory();
    const handleChange = (event: any) => {
        setEntries({
            ...entries,
            [event.target.name]: event.target.value,
        })
    }
    const handleFormSubmit = (event: any) => {
        dispatch(resetPassword({token: access_token ,password: entries.newPasssword}))
    }
    useEffect(()=>{
        dispatch(clearState())
            return ()=>{
                dispatch(clearState())
            }
        },[])
    useEffect(()=>{
        if(formState.isSuccess == true){
        message.success(Messages.PWD_CREATED_SUCCESS)
        history.push(AppRoutes.LOGIN)
        }
        },[formState.isSuccess, formState.isError])        
    return (
        <Spin spinning={formState.loading}>
        <AuthLayout>
            <Row justify="center">
                <Col xs={20} sm={16} md={12} lg={12} xl={8}>
                    <Card className="Card changePass new" bordered={false}>
                        <p className="create f-20"><b>Create Password</b></p>
                        <p className="read f-14">
                        Please create a new password to login.</p>
                        <Form onFinish={handleFormSubmit} layout="vertical">
                        <Row className="newPass">

                            <Col span={24} >
                                <Row>
                                    <Col span={24}>
                                        <InputPassword
                                            labelSubName="New Password"
                                            placeholder="password"
                                            name='newPasssword'
                                            rules={[
                                                {required: true, message:"Please enter the password"},
                                                {
                                                pattern: new RegExp(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&,.#><|~{}():;"'/_=+-])[A-Za-z\d@$!%*?&,.#><|~{}():;"'/_=+-]{8,}$/),
                                                message: "Password must be a combination of alphabets, numbers and special characters"
                                                }
                                            ]}
                                            value={entries.newPasssword}
                                            onChange={handleChange}>
                                        </InputPassword>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="pass2">
                            <Col span={24}>        
                                <Row>
                                    <Col span={24}>
                                        <InputPassword
                                            labelSubName="Confirm New Password"
                                            placeholder="password"
                                            name='confirmPassword'
                                            rules={[
                                                entries?.confirmPassword?.length ? 
                                                {
                                                    message:Messages.PWD_DOESNOT_MATCH,
                                                    validator: (_:any, value: any) => { 
                                                        if (entries.newPasssword == value) {
                                                          return Promise.resolve();
                                                        } else {
                                                          return Promise.reject(Messages.PWD_DOESNOT_MATCH);
                                                        }
                                                    }
                                                } : {
                                                    required:true,
                                                    message: "Please enter the password"
                                                }                               
                                            ]}
                                            value={entries.confirmPassword}
                                            onChange={handleChange}>
                                        </InputPassword>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        {
                            formState.isError?
                            <Row>
                                <Col span={24}>
                                    <p className="errorMessage f-14">{formState?.errorStack}</p>
                                </Col>
                            </Row>
                            :
                            null
                        }
                        <Row>
                            <Col span={24}>
                                <Button type="primary" htmlType="submit"><span className="material-icons-outlined">{CommonIcons.lock}</span>Save New Password</Button>
                            </Col> 
                        </Row> 
                        </Form>   
                    </Card>
                </Col>
            </Row>
            </AuthLayout>
</Spin>
    )
}
export default CreatePassword;