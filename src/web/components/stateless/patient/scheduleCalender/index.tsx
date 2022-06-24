import { Row, Col, Card } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { leftFilled, rightFilled } from "../../../../images";
import { DailyScheduleTable } from "./dailySchedule/dailySchedule";
import "./dailySchedule.less"
import { WeeklyScheduleTable } from "./weeklySchedule/weeklyTable";
import { MonthSchedule } from "./monthSchedule/monthScheduleCalendar";
import { CommonIcons } from "../../../../constants/enums";
import { useLocation } from "react-router-dom";
import { setDailyScheduleData, setMonthlyScheduleData, setWeeklyScheduleData } from "./scheduleDataTranformers";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedulePlan } from "../../../../../redux/actions/hrm/hrmActions";
import { patientStateSelector } from "../../../../../redux/reducers/hrm/hrmReducer";

const PatientCalendar = (props:any) => {
    const {selectedPatient} = props
    const { schedulePlan} = useSelector(patientStateSelector)
    const [selectedDay, setSelectedDay] = useState<any>(moment())
    const [selectedFormat, setSelectedFormat] = useState<any>("DD MMMM YYYY")
    const [selectedFormat1, setSelectedFormat1] = useState<any>("MMMM YYYY")

    const [selectedDuration, setSelectedDuration] = useState<any>("day")
    const [span ,setSpan] = useState<any>({})
    const [tableData, setTableData] = useState<any>([])
    const [days,setDays] = useState([])
    const dispatch = useDispatch()
    const location = useLocation<any>()
    const duration = location?.state? location?.state?.duration : undefined
    useEffect(()=>{
        if(duration){
            setSelectedDuration(duration)
        }
    },[location?.state])

    useEffect(()=>{
       if(selectedDuration == "day"){
        dispatch(fetchSchedulePlan({
            patientId: selectedPatient?.id,
            fromDate: selectedDay.format("YYYY-MM-DD"),
            toDate: selectedDay.format("YYYY-MM-DD")
        }))
       } else if(selectedDuration == "week"){
       dispatch(fetchSchedulePlan({
        patientId: selectedPatient?.id,
        fromDate: span?.startDate?.format("YYYY-MM-DD"),
        toDate: span?.endDate?.format("YYYY-MM-DD")
    }))
    
    setSelectedFormat("DD")
} else if(selectedDuration == "month"){
    dispatch(fetchSchedulePlan({
        patientId: selectedPatient?.id,
        fromDate: moment(selectedDay).startOf('month').format('YYYY-MM-DD'),
        toDate: moment(selectedDay).endOf('month').format('YYYY-MM-DD')
    }))

}
    },[selectedDuration, selectedDay, span])
    useEffect(()=>{
        if(selectedDuration == "week"){
            setSpan({...span, startDate: selectedDay.clone().weekday(1), endDate: selectedDay.clone().weekday(7)})
            
        }
        else if(selectedDuration == "month"){
            setSelectedFormat("MMMM YYYY")
        }
    },[selectedDuration])

    useEffect(()=>{
        switch(selectedDuration){
            case"day":
                return setTableData(setDailyScheduleData(schedulePlan, selectedDay.format("YYYY-MM-DD")))
            case "week":
                return  setTableData(setWeeklyScheduleData(schedulePlan))
            case "month":
                return setTableData(setMonthlyScheduleData(schedulePlan))
            }
    },[schedulePlan, selectedDuration, selectedDay])

    const getDate = () => {
        switch(selectedDuration){
            case"day":
            return <span className="dateFormat f-20">{selectedDay.format(selectedFormat)}</span>
            case "week":
                return <span className="dateFormat f-20">{span?.startDate?.format(selectedFormat)} - {span?.endDate?.format(selectedFormat)} {moment(span?.endDate).format("MMMM YYYY")}</span>
            case "month":
                return <span className="dateFormat f-20">{selectedDay.format(selectedFormat)}</span> 
            }
    }
    const onDayClick = () => {
        setSelectedDuration("day")
        setSelectedFormat("DD MMMM YYYY")
    }
    const onWeekClick = () => {
        setSelectedDuration("week")
        setSelectedFormat("DD")
        setSpan({...span, startDate: selectedDay.clone().weekday(1), endDate: selectedDay.clone().weekday(7)})
    }
    const getDays = () => {
        var daysBetween: any = []
        var now = span?.startDate.clone()
        while(now.isSameOrBefore(span?.endDate)){
            daysBetween.push(now.format("DD-MM-YYYY"))
            now.add(1, "days")
        }
        setDays(daysBetween)
    }
    useEffect(()=>{
        if(selectedDuration == "week"){
            getDays()
        }
    },[span])
    const onMonthClick = () => {
        setSelectedDuration("month")
        setSelectedFormat1("MMMM YYYY")
        
    }
    const setNext = () => {
        switch(selectedDuration){
            case"day":
                return setSelectedDay((selectedDay:any) => selectedDay.clone().add(1, selectedDuration));
            case "week":
              return  setSpan({...span, startDate: span.startDate.add(1, selectedDuration), endDate: span.endDate.add(1, selectedDuration)})
            case"month":
                return setSelectedDay((selectedDay:any) => selectedDay.clone().add(1, selectedDuration));
            }
      };
      const setPrev = () => {
        switch(selectedDuration){
            case"day":
            return setSelectedDay((selectedDay:any) => selectedDay.clone().subtract(1, selectedDuration));
            case "week":
              return  setSpan({...span, startDate: span.startDate.subtract(1, selectedDuration), endDate: span.endDate.subtract(1, selectedDuration)})
            case"month":
            return setSelectedDay((selectedDay:any) => selectedDay.clone().subtract(1, selectedDuration))
      }
    }

    const getTable = () => {
        switch(selectedDuration){
            case"day":
            return <DailyScheduleTable day={selectedDay} tableData={tableData}/>
            case "week":
              return  <WeeklyScheduleTable days={days} tableData={tableData}/>
            case"month":
                return <MonthSchedule selectedMonth={selectedDay} data={tableData}/>
      }
    }
    const getIconColor = (duration: string) => {
        if(duration == selectedDuration){
            return "#000999"
        }
    }
    return (
        <Row className="DailySchedule">
            <Col span={24}>
            <Card>  
                <Row justify="space-between">
                    <Col span={8} md={6} lg={8} xl={8} className="scheduleTitle">
                        <p>Schedule</p>
                        {selectedDuration == "month" ? 
                        <>
                        <span className="adhKey f-14">Adherence:</span><span className="adhKey f-14" style={{marginRight:"10px"}}> 74.5%</span><span>{" "}</span>
                        <span className="adhKey f-14">Compliance:</span><span className="adhKey f-14"> 74.5%</span>
                        </>
                        :null}
                    </Col>
                    <Col span={6} md={8} xl={6} lg={7}>
                    <div className="dateMenu">
                    <img src={leftFilled} onClick={setPrev}/>
                    {getDate()}
                    <img src={rightFilled} onClick={setNext}/>
                    </div>
                </Col>
                    <Col span={8}>
                        <Row justify="end" gutter={[10, 30]}>
               
                    <Col xxl={2} xl={3} lg={3} md={4} onClick={onDayClick} className="time-col f-12" style={{textAlign:'center'}}>
                        <span className="material-icons-outlined durationSelector" style={{color:getIconColor("day")}}>{CommonIcons.calendarToday}</span>
                        Today
                    </Col>
                    <Col  md={4} lg={3} xl={3} xxl={2}  onClick={onWeekClick} className="time-col f-12" style={{textAlign:'center'}}>
                    <span className="material-icons-outlined durationSelector" style={{color:getIconColor("week")}}>{CommonIcons.calendarWeek}</span>
                    Week
                    </Col>
                    <Col md={4} lg={3} xl={3} xxl={2}  onClick={onMonthClick} className="time-col f-12" style={{textAlign:'center'}}>
                    <span className="material-icons-outlined durationSelector" style={{color:getIconColor("month")}}>{CommonIcons.calendarMonth}</span>
                    Month
                    </Col>
                    </Row>
                    </Col>
                </Row>
                <Row style={{paddingTop:"30px"}}>
                    <Col span={24}>
                        {getTable()}
                    </Col>
                </Row>
            
            </Card>
            </Col>
        </Row>
    )
}

export default PatientCalendar;