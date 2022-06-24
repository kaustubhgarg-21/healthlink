import { Col, Row } from "antd"
import { cross } from "../../../images"
import { AlertCard } from "../../stateless/alert"
import { NoAlertCard } from "../../stateless/alert/noAlertCard"
import "./alert.less"  
export const AlertBar = (props: any) => {
    const {openAlert , setOpenAlert, alertList} = props
    const handleClick = () =>{
        setOpenAlert(!openAlert)
    }
    return ( 
        <div className="alertContainer">
            <img className="crossICon" src={cross} onClick={handleClick}/>
            <Row className="rowAlert">
                <Col span={24} className="alertHead">Alerts</Col>
            </Row>
            <hr className="alertDivider"/>
            <Row className="alertListContainer scrollStyle">
                 {alertList?.length? alertList?.map((el:any)=>(
                    <Col span={24}><AlertCard alert={el}/></Col>
                 ))
                 :
                <Col span={24}><NoAlertCard/></Col> 
                }
            </Row>
        </div>
    )
}