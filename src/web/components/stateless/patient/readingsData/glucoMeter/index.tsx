import { Row, Col, Card, Table, Divider } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { PatientStateSelector } from "../../../../../../redux/reducers/patient/patientReducer";
import { Biometricname } from "../../../../../constants/enums";
import { enumerateDaysBetweenDates, getBoundsForSingleReading, getFullChartDataWithEmptyData, getThresholdColumns, getThresholdsAccToUser } from "../../../../../../utility/utils";
import {
  chartIcon,
  expand,
  glucoMeter,
  leftFilled,
  rightFilled,
  tableIcon,
} from "../../../../../images";
import CustomTooltip from "../../../common/toolTip";
import { ExpandedModal } from "../expandedModal";
import { GlucoMeterChart } from "./glucoMeterChart";
import { GlucoMeterTable } from "./glucoMeterTable";


function formatDate(timestamp:any){
  return moment.utc(timestamp).local().format("MMM DD")
  }
export const GlucoMeter = (props: any) => {
  const { data, thresholds, params, setParams } = props;
  const [count ,setCount] = useState(6);
const dispatch= useDispatch()
const {selectedPatient} = useSelector(PatientStateSelector)
const {appUser} = useSelector(AuthStateSelector)
const getGlucoseChartData = (data: any) => {
  const result: any[] = [];
  let metaData = [
    ...data?.beforeBreakfast || [],
    ...data?.afterBreakfast|| [],
    ...data?.beforeDinner || [],
  ];
  if(metaData?.length > 0){
  setShowLabel(false)
  let uniqueDates: any = [];
  metaData.forEach((item) => uniqueDates.push(item?.date));

  uniqueDates = [...new Set(uniqueDates)];
  uniqueDates.forEach((date: any) => {
    let temp = {};
    //get Bound for that very date
    let bound = metaData?.find((item: any) => item?.date == date)?.Bounds;
    // Filter out beforeBreakfast value
    let beforeBreakfast = data?.beforeBreakfast.filter((item: any) => {
      if (formatDate(item.date) === formatDate(date)) {
        return item;
      }
    });
    beforeBreakfast = beforeBreakfast.length
      ? beforeBreakfast[0].glucose.value
      : null;

    // Filter out afterBreakfast value
    let afterBreakfast = data?.afterBreakfast.filter((item: any) => {
      if (formatDate(item.date) === formatDate(date)) {
        return item;
      }
    });
    afterBreakfast = afterBreakfast.length
      ? afterBreakfast[0].glucose.value
      : null;

    // Filter out beforeDinner value
    let beforeDinner = data?.beforeDinner?.filter((item: any) => {
      if (formatDate(item.date) === formatDate(date)) {
        return item;
      }
    });
    beforeDinner = beforeDinner.length ? beforeDinner[0].glucose.value : null;
    temp = {
      day: formatDate(date),
      glucoseBound: getBoundsForSingleReading(
       getThresholdsAccToUser(bound, appUser),
        "glucose"
      ),
      beforeBreakfast,
      afterBreakfast,
      beforeDinner,
    };
    result.push(temp);
  });
  return result;
}else {
  setShowLabel(true)
 var temp =  enumerateDaysBetweenDates(params.startDate, params.endDate).map((d: any, index)=>{
                return {
                  day : d,
                  glucoseBound: {},
                  beforeBreakfast: null,
                  afterBreakfast: null,
                  beforeDinner: null,
                }
              })
            return temp
            }
};
const dayConverter = count%6;

  const [expanded, setExpanded] = useState(false);
  const [viewType, setViewType] = useState(true);
  const [daysView ,setDaysView] = useState(14)
  const [alternateView , setAlternateView]= useState(30)
  const [expandedViewType, setexpandedViewType] = useState(true);
  const [chartData, setChartData] = useState<any>([]);
  const [showLabel, setShowLabel] = useState(true) 

  const worstData = data?.glucoseWorst? data?.glucoseWorst[0] : []

const onZoomClick = ()=>{
  if ( daysView==14) {
    setParams({...params, startDate: params?.startDate.add(14, "day"), endDate: params?.endDate})
setDaysView(30)
setAlternateView(14)
setCount(13)
  }else if(daysView==30){
setDaysView(14)
setAlternateView(30)
setCount(13)
setParams({...params, startDate: params?.startDate.subtract(14, "day"), endDate: params?.endDate})

}
}


const onModalClose = () => {
  setCount(6);
  setExpanded(false);
};
useEffect(() => {
  setChartData(getGlucoseChartData(worstData));
}, [data, count]);
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
    <Card className="readings-card">
      <Row>
        <Col  md={3} lg={2} xl={2} xxl={2}>
        <CustomTooltip placement="top" color="#FFFF" title="Glucose">
          <img src={glucoMeter} className="readingDataIcon"/>
          </CustomTooltip>
        </Col>
        <Col md={17} lg={18} xl={18} xxl={18} id="glucolegendRow" style={{paddingTop:"8px"}}> </Col>
        <Col span={2} onClick={() => setViewType(!viewType)} className="icons">
          {viewType ? <img src={tableIcon} className="utilIcon" /> : <img src={chartIcon}  className="utilIcon" />}
        </Col>
        <Col span={2} onClick={onOpenExpand} className="icons">
          <img src={expand} className="utilIcon icnExpnd" />
        </Col>
      </Row>
      <Row className="readings-table-row">
        <Col span={24}>
        {!expanded ? (
          <>
           {viewType ? (
            <GlucoMeterChart chartData={getFullChartDataWithEmptyData(chartData, enumerateDaysBetweenDates(
              params?.startDate,
               params?.endDate
             ))} showLabel={showLabel}/>
          ) : (
            <GlucoMeterTable data={data?.glucose} thresholds={thresholds}/>
          )}
          </>
        ):null}
         
        </Col>
      </Row>
      <ExpandedModal expanded={expanded} setExpanded={setExpanded} onModalClose={onModalClose}>
        <Row align="middle" gutter={18}>
          <Col  md={2} lg={1} xl={1} xxl={1}>
            <img src={glucoMeter} />
          </Col>
          <Col  md={14} lg={7} xl={8} xxl={7}>
            <div className="expandedTitle">
              <span className="readingTitle f-14">Glucometer</span>
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
          <Col  md={24} lg={9} xl={10} xxl={12} className="OrderChange"  id="glucolegendRowExpand" style={{ minHeight: "15px" }}>
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
              <img src={tableIcon} className="utilIcon" />
            ) : (
              <img src={chartIcon} className="utilIcon" />
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
          
        
            {expandedViewType && viewType? (
              <Col span={24}>
              <GlucoMeterChart chartData={getFullChartDataWithEmptyData(chartData, enumerateDaysBetweenDates(
                  params?.startDate,
                   params?.endDate
                 ))} expanded showLabel={showLabel}/>
              </Col>
            ) : (<>
              <Col md={24} lg={16} xl={17} xxl={17} className="pTopTable">
              
              <GlucoMeterTable data={data?.glucose} thresholds={thresholds}/>
             
              </Col>
              <Col md={24} xl={7} lg={7} xxl={7}>
                <Row className="expandedViewThresholds">
                  <Col span={24} className="thresholdHeading thresholdHeading1">
                    Thresholds
                  </Col>
                  <Divider style={{ margin: "8px" }}/>
                  <Col span={24}>
                    <Table className="readingsTable tblThreshold" columns={getThresholdColumns(Biometricname.GLUCO, thresholds)} dataSource={thresholds?.patientThresholdBounds} pagination={false}/>
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
