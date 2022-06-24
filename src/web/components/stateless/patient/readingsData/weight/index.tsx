import {Row,Col,Card, Table, Divider} from "antd"
import { useEffect, useState } from "react"
import { chartIcon, expand, leftFilled, rightFilled, tableIcon, weightReadingsIcon } from "../../../../../images"
import { ExpandedModal } from "../expandedModal"
import { WeightChart } from "./wieghtChart"
import { WeightTable } from "./weightTable"
import { enumerateDaysBetweenDates, getBoundsForSingleReading, getFullChartDataWithEmptyData, getThresholdColumns, getThresholdsAccToUser } from "../../../../../../utility/utils"
import moment from "moment"
import { PatientStateSelector } from "../../../../../../redux/reducers/patient/patientReducer"
import { useDispatch,useSelector } from "react-redux"
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer"
import { Biometricname, UserRoles } from "../../../../../constants/enums"
import CustomTooltip from "../../../common/toolTip"

export const Weight = (props: any) => {
    const { data,thresholds, params, setParams} = props
    const [expanded, setExpanded] = useState(false)
    const [viewType, setViewType] = useState(true)
    const [expandedViewType, setexpandedViewType] = useState(true);
    const [count ,setCount] = useState(6);
    const [daysView ,setDaysView] = useState(14)
const [alternateView , setAlternateView]= useState(30)
    
    const {selectedPatient} = useSelector(PatientStateSelector)
    const dayConverter = count%7;
  const dispatch = useDispatch();
  const {appUser} = useSelector(AuthStateSelector)
 
  const [chartData, setChartData] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([])
  const [selectedScale, setSelectedScale] = useState("lbs")
const [showLabel, setShowLabel] = useState(true)
const getAssigneeId = (bound:any) => {
  if(appUser?.roleName == UserRoles.PROVIDER){
    return appUser?.id
  }else {
    return Object.keys(bound)[0]
  }
}
  const getActiveBound = (data: any) => {
    var x = ""
    const bound = data?.Bounds ? data?.Bounds : {}
    var id = getAssigneeId(bound)
    if(bound[id]?.some((th:any)=>th?.boundType == "heartFailure")){
    x= "heartFailure"
    }else if(bound[id]?.some((th:any)=>th?.boundType == "obesity")){
      x= "obesity"
    }
    return x
    }
useEffect(()=>{
setTableData(data?.weight?.map((r: any) => {
  return {
    ...r,
    weightChange: r[getActiveBound(r)]
  };
}))
},[data,params])

    const wtWrost = data?.weightWorst || []
    const getChartData = () => {
        if(wtWrost?.length> 0){
          setShowLabel(false)
        return  wtWrost?.map(({worstData}: any) => {
            const {Bounds} = worstData
            return {
              day: moment.utc(worstData?.date).local().format("MMM DD"),
              weight: worstData?.weight?.value,
              weightChange: worstData[getActiveBound(worstData)],
              heartFailure: worstData?.heartFailure,
              obesity: worstData?.obesity,
              weightBound : getBoundsForSingleReading(
               Bounds? getThresholdsAccToUser(Bounds, appUser): [],
               getActiveBound(worstData)
            ),            
            };
          });
        }else{
          setShowLabel(true)
            return enumerateDaysBetweenDates(params?.startDate, params?.endDate).map((d: any)=>{
                return {
                  day : d,
                  weightChange: null,
                }
              })
        };
    }

  useEffect(()=>{
    if (selectedScale == "kgs") {
      setTableData(
        data?.weight?.map((r: any) => {
          return {
            ...r,
            weight: {
              ...r.weight,
              value:parseFloat((0.45359237 * r?.weight?.value).toFixed(2)),
            },
            weightChange: parseFloat((0.45359237 *r[getActiveBound(r)]).toFixed(2))
          };
        })
      );
      setChartData(
        wtWrost?.map(({worstData}: any) => {
          const {Bounds} = worstData
          var x = 0.45359237 *worstData[getActiveBound(worstData)]
          return {
            day: moment.utc(worstData?.date).local().format("MMM DD"),
            weight: worstData?.weight?.value,
            weightChange: parseFloat(x.toFixed(2)),
            heartFailure: worstData?.heartFailure,
            obesity: worstData?.obesity,
            weightBound : {
              maxBound: Math.round(0.45359237 * getBoundsForSingleReading(
              getThresholdsAccToUser(Bounds, appUser), getActiveBound(worstData))?.maxBound ),
              minBound:Math.round(0.45359237 * getBoundsForSingleReading(
                getThresholdsAccToUser(Bounds, appUser), getActiveBound(worstData))?.minBound),
            }          
          };
        })
      );
    } else if (selectedScale == "lbs") {
      setTableData(data?.weight?.map((r: any) => {
        return {
          ...r,
          weightChange: r[getActiveBound(r)]
        }
      }))
      setChartData(
        wtWrost?.map(({worstData}: any) => {
          const {Bounds} = worstData
          return {
            day: moment.utc(worstData?.date).local().format("MMM DD"),
            weight: worstData?.weight?.value,
            weightChange: worstData[getActiveBound(worstData)],
            heartFailure: worstData?.heartFailure,
            obesity: worstData?.obesity,
            weightBound : getBoundsForSingleReading(
             Bounds? getThresholdsAccToUser(Bounds, appUser): [],
             getActiveBound(worstData)
          ),            
          };
        })
      )
    }
  }, [selectedScale]) 

 const getAvgWeight = () => {
   var x:any = 0
   tableData?.forEach((z:any)=>{
     x= x+z?.weight?.value
   })
   if(expanded){
     return x/30
   }else{
    return x/7
   }
 }        
useEffect(()=>{
  setSelectedScale("lbs")
},[params?.startDate, params?.endDate])
        

          const onZoomClick = ()=>{
            if ( daysView==14) {
              setParams({...params, startDate: params?.startDate.add(14, "day"), endDate: params?.endDate})
    setDaysView(30)
          setAlternateView(14)
          setCount(13)
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
              startDate: moment().subtract(count, "days"),
              endDate: moment(),
            });
          }, [count]);
        
const onOpenExpand = () => {
  setCount(29)
  setExpanded(true)
  }
          const onNextClick = (e: any) => { 
            setParams({...params, startDate: params?.startDate.add(7, "days"), endDate: params?.endDate.add(7, "days")})
          };
          const onPrevClick = (e: any) => {
          setParams({...params, startDate: params?.startDate.subtract(7, "days"), endDate: params?.endDate.subtract(7, "days")})
          
          };
    return (
      <Card className="readings-card weight">
        
        <Row>
          <Col span={3}>
            <CustomTooltip placement="top" color="#FFFF" title="Weight">
              <img src={weightReadingsIcon} className="readingDataIcon" />
            </CustomTooltip>
          </Col>
          <Col span={5}>
            <div className="units">
              <span
                className={selectedScale == "kgs" ? "active" : ""}
                onClick={() => setSelectedScale("kgs")}
              >
                kg
              </span>
              |
              <span
                className={selectedScale == "lbs" ? "active" : ""}
                onClick={() => setSelectedScale("lbs")}
              >
                lbs
              </span>
            </div>
          </Col>
          <Col md={12} xl={12} xxl={10} lg={12}>
            <span className="readings-additional-text  txtAvg f-12">
              7D Avg: <b>{getAvgWeight().toFixed(2)} {selectedScale}</b>
            </span>
          </Col>
          <Col
            lg={2} xl={2} xxl={3} md={2}
            onClick={() => setViewType(!viewType)}
            className="icons"
          >
            {viewType ? (
              <img src={tableIcon} className="utilIcon" />
            ) : (
              <img src={chartIcon} className="utilIcon" />
            )}
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
                  <WeightChart chartData={getFullChartDataWithEmptyData(chartData, enumerateDaysBetweenDates(
                    params?.startDate,
                     params?.endDate
                   ))} showLabel={showLabel}/>
                ) : (
                  <WeightTable data={tableData} thresholds={thresholds} getActiveBound={getActiveBound}/>
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
          <Row align="middle">
            <Col md={2} xl={1} lg={1}>
              <img src={weightReadingsIcon} />
            </Col>
            <Col  md={9} xl={10} lg={9}>
              <div className="expandedTitle">
                <span className="readingTitle f-14">Weight</span>
                {expandedViewType && viewType ? (
                  <>
                    <span className="daysViewCount">({alternateView} days view)</span>

                    <span onClick={onZoomClick} className="zoomLabel">
                      {" "}
                      <u>
                        <b>{daysView} days </b>
                      </u>
                    </span>
                  </>
                ) : null}
              </div>
            </Col>
            <Col md={5} lg={6} xl={8} xxl={9}>
              <span className="readings-additional-text f-12">
               {expanded? "30D Avg": "7D Avg"}: <b>{getAvgWeight().toFixed(2)} {selectedScale}</b>{" "}
              </span>
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
            
            {expandedViewType && viewType ? (
              <Col span={24}>
                <WeightChart chartData={getFullChartDataWithEmptyData(chartData, enumerateDaysBetweenDates(
                  params?.startDate,
                   params?.endDate
                 ))} expanded showLabel={showLabel}/>{" "}
              </Col>
            ) : (
              <>
                <Col  md={24} xl={17} lg={16} xxl={17} className="pTopTable">
                  <WeightTable data={tableData} thresholds={thresholds} getActiveBound={getActiveBound}/>
                </Col>
                <Col md={24} xl={7} lg={7} xxl={7} className="expandedViewThresholds">
                  <Row>
                    <Col span={24} className="thresholdHeading thresholdHeading1">
                      Thresholds
                    </Col>
                    <Divider style={{ margin: "16px" }} />
                    <Col span={24}>
                      <Table
                        className="readingsTable tblThreshold"
                        columns={getThresholdColumns(Biometricname.WEIGHT, thresholds)}
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
}