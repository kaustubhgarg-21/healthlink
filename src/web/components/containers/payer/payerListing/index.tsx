import { Col, message, Row, Spin } from "antd"
import { up } from "../../../../images"
import { Breadcrumbs } from "../../../stateless/common/breadCrumbs"
import Button from "../../../stateless/common/button"
import { CompWrapper } from "../../../stateless/common/contentWrapper"
import { PayerRowCard } from "../../../stateless/payer/payerCard"
import "./payerList.less"
import { AppRoutes } from "../../../../router/appRoutes"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { clearState, PayerStateSelector } from "../../../../../redux/reducers/payer/payerReducer"
import { useEffect } from "react"
import { fetchPayers } from "../../../../../redux/actions/payer/payerAction"
import { CommonIcons } from "../../../../constants/enums"
export const PayerList = (props: any) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const {payers, payerCount, formState, isDeleted} = useSelector(PayerStateSelector)
    const handleChange = () =>{
        history.push(AppRoutes.CREATEPAYER)
    }
    useEffect(()=>{
        dispatch(fetchPayers({}))
    },[])
    const payerBreadCrumbs = [
        {
            text: "Dashboard",
            link: AppRoutes.LANDING,
        },
        {
            text: "Settings",
        },
    ];
    useEffect(()=>{
        if(formState.isSuccess){
            dispatch(clearState())
        }
    },[formState.isSuccess])
    useEffect(() => {
        if(isDeleted.isSuccess){
            message.success(`Deleted successfully`)
            dispatch(fetchPayers({}))
            dispatch(clearState())
        } else if(isDeleted.isError){
            message.error({content:isDeleted?.errorStack ? isDeleted?.errorStack : "Something went wrong", key:"appNotification"})
            dispatch(clearState())
        }
    },[isDeleted.isSuccess , isDeleted.isError])
    return (
        <Spin spinning = {formState.loading || isDeleted.loading}>
            <Row justify="space-between" className="innerHeader">
                <Col span={8} >
                    <Breadcrumbs  breadcrumbs={payerBreadCrumbs} />
                    <span className='platformUsers f-20'>Payer List</span>
                </Col>
                <Col md={5} lg={3} xl={3}>
                    <Button className=" " type="primary" htmlType='search' onClick={handleChange}><span className="material-icons-outlined">{CommonIcons.add}</span>ADD PAYER</Button>
                </Col>
            </Row>
            <Row className='listHeader'>
                <Col span={23}>
                    <Row className="payerHeader">
                        <Col md={6} lg={6} xl={6} className="orgListHead orgListHeadMgin">
                           PAYER NAME<img className="upIcon" src={up} />
                        </Col>
                        <Col md={4} lg={3} xl={5} className="orgListHead">
                            CITY,STATE
                        </Col>
                        <Col md={6} lg={6} xl={6} className="orgListHead">
                            EMAIL ADDRESS
                        </Col>
                        <Col md={4} lg={3} xl={5} className="orgListHead cityStyle">
                            MOBILE NO.
                        </Col>
                    </Row>
                </Col>
            </Row>
            <CompWrapper observeOn="listHeader">
                <div className="cardBmargin">
                {
                    payers?.map((mock, index) => {
                        return (
                            <PayerRowCard payer={mock} key={index} />
                        )
                    })
                }
                </div>
            </CompWrapper>
        </Spin>
    )
}