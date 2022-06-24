import { Card, Col, Row } from "antd"

export const NoAlertCard = () => {
    return (
    <Card className="alertCard">
        <Row>
          <Col span={24}>
              You have no alerts!
          </Col>
        </Row>
    </Card>
    )
}