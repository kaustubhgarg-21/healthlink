import { Row, Col, Card, Table, Divider } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { PatientStateSelector } from "../../../../../../redux/reducers/patient/patientReducer";
import { Biometricname, UserRoles } from "../../../../../constants/enums";
import { enumerateDaysBetweenDates, getBoundsForSingleReading, getFullChartDataWithEmptyData, getThresholdColumns, getThresholdsAccToUser } from "../../../../../../utility/utils";
import {
  chartIcon,
  expand,
  leftFilled,
  rightFilled,
  tableIcon,
  temperature,
} from "../../../../../images";
import CustomTooltip from "../../../common/toolTip";
import { ExpandedModal } from "../expandedModal";
import { TemperatureChart } from "./temperatureChart";
import { TemperatureTable } from "./temperatureTable";

export const Temperature = (props: any) => {
  const { data, thresholds, params, setParams } = props;
  const [expanded, setExpanded] = useState(false);
  const [viewType, setViewType] = useState(true);
  const [expandedViewType, setexpandedViewType] = useState(true);
  const [count ,setCount] = useState(6);
  const {selectedPatient} = useSelector(PatientStateSelector)
  const dayConverter = count%6;
const dispatch = useDispatch();
const {appUser} = useSelector(AuthStateSelector)

const [chartData, setChartData] = useState<any[]>([]);
const [showLabel, setShowLabel] = useState(true) 
const [tableData, setTableData] = useState<any[]>([])
const [daysView ,setDaysView] = useState(14)
const [alternateView , setAlternateView]= useState(30)
const [selectedScale, setSelectedScale] = useState("c")

  const tpWrost = data?.temperatureWorst || [];
  const getChartData = () => {
    if(tpWrost?.length> 0){
      setShowLabel(false)
    return tpWrost?.map(({worstData}: any) => {
      const {Bounds} = worstData
      return {
        day: moment.utc(worstData?.date).local().format("MMM DD"),
        temperature: worstData?.temperature?.value,
        temperatureBound: getBoundsForSingleReading(
          getThresholdsAccToUser(Bounds, appUser),

          "temperature"
        ),
      };
    });
  }else{
    setShowLabel(true)
    return enumerateDaysBetweenDates(params?.startDate, params?.endDate).map((d: any)=>{
      return {
        day : d,
        temperature: null,
      }
    })
  }
  };

  

  
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
  const onModalClose = () => {
    setCount(6);
    setExpanded(false);
  };
  useEffect(() => {
    setChartData(getChartData());
  }, [data]);
  useEffect(()=>{
    setTableData(data?.temperature)
    },[data])
  useEffect(()=>{
    if(selectedScale == "c"){
      setTableData(data?.temperature)
      setChartData(tpWrost?.map(({worstData}: any) => {
        const {Bounds} = worstData
        return {
          day: moment.utc(worstData?.date).local().format("MMM DD"),
          temperature: worstData?.temperature?.value,
          temperatureBound: getBoundsForSingleReading(
            getThresholdsAccToUser(Bounds, appUser),
            "temperature"
          ),
        };
      }))
  
     } else if(selectedScale == "f"){
      setTableData(data?.temperature?.map( (r: any)=>{return{...r, temperature: {...r.temperature, value: Math.round(r?.temperature?.value * 9/5) + 32}}}))
      setChartData(tpWrost?.map(({worstData}: any) => {
        const {Bounds} = worstData
        return {
          day: moment.utc(worstData?.date).local().format("MMM DD"),
          temperature:  Math.round(worstData?.temperature?.value* 9/5) + 32,
          temperatureBound: {
            maxBound: Math.round(getBoundsForSingleReading(
            getThresholdsAccToUser(Bounds, appUser),"temperature")?.maxBound * 9/5) + 32,
            minBound: Math.round(getBoundsForSingleReading(
              getThresholdsAccToUser(Bounds, appUser),"temperature")?.minBound * 9/5) + 32,
          }
        };
      }))
  
    }
  }, [selectedScale]) 
  useEffect(() => {
    return setParams({
      ...params,
      startDate: moment().subtract(count, "days"),
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
  
return (
    <Card className="readings-card Temperature">
      <Row align="middle">
        <Col span={3}>
        <CustomTooltip placement="top" color="#FFFF" title="Temperature">
          <img src={temperature} className="readingDataIcon"/>
          </CustomTooltip>
        </Col>
        <Col md={17} xl={17} xxl={15} lg={17}>
          <div className="units"><span className={selectedScale == "c"? "active": ""} onClick={()=>setSelectedScale("c")}>°C</span>|<span className={selectedScale == "f"? "active": ""} onClick={()=>setSelectedScale("f")}>°F</span></div>
        </Col>
        <Col lg={2} xl={2} xxl={3} md={2} onClick={() => setViewType(!viewType)} className="icons">
          {viewType ? <img src={tableIcon}  className="utilIcon"/> : <img src={chartIcon}  className="utilIcon"/>}
        </Col>
        <Col lg={2} xl={2} xxl={3} md={2} onClick={onOpenExpand} className="icons">
          <img src={expand} className="utilIcon icnExpnd" />
        </Col>
      </Row>
      <Row className="readings-table-row">
        <Col span={24}>
        {!expanded ? (
          <>
          {viewType ? (
            <TemperatureChart chartData={getFullChartDataWithEmptyData(chartData, enumerateDaysBetweenDates(
              params?.startDate,
               params?.endDate
             ))} showLabel={showLabel}/>
          ) : (
            <TemperatureTable data={tableData} thresholds={thresholds} />
          )}
          </>
        ) : null}
        </Col>
      </Row>
      <ExpandedModal expanded={expanded} setExpanded={setExpanded} onModalClose={onModalClose}>
      <Row align="middle">
                <Col span={1}>
                    <img src={temperature}/>
                </Col>
                <Col  md={14} lg={15} xl={17} xxl={19}>
            <div className="expandedTitle">
              <span className="readingTitle f-14">Temperature</span>
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
         
            {expandedViewType && viewType ? (
               <Col span={24}>
              <TemperatureChart chartData={getFullChartDataWithEmptyData(chartData, enumerateDaysBetweenDates(
                  params?.startDate,
                   params?.endDate
                 ))} expanded showLabel={showLabel}/>
              </Col>
            ) : (
            <>
              <Col  md={24} xl={17} lg={16} xxl={17} className="pTopTable">
                
              <TemperatureTable data={data?.temperature} thresholds={thresholds} />
             
              </Col>
              <Col lg={7} md={24} xl={7} xxl={7}>
                <Row className="expandedViewThresholds">
                  <Col span={24} className="thresholdHeading thresholdHeading1">
                    Thresholds
                  </Col>
                  <Divider style={{ margin: "8px" }}/>
                  <Col span={24}>
                    <Table className="readingsTable tblThreshold" columns={getThresholdColumns(Biometricname.TEMPRATURE, thresholds)} dataSource={thresholds?.patientThresholdBounds} pagination={false}/>
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
