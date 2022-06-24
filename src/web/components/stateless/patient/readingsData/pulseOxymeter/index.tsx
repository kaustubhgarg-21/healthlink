import { Row, Col, Card, Table, Divider } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { PatientStateSelector } from "../../../../../../redux/reducers/patient/patientReducer";
import { Biometricname, UserRoles } from "../../../../../constants/enums";
import { enumerateDaysBetweenDates, getBoundsForSingleReading, getFullChartDataWithEmptyData, getThresholdColumns, getThresholdsAccToUser } from "../../../../../../utility/utils";
import {
  chartIcon,
  expand,
  leftFilled,
  rightFilled,
  spo2Icon,
  tableIcon,
} from "../../../../../images";
import CustomTooltip from "../../../common/toolTip";
import { ExpandedModal } from "../expandedModal";
import { OxymeterChart } from "./oxymeterChart";
import { OxymeterTable } from "./oxymeterTable";

export const Oxymeter = (props: any) => {
  const { data,thresholds, params, setParams } = props;
  const [count ,setCount] = useState(6);
  const [expanded, setExpanded] = useState(false);
  const [viewType, setViewType] = useState(true);
  const [daysView ,setDaysView] = useState(14)
  const [alternateView , setAlternateView]= useState(30)
  const [expandedViewType, setexpandedViewType] = useState(true);
  const {selectedPatient} = useSelector(PatientStateSelector)
  const dayConverter = count%6;
const dispatch = useDispatch();
const {appUser} = useSelector(AuthStateSelector)

const [chartData, setChartData] = useState<any[]>([]);
const [showLabel, setShowLabel] = useState(true)

 
      
  

  const onZoomClick = ()=>{
    if ( daysView==14) {
      setParams({...params, startDate: params?.startDate.add(14, "day"), endDate: params?.endDate})
setDaysView(30)
  setAlternateView(14)
  setCount(13);
    }else if(daysView==30){
  setDaysView(14)
setAlternateView(30)
setCount(13);
setParams({...params, startDate: params?.startDate.subtract(14, "day"), endDate: params?.endDate})

}
}


  const onModalClose = () => {
    setCount(6);
    setExpanded(false);
  };
  useEffect(() => {
    setChartData(getChartData());
  }, [data]);
  useEffect(() => {
    return setParams({
      ...params,
      startDate: moment().subtract(count, "day"),
      endDate: moment(),
    });
  }, [count]);
  const onNextClick = (e: any) => { 
    setParams({...params, startDate: params?.startDate.add(6, "day"), endDate: params?.endDate.add(6, "day")})
  };
  const onPrevClick = (e: any) => {
  setParams({...params, startDate: params?.startDate.subtract(6, "day"), endDate: params?.endDate.subtract(6, "day")})
  
  };
  
  const onOpenExpand = () => {
    setCount(29)
    setExpanded(true)
  }
  
const pulseWorst = data?.pulseoxWorst || [];
  const getChartData = () => {
    if(pulseWorst?.length> 0){
      setShowLabel(false)
    return pulseWorst?.map(({worstData}: any) => {
      const {Bounds} = worstData
      return {
        day: moment.utc(worstData?.date).local().format("MMM DD"),
        spo2: worstData?.spo2?.value,
        pulse: worstData?.heartRate?.value,
        pulseBound: getBoundsForSingleReading(  
          getThresholdsAccToUser(Bounds, appUser),
          "pulse"
        ),
        spo2Bound: getBoundsForSingleReading(
          getThresholdsAccToUser(Bounds, appUser),
          "spo2"
        ),
      };
    });
  }else{
    setShowLabel(true)
    return enumerateDaysBetweenDates(params?.startDate, params?.endDate).map((d: any)=>{
      return {
        day : d,
        spo2: null,
        pulse:null,
      }
    })
  }
  };
  return (
    <Card className="readings-card">
      <Row>
        <Col md={3} lg={2} xl={2} xxl={2}>
        <CustomTooltip placement="top" color="#FFFF" title="Pulse Ox">
          <img src={spo2Icon} className="readingDataIcon"/>
          </CustomTooltip>
        </Col>
        <Col md={17} lg={18} xl={18} xxl={18} id="pulseLegendRow" style={{paddingTop:"8px"}}> </Col>
        <Col span={2} onClick={() => setViewType(!viewType)} className="icons">
          {viewType ? <img src={tableIcon}  className="utilIcon"/> : <img src={chartIcon}  className="utilIcon"/>}
        </Col>
        <Col span={2} onClick={onOpenExpand} className="icons">
          <img src={expand} className=" utilIcon icnExpnd"  />
        </Col>
      </Row>
      <Row className="readings-table-row">
        <Col span={24}>
          {!expanded ? (
            <>
            {viewType ? (
            <OxymeterChart chartData={getFullChartDataWithEmptyData(chartData, enumerateDaysBetweenDates(
              params?.startDate,
               params?.endDate
             ))} showLabel={showLabel}/>
          ) : (
            <OxymeterTable data={data?.pulseox} thresholds={thresholds} />
          )}
            </>
          ) : null}
          
        </Col>
      </Row>
      <ExpandedModal expanded={expanded} setExpanded={setExpanded} onModalClose={onModalClose}>
        <Row align="middle">
          <Col md={2} lg={1} xl={1} xxl={1}>
            <img src={spo2Icon} />
          </Col>
          <Col md={14} lg={7} xl={8} xxl={7}>
          <div className="expandedTitle">
              <span className="readingTitle f-14">Pulse Ox</span>
              {
           expandedViewType ? 
           <>
              <span className="daysViewCount">({alternateView} days view)</span>

              <span onClick={onZoomClick} className="zoomLabel">
                {" "}
                <u>
                  <b>{daysView} days </b>
                </u>
              </span>
              </>
              : null 
}
            </div>

          </Col>
          <Col  md={24} lg={9} xl={10} xxl={12} className="plusOrderChange"  id="pulseLegendRowExpand" style={{minHeight:"16px"}}>
            </Col>
          <Col
            lg={1} md={2} xl={1} xxl={1}
            onClick={() => {
              setexpandedViewType(true);
              setViewType(!viewType);
            }} 
            className="icons"
          >
            {expandedViewType && viewType ? (
              <img src={tableIcon} className="utilIcon"/>
            ) : (
              <img src={chartIcon} className="utilIcon"/>
            )}
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
          
          
            {expandedViewType&& viewType? (
              <Col span={24}>
              <OxymeterChart chartData={getFullChartDataWithEmptyData(chartData, enumerateDaysBetweenDates(
                  params?.startDate,
                   params?.endDate
                 ))} expanded showLabel={showLabel}/>
              </Col>
            ) : (
            <>
            <Col  md={24} xl={17} lg={16} xxl={17} className="pTopTable">
            
              <OxymeterTable data={data?.pulseox} thresholds={thresholds} />
             
              </Col>
              <Col  md={24} xl={7} lg={7} xxl={7}>
                <Row className="expandedViewThresholds">
                  <Col span={24} className="thresholdHeading thresholdHeading1">
                    Thresholds
                  </Col>
                  <Divider style={{ margin: "8px" }}/>
                  <Col span={24}>
                    <Table className="readingsTable tblThreshold" columns={getThresholdColumns(Biometricname.PULSE, thresholds)} dataSource={thresholds?.patientThresholdBounds} pagination={false}/>
                  </Col>
                </Row>
              </Col>
              </>
            )}
           
        </Row>
      </ExpandedModal>
    </Card>
  );
};
