import { Row, Col, Card, Table, Divider } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer";
import { PatientStateSelector } from "../../../../../../redux/reducers/patient/patientReducer";
import {
  enumerateDaysBetweenDates,
  getBoundsForSingleReading,
  getFullChartDataWithEmptyData,
  getThresholdColumns,
  getThresholdsAccToUser,
} from "../../../../../../utility/utils";
import { Biometricname } from "../../../../../constants/enums";
import {
  bpReadingIcon,
  chartIcon,
  expand,
  leftFilled,
  rightFilled,
  tableIcon,
} from "../../../../../images";
import CustomTooltip from "../../../common/toolTip";
import { ExpandedModal } from "../expandedModal";
import { BPChart } from "./bpchart";
import { BPTable } from "./bpTable";

export const BloodPressure = (props: any) => {
  const { data, thresholds, params, setParams } = props;
  const [expanded, setExpanded] = useState(false);
  const [viewType, setViewType] = useState(true);
  const [expandedViewType, setexpandedViewType] = useState(true);
  const [count, setCount] = useState(6);
  const { selectedPatient } = useSelector(PatientStateSelector);
  const dayConverter = count % 7;
  const dispatch = useDispatch();
  const { appUser } = useSelector(AuthStateSelector);

  const [chartData, setChartData] = useState<any[]>([]);
const [daysView ,setDaysView] = useState(14)
const [alternateView , setAlternateView]= useState(30)
  const [showLabel, setShowLabel] = useState(true)
  const bpWorst = data?.bloodpressureWorst || [];
  const getChartData = () => {
    if (bpWorst?.length > 0) {  
      setShowLabel(false)
      return bpWorst?.map(({worstData}: any) => {
        const {Bounds} = worstData
        
        return {  
          day: moment.utc(worstData?.date).local().format("MMM DD"),
          systolic: worstData?.systolic?.value,
          diastolic: worstData?.diastolic?.value,
          heartRate: worstData?.heartRate?.value,
          systolicBound: getBoundsForSingleReading(
            getThresholdsAccToUser(Bounds, appUser),
            "systolic"
          ),
          diastolicBound: getBoundsForSingleReading(
            getThresholdsAccToUser(Bounds, appUser),
            "diastolic"
          ),
          heartRateBound: getBoundsForSingleReading(
            getThresholdsAccToUser(Bounds, appUser),
            "heartRate"
          ),
        };
      });
    } else {
      setShowLabel(true)
      return enumerateDaysBetweenDates(
       params?.startDate,
        params?.endDate
      ).map((d: any) => {
        return {
          day: d,
          systolic: null,
          diastolic: null,
          heartRate: null,
        };
      });
    }
  };
  const onZoomClick = () => {
    if (daysView == 14) {
      setParams({
        ...params,
        startDate: params?.startDate.add(14, "day"),
        endDate: params?.endDate,
      });
      setDaysView(30);
      setCount(13);
      setAlternateView(14);
    } else if (daysView == 30) {
      setDaysView(14);
      setAlternateView(30);
      setCount(13);
      setParams({
        ...params,
        startDate: params?.startDate.subtract(14, "day"),
        endDate: params?.endDate,
      });
    }
  };

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
        <Col md={3} lg={2} xl={2} xxl={2}>
          <CustomTooltip placement="top" color="#FFFF" title="Blood Pressure">
            <img src={bpReadingIcon} className="readingDataIcon" />
          </CustomTooltip>
        </Col>
        <Col
          md={17}
          lg={18}
          xl={18}
          xxl={18}
          id="legendRow"
          style={{ paddingTop: "8px" }}
         
        >
          {" "}
        </Col>

        <Col md={2} lg={2} xl={2} onClick={() => setViewType(!viewType)} className="icons">
          {viewType ? (
            <img src={tableIcon} className="utilIcon" />
          ) : (
            <img src={chartIcon} className="utilIcon" />
          )}
        </Col>
        <Col  md={2} lg={2} xl={2} onClick={onOpenExpand} className="icons">
          <img src={expand} className="utilIcon icnExpnd " />
        </Col>
      </Row>
      <Row className="readings-table-row">
        <Col span={24}>
          {!expanded ? (
            <>
              {viewType ? (
                <BPChart chartData={getFullChartDataWithEmptyData(chartData, enumerateDaysBetweenDates(
                  params?.startDate,
                   params?.endDate
                 ))} showLabel={showLabel}/>
              ) : (
                <BPTable data={data?.bloodpressure} thresholds={thresholds} />
              )}
            </>
          ) : null}
        </Col>
      </Row>
      <ExpandedModal
        expanded={expanded}
        setExpanded={setExpanded}
        onModalClose={onModalClose}
      >
        <Row align="middle" gutter={18}>
          <Col md={2} lg={1} xl={1} xxl={1}>
            <img src={bpReadingIcon} />
          </Col>
          <Col md={14} lg={7} xl={8} xxl={7}>
            <div className="expandedTitle">
              <span className="readingTitle f-14">Blood pressure</span>
              {
           expandedViewType? 
           <>
              <span className="daysViewCount">({alternateView} days view)</span>

              <span onClick={onZoomClick} className="zoomLabel">
                {" "}
                <u>
                  <b className="daysV">{daysView} days </b>
                </u>
              </span>
              </>
              : null 
}
            </div>
          </Col>
          <Col
            md={24} lg={9} xl={10} xxl={12} className="OrderChange"
            id="legendRowExpanded"
            style={{ minHeight: "15px" }}
          ></Col>
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
            <div className="duration-filter durationFilterModal f-14">
              <img src={leftFilled} onClick={onPrevClick} className="navigationIcon" />
              <span>7 days</span>
              <img src={rightFilled} onClick={onNextClick} className="navigationIcon"/>
            </div>
          </Col>
        </Row>
        <Row className="readings-table-row" gutter={24}>
          {expandedViewType && viewType ? (
            <Col span={24}>
              <BPChart chartData={getFullChartDataWithEmptyData(chartData, enumerateDaysBetweenDates(
                  params?.startDate,
                   params?.endDate
                 ))} expanded showLabel={showLabel}/>
            </Col>
          ) : (
            <>
              <Col  md={24} lg={16} xl={17} xxl={17} className="pTopTable tblBloodP ">
                <BPTable data={data?.bloodpressure} thresholds={thresholds} />
              </Col>
              <Col md={24} lg={7} xl={7} xxl={7}>
                <Row className="expandedViewThresholds">
                  <Col span={24} className="thresholdHeading thresholdHeading1">
                    Thresholds
                  </Col>
                  <Divider style={{ margin: "8px" }} />
                  <Col span={24}>
                    <Table
                      className="readingsTable tblThreshold"
                      columns={getThresholdColumns(
                        Biometricname.BP,
                        thresholds
                      )}
                      dataSource={thresholds?.patientThresholdBounds}
                      pagination={false}
                    />
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
