import { Row, Col, Card, Table, Divider } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { getThresholdColumns } from "../../../../../../utility/utils";
import { Biometricname } from "../../../../../constants/enums";
import {
  expand,
  leftFilled,
  rightFilled,
  spiro,
  spo2Icon,
} from "../../../../../images";
import CustomTooltip from "../../../common/toolTip";
import { ExpandedModal } from "../expandedModal";
import { SpirometerTable } from "./spirometerTable";

export const Spirometer = (props: any) => {
  const { data, thresholds, params, setParams } = props;
  const [expanded, setExpanded] = useState(false);
  const [viewType, setViewType] = useState(true);
  const [daysView ,setDaysView] = useState(14)
  const [count ,setCount] = useState(6);
const [alternateView , setAlternateView]= useState(30)
  const onZoomClick = ()=>{
    if ( daysView==14) {
      setParams({...params, startDate: params?.startDate.add(14, "day"), endDate: params?.endDate})
setDaysView(30)
  setAlternateView(14)
    }else if(daysView==30){
  setDaysView(14)
setAlternateView(30)
setParams({...params, startDate: params?.startDate.subtract(14, "day"), endDate: params?.endDate})

}
}
const onNextClick = (e: any) => { 
  setParams({...params, startDate: params?.startDate.add(6, "day"), endDate: params?.endDate.add(6, "day")})
};
const onPrevClick = (e: any) => {
setParams({...params, startDate: params?.startDate.subtract(6, "day"), endDate: params?.endDate.subtract(6, "day")})

};
useEffect(() => {
  return setParams({
    ...params,
    startDate: moment().subtract(count, "days"),
    endDate: moment(),
  });
}, [count]);
const onOpenExpand = () => {
  setCount(29)
  setExpanded(true)
}
const onModalClose = () => {
  setCount(6);
  setExpanded(false);
};
  return (
    <Card className="readings-card">
      <Row>
        <Col md={3} lg={2} xl={2}>
        <CustomTooltip placement="top" color="#FFFF" title="Spirometer">
          <img src={spiro} />
        </CustomTooltip>
        </Col>
        <Col md={17} lg={18} xl={18}>
          <span className="readingTitle f-14"></span>
        </Col>
        <Col span={2}>
        </Col>
        <Col span={2} onClick={onOpenExpand} className="icons">
          <img src={expand} className="icnExpnd utilIcon"/>
        </Col>
      </Row>
      <Row className="readings-table-row">
        <Col span={24}>
          <SpirometerTable data={data?.spirometry} thresholds={thresholds} />
        </Col>
      </Row>
      <ExpandedModal expanded={expanded} setExpanded={setExpanded}  onModalClose={onModalClose}>
        <Row className="ant-row-middle">
          <Col lg={1} md={2} xl={1} xxl={1}>
            <img src={spo2Icon} />
          </Col>
          <Col md={6} lg={16} xl={19} xxl={20}>
          <div className="expandedTitle">
              <span className="readingTitle f-14">Spirometer</span>

              <span className="daysViewCount">({alternateView} days view)</span>

              <span onClick={onZoomClick} className="zoomLabel">
                {" "}
                <u>
                  <b className="daysV">{daysView} days </b>
                </u>
              </span>
            </div>
          </Col>
          <Col md={6} lg={6} xl={4} xxl={3}>
          <div className="duration-filter durationFiltermap durationFilterModal f-14">
              <img src={leftFilled} onClick={onPrevClick} className="navigationIcon"/>
              <span>7 days</span>
              <img src={rightFilled} onClick={onNextClick} className="navigationIcon"/>
            </div>
        
          </Col>
        </Row>
        <Row className="readings-table-row" gutter={24}>
          <Col md={24} lg={16} xl={17} xxl={17} className="pTopTable">
         
            <SpirometerTable data={data?.spirometry} thresholds={thresholds} />
              </Col>
              <Col md={24} lg={7} xl={7} xxl={7}>
                <Row className="expandedViewThresholds">
                  <Col span={24} className="thresholdHeading thresholdHeading1">
                    Thresholds
                  </Col>
                  <Divider style={{ margin: "8px" }}/>
                  <Col span={24}>
                    <Table className="readingsTable tblThreshold" columns={getThresholdColumns(Biometricname.SPIRO, thresholds)} dataSource={thresholds?.patientThresholdBounds} pagination={false}/>
                  </Col>
                </Row>
              </Col>
        </Row>
      </ExpandedModal>
    </Card>
  );
};
