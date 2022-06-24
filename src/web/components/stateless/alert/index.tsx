import { Card, Col, Row } from "antd"
import moment from "moment"
import { inactive } from "../../../images"
import Alert from "../../../models/alert/alert"
import "./alertCard.less"

interface AlertCardProps {
    alert : Alert
}
export const AlertCard = (props:AlertCardProps) => {
    const {alert} = props
    return (<Card className="alertCard">
        <Row style={{alignItems:"start"}} gutter={10}>
            <Col span={16} className="senderAlert">{alert?.alertDetails?.name}</Col>
            {/* <Col span={}className="alertCardSubHeading"></Col> */}
            <Col span={7} className="alertCardSubHeading" style={{textAlign: "right"}}>{moment(alert?.createdAt).fromNow()}</Col>
            <Col span={1} ><img className="inactiveRed" src={inactive}/></Col>
            <Col span={24} className="messageAlert" dangerouslySetInnerHTML={{__html: alert?.alertDetails?.webDescription}}></Col>           
        </Row>
    </Card>
    )
}