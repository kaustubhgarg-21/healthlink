import { useState, useEffect } from "react";
import { Row, Col, Form, Spin } from 'antd';
import { Card } from 'antd';
import "./login.less"
import Button from "../../../stateless/common/button";
import InputBox from "../../../stateless/common/inputBox";
import AuthLayout from "../../../stateless/layouts/authLayout";
import InputPassword from "../../../stateless/common/inputPassword";
import { AppRoutes } from "../../../../router/appRoutes";
import { CommonIcons, LocalStorageKeys } from "../../../../constants/enums";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateSelector, clearState } from "../../../../../redux/reducers/authReducer/authReducer";
import { authenticateUser, privacyPolicy } from "../../../../../redux/actions/auth/authAction";
import { TermsAndConditions } from "../../../stateless/common/termsAndConditionModal";
import { useHistory } from "react-router-dom";
import { getData } from "../../../../../utility/appUtil";
import { SideBarStateSelector } from "../../../../../redux/reducers/sideBarReducer";
import { RegExpressions } from "../../../../constants/regexp";

const Login = (props: any) => {
    const [entries, setEntries] = useState({
        username: "",
        password: ""
    });
    const { formState } = useSelector(AuthStateSelector)
    const { filesList } = useSelector(SideBarStateSelector)
    const dispatch = useDispatch()
    const history = useHistory();
    const [showModal, setShowModal] = useState(false)
    const [showModalVisible, setShowModalVisible] = useState(false)
    //getting and storing IP for requests
    useEffect(()=>{
        getData().then((ip:string)=>{
            localStorage.setItem(LocalStorageKeys.IP, ip)
        })
            .catch(e => console.log("failed to get IP"))
    }, [])
    const handleChange = (Event: any) => {
        setEntries({
            ...entries,
            [Event.target.name]: Event.target.value,
        })
    }
    const handleFormSubmit = (event: any) => {
        dispatch(authenticateUser(entries))
    }
useEffect(()=>{
dispatch(privacyPolicy())
},[])
    const onModalClose = () => {
        setShowModal(!showModal)
        history.push(AppRoutes.LOGIN)
      }
      const onModalCloseBtn =()=>{
          setShowModalVisible(!showModalVisible)
          history.push(AppRoutes.LOGIN)
      }
    useEffect(()=>{
    dispatch(clearState())
        return ()=>{
            dispatch(clearState())
        }
    }, [])
    return (
        <Spin spinning={formState.loading}>
            <AuthLayout>
                <Row justify="center">
                    <Col xs={20} sm={16} md={12} lg={12} xl={8}>
                        <Card className="Card loginPage" bordered={false}>
                            <p className="para f-20"><b>Welcome to Health</b><b className="GreenLink">Link</b></p>
                            <p className="para2 f-14">Sign in to continue...</p>
                            <Form onFinish={handleFormSubmit} layout="vertical">
                                <Row className="user">
                                    <Col span={24} >
                                        <Row>
                                            <Col span={24}>
                                                <InputBox
                                                    labelSubName="Username"
                                                    placeholder="username"
                                                    name='username'
                                                    rules={[{
                                                        required: true,
                                                        message: "Please enter your username"
                                                    }, {
                                                        pattern: RegExpressions.UserName,
                                                        message: "Please enter a valid username"
                                                    }]}
                                                    value={entries.username}
                                                    onChange={handleChange}>
                                                </InputBox>

                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                                <Row className="pass">
                                    <Col span={24}>

                                        <Row>
                                            <Col span={24}>
                                                <InputPassword
                                                    labelSubName="Password"
                                                    placeholder="password"
                                                    name='password'
                                                    rules={[{
                                                        required: true, message: "Please enter your password"
                                                    },
                                                    {
                                                        pattern: new RegExp(/^.{8,}$/),
                                                        message: "Please enter a valid password"
                                                    }
                                                    ]}
                                                    value={entries.password}
                                                    onChange={handleChange}>
                                                </InputPassword>
                                            </Col>
                                        </Row>
                                    </Col>

                                </Row>
                                {
                                    formState.isError || entries.password.length != 0 ?
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
                                        <Button type="primary" htmlType="submit" className="btnlogin"> <span className="material-icons-outlined ">{CommonIcons.login}</span>Login</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <p className="forgotLink f-12"><u><a href={AppRoutes.FORGETPASSWORD}>Forgot Password?</a><br /></u></p>
                                    </Col>
                                    <Col span={24}>
                                        <p className="help f-10">By clicking login, you agree to our <u><span className="termsConditions" onClick={() => setShowModal(true)}>Terms of Service</span></u> and have read and
                                            acknowledge our <u><span className="termsConditions" onClick={() => setShowModalVisible(true)}>Privacy Policy</span></u></p>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>

            </AuthLayout>
            <TermsAndConditions
                isModalVisible={showModal}
                cancelCallback={onModalClose}
                content={filesList?.privacypolicy?.fileCode}
                title="Terms of Service"
            />
            <TermsAndConditions
                isModalVisible={showModalVisible}
                cancelCallback={onModalCloseBtn}
                content={filesList?.termsConditions?.fileCode}
                title="Privacy Policy"
            />
        </Spin>
    )
}
export default Login;