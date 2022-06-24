import {
  Card,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Menu,
  message,
  Row,
  Spin,
  TimePicker,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { applyPresetSchedule, createScheduleForPatient, fetchPresetScheduleDetail, fetchScheduleForPatient, updatePatientSchedule } from "../../../../../redux/actions/hrm/hrmActions";
import { AuthStateSelector } from "../../../../../redux/reducers/authReducer/authReducer";
import { clearState, patientStateSelector } from "../../../../../redux/reducers/hrm/hrmReducer";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { compareFormValues, getFullName } from "../../../../../utility/utils";
import {
  biometricTypeOptions,
  instructionOptions,
  recurrenceOptions,
} from "../../../../constants/constants";
import { Biometricname, CommonIcons, ModalCallBackTypes, ModalPrimaryMessages, ModalType } from "../../../../constants/enums";
import { filter, up } from "../../../../images";
import Schedule from "../../../../models/schedule/schedule";
import { AppRoutes } from "../../../../router/appRoutes";
import Button from "../../common/button";
import SelectInput from "../../common/selectInput";
import { PatientScheduleTable } from "./patientScheduleTable";
import "./schedule.less";
import ConflictModal from "./scheduleConflict/conflictModal";
import { EditScheduleForm } from "./scheduleEdit";
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
export const PatientSchedule = (props: any) => {
  const { scheduleTableData,providers, setSelectedProvider, selectedProvider, presetSchedules } = props;
  const [tableData, setTableData] = useState<any>([]);
  const [newRow, setNewRow] = useState(false);
  const [checkedAll, setCheckedAll] = useState(false);
  const [newScheduleList, setNewScheduleList] = useState<any[]>([]);
  const [temp, setTemp] = useState<any[]>([])
  const {appUser} = useSelector(AuthStateSelector)
  const {selectedPatient} = useSelector(PatientStateSelector)
  const {isScheduleCreated, isScheduleUpdated, isScheduleDeleted, conflictedSch, presetScheduleDetails, isAssigned} = useSelector(patientStateSelector)
  const dispatch = useDispatch()
  const history = useHistory()
  const [disableForm, setDisableForm] = useState(false)
  const [multiple,setMultiple] = useState(false)
  const [filters, setFilters] = useState<any>({});
  const [visibleMenuSettings, setVisible] = useState(false);
  const [showConflict, setShowConflict] = useState(false)
  const [newSchedule, setNewSchedule] = useState<Schedule | any>({
    key: tableData.length + 1,
    providerName: getFullName(appUser?.title, appUser?.firstName, appUser?.middleName, appUser?.lastName),
    name: "",
    biometricType: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    recurrence: "",
    instruction: "",
    action: "",
  });
  let [check, setCheck] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<any>({})
  const [editView, setEditView] = useState(false)
  const [conflicted, setConflicted] = useState<any>()
  const [scheduleData, setScheduleData] = useState<Schedule| any>({});
  const readingData = [
    Biometricname.BP,
    Biometricname.GLUCO,
    Biometricname.PULSE,
    Biometricname.SPIRO,
    Biometricname.TEMPRATURE,
    Biometricname.WEIGHT,
  ];
  const [selectedPreset, setSelectedPreset] = useState("")
  const [applyPresetList, setApplyPresetList] = useState<any>({})
  const onEditClick = (sch: any)=> {
    setScheduleData({...sch,
      startTime: moment.utc(sch?.startTime, "HH:mm:ss").local().format('HH:mm'),
      endTime: moment.utc(sch?.endTime, "HH:mm:ss").local().format('HH:mm'),
      fromDate: moment.utc(sch?.fromDate+" "+sch?.startTime).local().format("DD MMM YYYY"),
      toDate: moment.utc(sch?.toDate+" "+sch?.endTime).local().format("DD MMM YYYY"),
    }
      )
    setSelectedSchedule({
      id: sch?.id,
      biometricName: sch?.biometricName,
      fromDate: moment.utc(sch?.fromDate+" "+sch?.startTime).local().format("DD MMM YYYY"),
      toDate: moment.utc(sch?.toDate+" "+sch?.endTime).local().format("DD MMM YYYY"),
      startTime:  moment.utc(sch?.startTime, "HH:mm:ss").local().format('HH:mm'),
      endTime:  moment.utc(sch?.endTime, "HH:mm:ss").local().format('HH:mm'),
      recurrence: sch?.recurrence,
      instruction: sch?.instruction,
    })
    setEditView(true)
  }  
  const handleBiometricSelect = (value: any) => {
    setNewSchedule({
      ...newSchedule,
      biometricName: value,
    });
  };

  const handleReccurrenceSelect = (value: any[]) => {
    if((value&& value[0] && value[0]=="daily") || (value?.some((x:any[])=>x?.indexOf("daily")> -1))){
        setMultiple(false)
        setNewSchedule({
            ...newSchedule, 
            recurrence: ["daily"],
          })
    }else{
        setMultiple(true)
        if(value[0] == "weekly"){
          setNewSchedule({...newSchedule, recurrence: weekDays})
        }else{
          setNewSchedule({
            ...newSchedule,
            recurrence: value?.map((s:any)=>{if(s)return s[1]}),
          });
        }   
}
  };

  const handleInstruction = (value: any) => {
    setNewSchedule({
      ...newSchedule,
      instruction: value,
    });
  };

  const handleStartTime = (value: any, time: any) => {
    setNewSchedule({
      ...newSchedule,
      startTime: time,
    });
  };

  const handleEndTime = (value: any, time: any) => {
    setNewSchedule({
      ...newSchedule,
      endTime: time,
    });
  };

  function onEndDatePick(date: any, dateString: any) {
    setNewSchedule({
      ...newSchedule,
      toDate: dateString,
    });
  }
  function onStartDatePick(date: any, dateString: any) {
    setNewSchedule({
      ...newSchedule,
      fromDate: dateString,
    });
  }

  const handleClick = () => {
    setNewRow(true);
  };

  const [allParams, setAllParams] = useState<any>({
    all: false,
    [Biometricname.BP]: false,
    [Biometricname.GLUCO]: false,
    [Biometricname.PULSE]: false,
    [Biometricname.SPIRO]: false,
    [Biometricname.TEMPRATURE]: false,
    [Biometricname.WEIGHT]: false,
  });

  const handleAllCheck = (e: any) => {
    const { name, checked } = e.target;
    if (checked == true) {
      setAllParams({
        all: true,
        [Biometricname.BP]: true,
        [Biometricname.GLUCO]: true,
        [Biometricname.PULSE]: true,
        [Biometricname.SPIRO]: true,
        [Biometricname.TEMPRATURE]: true,
        [Biometricname.WEIGHT]: true,
      });
      setCheck([...readingData]);
      setCheckedAll(true);
      setTableData(scheduleTableData);
    } else {
      setAllParams({
        all: false,
        [Biometricname.BP]: false,
        [Biometricname.GLUCO]: false,
        [Biometricname.PULSE]: false,
        [Biometricname.SPIRO]: false,
        [Biometricname.TEMPRATURE]: false,
        [Biometricname.WEIGHT]: false,
      });
      setCheck([]);
      setCheckedAll(false);
      setTableData(scheduleTableData);
    }
  };

  const handleOtherItemClick = (e: any) => {
    const { name, checked } = e.target;
    var index = check.indexOf(name);
    if ((name != "All" && checked == false) || checkedAll == true) {
      setAllParams({ ...allParams, all: false, [name]: checked });
      setCheckedAll(false);
      check.splice(index, 1);
      var filtered: any = scheduleTableData;
      if(check?.length){
        filtered = filtered.filter((data: any) => {
          for (let i = 0; i <= check.length; i++) {
            if (data.biometricName == check[i]) {
              return data;
            }
          }
        });
      }      
      setTableData(filtered);
    }
    if (checkedAll == false && checked == true) {
      setAllParams({ ...allParams, [name]: checked });
      check.push(name);
      var filtered: any = scheduleTableData;
      filtered = filtered.filter((data: any) => {
        for (let i = 0; i <= check.length; i++) {
          if (data.biometricName == check[i]) {
            return data;
          }
        }
      });
      setTableData(filtered);
    }
  };

  const handleAddSchedule = () => {
    if(newScheduleList?.some((x: any) =>{return ((x?.biometricName == newSchedule?.biometricName)&&(x?.fromDate == newSchedule?.fromDate)&& ( x?.toDate == newSchedule?.toDate)&&(x?.startTime == newSchedule?.startTime)&&(x?.endTime == newSchedule?.endTime)&&(x?.recurrence == newSchedule?.recurrence))})){
    message.error({content:"Can not create duplicate schedule", key:"appNotification"})
    }else {
    setNewScheduleList((newScheduleList: any) => [
      ...newScheduleList, 
      {...newSchedule, ["providerName"]: getFullName(appUser?.title,appUser?.firstName, appUser?.middleName, appUser?.lastName, )},
    ]);
  }
  };
  const handleRemoveSchedule = (schedule: any) => {
    setNewScheduleList((newScheduleList: any) =>
      newScheduleList?.filter((x: any) => (x?.biometricName != schedule?.biometricName) || (x?.fromDate != schedule?.fromDate)|| ( x?.toDate != schedule?.toDate) ||(x?.startTime != schedule?.startTime)||(x?.endTime != schedule?.endTime)||(x?.recurrence != schedule?.recurrence))
    );
  };
const getRecurrenceValue = () => {
    if(!multiple){
        return [["Daily"]]
    }
}

const deleteSchedule = (sch:any) => {
  dispatch(deleteSchedule(sch))
}

const handleIconClick = (selectedDuration: any) => {
  var x = {
    duration: selectedDuration
  }
  history.push(AppRoutes.PATIENTADHERENCE,x)
}
const handleVisibleChange = (flag: any) => {
  setVisible(flag);
};
const getFirstFilter = () => {
  switch (check[0]) {
    case Biometricname.BP:{
      return Biometricname.BP
    }
    case Biometricname.GLUCO:{
      return Biometricname.GLUCO
    }
    case Biometricname.PULSE:{
      return Biometricname.PULSE
    }
    case Biometricname.SPIRO:{
      return Biometricname.SPIRO
    }
    case Biometricname.TEMPRATURE:{
      return Biometricname.TEMPRATURE
    }
    case Biometricname.WEIGHT:{
      return Biometricname.WEIGHT
    }
  }
}
const applyFilters = () => {
  setFilters({
    ...filters,
      

  });
  setVisible(false);
};
const clearFilter = () => {
  if (check.length == 0) {
  setAllParams({
    all: false,
    [Biometricname.BP]: false,
    [Biometricname.GLUCO]: false,
    [Biometricname.PULSE]: false,
    [Biometricname.SPIRO]: false,
    [Biometricname.TEMPRATURE]: false,
    [Biometricname.WEIGHT]: false,
  });
  setFilters({});
  setVisible(false);
  setCheck([]);

 }
else{
  setVisible(false);
}};

const getAppliedFilter = () => {
  if (check.length == 0 || allParams?.all) {
    return "Biometric Type";
  } else {
    if (check.length <= 1) {
      return getFirstFilter()
    } else {
      return `${getFirstFilter()} & ${check.length - 1} more`;
    }
  }
};
const onConfirmCreate = async () => {
  if(editView){
    var z:any = {...compareFormValues(scheduleData,selectedSchedule),id: selectedSchedule?.id, ["skipCheck"]: true}
    dispatch(updatePatientSchedule(z))
  }else{
  var x: any[] = temp
  var ind = x.findIndex(
    (d: any) =>
      d?.biometricName == conflicted?.biometricName &&
      d?.fromDate ==
        moment
          .utc(conflicted?.fromDate + " " +conflicted?.startTime)
          .local()
          .format("YYYY-MM-DD") &&
      d?.toDate ==
        moment
          .utc(conflicted?.toDate + " " + conflicted?.endTime)
          .local()
          .format("YYYY-MM-DD") &&
      d?.startTime ==
        moment
          .utc(conflicted?.startTime, "HH:mm:ss")
          .local()
          .format("HH:mm:ss") &&
      d?.endTime ==
        moment.utc(conflicted?.endTime, "HH:mm:ss").local().format("HH:mm:ss")
  );
  if(ind >= 0){
    x[ind] = {...x[ind], ["skipCheck"]: true}
  }
  dispatch(createScheduleForPatient({schedules: [...x]}))
}
  setShowConflict(false)
}
const getPresetOptions = () => {
  if(presetSchedules){
    return presetSchedules?.map((d:any)=>{
      return ( {
        text: d,
        value: d
      })
    })
  }else{return []}
}
useEffect(()=>{
  if(presetScheduleDetails?.length > 0){
    setNewScheduleList(presetScheduleDetails?.map((data: any)=>{
      return {
          biometricName: data?.biometricName,
          startTime: moment(data?.startTime, "HH:mm:ss").format("HH:mm"),
          endTime: moment(data?.endTime, "HH:mm:ss").format("HH:mm"),
          recurrence: data?.recurrence,
          instruction: data?.instruction,
          fromDate: moment(data?.fromDate,"YYYY-MM-DD").format("DD/MM/YYYY"),
          toDate: moment(data?.toDate,"YYYY-MM-DD").format("DD/MM/YYYY"), 
      }
    }))
  }
},[presetScheduleDetails])
  useEffect(()=>{
    setTemp(newScheduleList.map((schedule:any)=>{
        return {
          biometricName: schedule?.biometricName,
          assigneeId: appUser?.id,
          startTime: moment(schedule?.startTime, 'HH:mm').format("HH:mm:ss"),
          endTime: moment(schedule?.endTime, 'HH:mm').format("HH:mm:ss"),
          recurrence: schedule?.recurrence,
          instruction: schedule?.instruction,
          fromDate: moment(schedule?.fromDate, "DD/MM/YYYY" ).format("YYYY-MM-DD"),
          toDate: moment(schedule?.toDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
          patientId: selectedPatient?.id,
          isCustom: true,
        };
    }))
  },[newScheduleList])

  useEffect(()=>{
    if(isAssigned.isSuccess){
        message.success({content: "Schedule assigned successfully.", key: "appNotification"})
        setNewRow(false)
        setDisableForm(false)
        setApplyPresetList({})
        setNewScheduleList([])
        setTableData([])  /*Cleaning table data before fetching schedules again */
        dispatch(fetchScheduleForPatient({patientId: selectedPatient?.id}))
        dispatch(clearState())
    }else if (isAssigned.isError){
      if(conflictedSch){
        setConflicted(conflictedSch)
        setShowConflict(true)
      }else {
        message.error({content:isAssigned.errorStack ? isAssigned.errorStack : "Something went wrong", key:"appNotification"})
    }
  dispatch(clearState())
  }
},[isAssigned.isSuccess, isAssigned.isError])

  useEffect(()=>{
      if(isScheduleCreated.isSuccess){
          message.success("Schedule Created Successfully.")
          setNewRow(false)
          setNewSchedule({})
          setNewScheduleList([])
          setTableData([])  /*Cleaning table data before fetching schedules again */
          dispatch(fetchScheduleForPatient({patientId: selectedPatient?.id}))
          dispatch(clearState())
      }else if (isScheduleCreated.isError){
        if(conflictedSch){
          setConflicted(conflictedSch)
          setShowConflict(true)
        }else {
          message.error({content:isScheduleCreated.errorStack ? isScheduleCreated.errorStack : "Something went wrong", key:"appNotification"})
      }
    dispatch(clearState())
    }
  },[isScheduleCreated.isSuccess, isScheduleCreated.isError])

  useEffect(()=>{
    if(isScheduleUpdated.isSuccess){
        message.success("Schedule Updated Successfully.")
        setEditView(false)
        dispatch(fetchScheduleForPatient({patientId: selectedPatient?.id}))
        dispatch(clearState())
    }else if (isScheduleUpdated.isError){
      if(conflictedSch){
        setConflicted(conflictedSch)
        setShowConflict(true)
      }else {
        message.error({content:isScheduleUpdated.errorStack ? isScheduleUpdated.errorStack : "Something went wrong", key:"appNotification"})
    } 
    dispatch(clearState())
  }
  dispatch(clearState())
},[isScheduleUpdated.isSuccess, isScheduleUpdated.isError])
useEffect(()=>{
  if(isScheduleDeleted.isSuccess){
      message.success({content:"Schedule Deleted Successfully.", key:"appNotification"})
      dispatch(fetchScheduleForPatient({patientId: selectedPatient?.id}))
  }else if (isScheduleDeleted.isError){
      message.error({content:isScheduleDeleted.errorStack ? isScheduleDeleted.errorStack : "Something went wrong", key:"appNotification"})
  }
dispatch(clearState())
},[isScheduleDeleted.isSuccess, isScheduleDeleted.isError])

  const onScheduleSave = () => {
    if(disableForm){
      dispatch(applyPresetSchedule(applyPresetList))
    }
    else if(!temp?.length){
          message.error("Please add a schedule!")
    }else{
        dispatch(createScheduleForPatient({schedules: [...temp]}))
    }
  }

  const handlePresetSelect = (value:any) => {
    setSelectedPreset(value)
    setDisableForm(true)
    setApplyPresetList({
      scheduleName: value,
      patientId: selectedPatient?.id,
      assigneeId: appUser?.id,
    });
  }

  useEffect(()=>{
    if(selectedPreset){
      dispatch(fetchPresetScheduleDetail({scheduleName : selectedPreset}))
    }
  },[selectedPreset])
  
  useEffect(()=>{
    setTableData(scheduleTableData?.map((el:any)=>{
return ({...el, key :el.id})
    }))
  }, [scheduleTableData])

  const providerOptions = (
    <Menu className="actionMenu">
      {
        providers?.map((pro:any)=>{
          return (
            <>
            <Menu.Item key={pro?.id} onClick={()=>setSelectedProvider(pro)}>{pro?.name}</Menu.Item>
            <Menu.Divider/>
            </>
          )
        })
      }
      <Menu.Item onClick={()=>setSelectedProvider(null)}>
        All
      </Menu.Item>
    </Menu>
  )
  const menu = (
    <Menu className="actionMenu ddlschedule">
      <Menu.Item key="0">
        <Checkbox
          checked={allParams.all}
          className="menu-itemCheckbox"
          name="all"
          onChange={handleAllCheck}
          value="Select All"
        >
          All
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="1">
        <Checkbox
          checked={allParams[Biometricname.BP]}
          className="menu-itemCheckbox"
          name={Biometricname.BP}
          onChange={handleOtherItemClick}
        >
          Blood Pressure
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="2">
        <Checkbox
          checked={allParams[Biometricname.GLUCO]}
          className="menu-itemCheckbox"
          name={Biometricname.GLUCO}
          onChange={handleOtherItemClick}
        >
          Glucose
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="3">
        <Checkbox
          checked={allParams[Biometricname.WEIGHT]}
          className="menu-itemCheckbox"
          name={Biometricname.WEIGHT}
          onChange={handleOtherItemClick}
        >
          Weight
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="4">
        <Checkbox
          checked={allParams[Biometricname.TEMPRATURE]}
          className="menu-itemCheckbox"
          name={Biometricname.TEMPRATURE}
          onChange={handleOtherItemClick}
        >
          Temperature
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="5">
        <Checkbox
          checked={allParams[Biometricname.PULSE]}
          className="menu-itemCheckbox"
          name={Biometricname.PULSE}
          onChange={handleOtherItemClick}
        >
          Pulse Ox
        </Checkbox>
      </Menu.Item>
      <Menu.Item key="6">
        <Checkbox
          checked={allParams[Biometricname.SPIRO]}
          className="menu-itemCheckbox"
          name={Biometricname.SPIRO}
          onChange={handleOtherItemClick}
        >
          Spirometer
        </Checkbox>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="buttons">
        <Row gutter={[20, 22]}>
        <Col span={24}>
            <Row>
              <Col offset={2} md={20} lg={22} xl={22} xxl={22}>
              <Row  gutter={[20, 22]}>
              <Col span={10} xxl={9} xl={10} lg={10} md={10}>
              <Button type="primary" className="okBtn" onClick={applyFilters}>
              <b>OK</b>
               </Button>
              </Col>
              <Col  xxl={15} xl={14} lg={14} md={14}>
              <Button type="primary" className="okBtn" onClick={clearFilter}>
              <b>CANCEL</b>
             </Button>
              </Col>
              </Row>
              </Col>
           
         
            </Row>
         
          </Col>
        </Row>
      </Menu.Item>
    </Menu>
  );
  return (
    <Spin spinning={isScheduleCreated.loading || isScheduleDeleted.loading || isScheduleUpdated.loading || isAssigned.loading}>
      <Card className="scheduleTable">
        <Row justify="space-between" className="patientShedule">
          <Col span={8} md={24} lg={8} xl={8}>
            <Row>
              <Col span={24} className="patientShedule">
              {editView ?
              (<span className="textFont f-16">Edit schedule ({scheduleTableData?.length})</span>)
             
                : newRow ?
                (<span className="textFont f-16">Create schedule ({scheduleTableData?.length})</span>)
               :(<span className="textFont f-16">Patient schedule ({scheduleTableData?.length})</span>)
            
            }
            
                
              </Col>
            </Row>
          </Col>
          <Col span={8} md={24} lg={10} xl={8}>
            <Row gutter={20} justify="end" className="colpatientShedule">
              {editView ? 
              <>
              <Col md={6} lg={12} xl={11} xxl={8}>
                <Button
                  type="primary"
                  className="colClass"
                  htmltype="submit"
                  form="scheduleUpdate"
                >
                  Save and Exit
                </Button>
              </Col>
              <Col md={6} lg={11} xl={10} xxl={8} style={{paddingRight:'0px'}}>
                <Button
                  type="primary"
                  className="colClass"
                  onClick={() =>{setEditView(false)}}
                >
                  Cancel
                </Button>
              </Col>
            </>:
              newRow ? (
                <>
                  <Col md={7} lg={11} xl={10} xxl={8}>
                    <Button
                      type="primary"
                      className="colClass"
                      onClick={onScheduleSave}
                    >
                      Save and Exit
                    </Button>
                  </Col>
                  <Col md={6} lg={11} xl={11}  xxl={8} style={{paddingRight:'0px'}}>
                    <Button
                      type="primary"
                      className="colClass"
                      onClick={() =>{setNewScheduleList([]); setNewRow(false); setDisableForm(false)}}
                    >
                      Cancel
                    </Button>
                  </Col>
                </>
              ) : (
                <>
                  <Col md={7} lg={12} xl={12} xxl={11}>
                    <Row>
                      <Col md={24} span={20} lg={23} xl={24} xxl={20}>
                      <Button
                      type="primary"
                      className="colClass"
                      onClick={handleClick}
                    >
                      Create Schedule
                    </Button>
                      </Col>
                    </Row>
               
                  </Col>
                  
                
                  <Col xxl={2} xl={3} lg={4} md={2} onClick={()=>handleIconClick("day")} style={{textAlign:'center'}}>
                   <span className="material-icons-outlined schIcon">{CommonIcons.calendarToday}</span>
                    Today
                  </Col>
                  <Col xxl={2} xl={3} lg={4} md={2}  onClick={()=>handleIconClick("week")} style={{textAlign:'center'}}>
                  <span className="material-icons-outlined schIcon">{CommonIcons.calendarWeek}</span>
                    Week
                  </Col>
                  <Col xxl={2} xl={3} lg={4} md={2} onClick={()=>handleIconClick("month")} style={{textAlign:'center'}}>
                  <span className="material-icons-outlined schIcon">{CommonIcons.calendarMonth}</span>
                    Month
                  </Col>
                </>
              )}
            </Row>
          </Col>
        </Row>
        {editView? 
        <EditScheduleForm schedule={scheduleData} scheduleData={selectedSchedule} setScheduleData={setSelectedSchedule}/> 
        :
        newRow ? (
          <>
            <Form layout="vertical" onFinish={handleAddSchedule} className="txtPatientSchedule">
           <Row gutter={20}>
            <Col  md={10} lg={7} xl={7} xxl={6}>
                  <SelectInput
                    labelSubName="Apply Preset Schedule"
                    placeholder="Select"
                    name="selectPresentSchedule"
                    className="selectInput"
                    bordered={true}
                    
                    onChange={handlePresetSelect}

                    optionValue={getPresetOptions()}
                  />
                </Col>
                </Row>
              <Row gutter={20} style={{ marginTop: "20px" }} >
                <Col  md={6} lg={5} xl={4} xxl={4}>
                  <SelectInput
                    labelSubName="Select Biometric Type"
                    placeholder="Select"
                    name="selectBiometricType"
                    className="selectInput"
                    bordered={true}
                    rules={[
                      {
                        required: true,
                        message: "Please select biometric type.",
                      },
                    ]}
                    optionValue={biometricTypeOptions}
                    onChange={handleBiometricSelect}
                    disabled={disableForm}
                  />
                </Col>
                <Col span={3} md={6} lg={3}>
                  <Row gutter={[0, 5]}>
                    <Col span={24}>
                      <Form.Item
                        name="fromDate"
                        label="Start Date"
                        rules={[
                          {
                            required: true,
                            message: "Please select Start sate",
                          },
                        ]}
                      >
                        <DatePicker
                          className="dobPicker"
                          onChange={onStartDatePick}
                          placeholder="DD/MM/YYYY"
                          format={"DD/MM/YYYY"}
                          disabled={disableForm}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={3} md={6}  lg={3}>
                  <Row gutter={[0, 5]}>
                    <Col span={24}>
                      <Form.Item
                        name="toDate"
                        label="End Date"
                        rules={[
                          { required: true, message: "Please select End Date" },
                        ]}
                      >
                        <DatePicker
                          className="dobPicker"
                          onChange={onEndDatePick}
                          size="small"
                          placeholder="DD/MM/YYYY"
                          format={"DD/MM/YYYY"}
                          disabled={disableForm}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={3} md={6} lg={3}>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="startTime"
                        label="Start Time"
                        rules={[
                          {
                            required: true,
                            message: "Please select Start time",
                          },
                        ]}
                      >
                        <TimePicker
                          
                          onChange={handleStartTime}
                          format={"HH:mm"}
                          use12Hours
                          size="large"
                          disabled={disableForm}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={3} md={6} lg={3}>
                  <Row>
                    <Col span={24}>
                      <Form.Item
                        name="endTime"
                        label="End Time"
                        rules={[
                          { required: true, message: "Please select End time" },
                        ]}
                      >
                        <TimePicker
                        
                          onChange={handleEndTime}
                          format={"HH:mm"}
                          use12Hours
                          size="large"
                          disabled={disableForm}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={3} md={6} lg={3}>
                  <Form.Item
                    name="recurrence"
                    label="Recurrence"
                    className="txtRecurrence"
                    rules={[
                      { required: true, message: "Please select recurrence" },
                    ]}
                  >
                    <Cascader
                      className="custom"
                      style={{ width: "100%" }}
                      options={recurrenceOptions}
                      dropdownMatchSelectWidth
                      expandTrigger={"hover"}
                      onChange={handleReccurrenceSelect}
                      multiple={multiple}
                      value={getRecurrenceValue()}
                      changeOnSelect
                      maxTagCount="responsive"
                      disabled={disableForm}
                    />
                  </Form.Item>
                </Col>
                <Col span={3} md={6} lg={4} xl={3}>
                  <SelectInput
                    labelSubName="Select Instructions"
                    placeholder="Instructions"
                    name="instructions"
                    className="selectInput"
                    bordered={true}
                    initialValue=""
                    optionValue={instructionOptions}
                    onChange={handleInstruction}
                    disabled={disableForm}
                    rules={[
                      { required: true, message: "Please select instructions" },
                    ]}
                  />
                </Col>
                <Col span={2}>
                  <Button
                    type="primary"
                    className="addButton"
                    htmltype="submit"
                    disabled={disableForm}
                  >
                    +ADD
                  </Button>
                </Col>
              </Row>


            </Form>
            <Row className="tableSpecial sheduleTable MobViewTable">
              <Col span={24}>
                <PatientScheduleTable
                  tableData={newScheduleList}
                  preSaved={true}
                  handleRemoveSchedule={handleRemoveSchedule}
                />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row gutter={20}>
              <Col md={6} lg={5} xl={4} xxl={3}>
              <Dropdown
                  className="cdfg"
                  overlayClassName="actionMenu"
                  overlay={providerOptions}
                  trigger={["click"]}
                  getPopupContainer={(trigger:any)=>trigger.parentNode}
                >
                <Button className="buttonSchedule f-14">
                  <img src={filter} />
                  <span className="textFont f-12 buttonText">{selectedProvider? selectedProvider?.name: "PROVIDER"}</span>
                  <img src={up} className="" />
                </Button>
        
                </Dropdown>
              </Col>
              <Col  md={6} lg={5} xl={4} xxl={3}>
                <Dropdown
                  className="cdfg"
                  overlayClassName="actionMenu"
                  overlay={menu}
                  trigger={["click"]}
                  onVisibleChange={handleVisibleChange}
                  visible={visibleMenuSettings}
                  getPopupContainer={(trigger:any)=>trigger.parentNode}
                >
                  <button className="buttonSchedule f-14">
                    <img src={filter} className="" style={{marginRight:'5px'}} />
                    <span className="textFont f-12 buttonText criticalBtn slice">
                    {getAppliedFilter()}
                    </span>
                    <img src={up} className="" />
                  </button>
                </Dropdown>
              </Col>
            </Row>
              <Row className="tableSpecial">
                <Col span={24}>
                  <PatientScheduleTable tableData={tableData} onEditClick={onEditClick} deleteSchedule={deleteSchedule}/>
                </Col>
              </Row>
          </>
        )}
      </Card>
      <ConflictModal type={ModalType.WARN} isModalVisible={showConflict} cancelCallback={()=>setShowConflict(false)} confirmCallback={onConfirmCreate} cancelButton={ModalCallBackTypes.CANCEL} confirmButton={ModalCallBackTypes.CONTINUE} primaryText={ModalPrimaryMessages.SCH_CONFLICT} providerName={getFullName(appUser?.title, appUser?.firstName, appUser?.middleName, appUser?.lastName)} biometricType={conflicted?.biometricName} startTime={conflicted?.startTime} endTime={conflicted?.endTime}/ >
    </Spin>
  );
};
