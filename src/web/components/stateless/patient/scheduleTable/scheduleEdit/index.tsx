import { Cascader, Col, DatePicker, Form, Row, TimePicker } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePatientSchedule } from "../../../../../../redux/actions/hrm/hrmActions";
import { compareFormValues } from "../../../../../../utility/utils";
import {
  biometricTypeOptions,
  instructionOptions,
  recurrenceOptions,
} from "../../../../../constants/constants";
import SelectInput from "../../../common/selectInput";

export const EditScheduleForm = (props: any) => {
  const {schedule, scheduleData, setScheduleData} = props;
  const dispatch = useDispatch() 
  const [multiple, setMultiple] = useState(false);
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  useEffect(()=>{
    if(schedule){
    setScheduleData(schedule)
    }
  },[schedule])

  const onEndDatePick = (date: any, dateString: any) => {
    setScheduleData({
      ...scheduleData,
      toDate: moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD"),
    });
  };

  const onStartDatePick = (date: any, dateString: any) => {
    setScheduleData({
      ...scheduleData,
      fromDate: moment(dateString, "DD/MM/YYYY").format("YYYY-MM-DD"),
    });
   
  };

  const handleEndTime = (value: any, time: any) => {
    setScheduleData({
      ...scheduleData,
      endTime: moment(time,"HH:mm").format("HH:mm:ss"),
    }); 
  };


  const handleStartTime = (value: any, time: any) => {
    setScheduleData({
      ...scheduleData,
      startTime: moment(time, "HH:mm").format("HH:mm:ss"),
    });
  };

  const handleBiometricSelect = (value: any) => {
    setScheduleData({
      ...scheduleData,
      biometricName: value,
    });
  };
  const handleReccurrenceSelect = (value: any[]) => {
    if (
      (value && value[0] && value[0] == "daily") ||
      value?.some((x: any[]) => x?.indexOf("daily") > -1)
    ) {
      setMultiple(false);
      setScheduleData({
        ...scheduleData,
        recurrence: ["daily"],
      });
    } else {
          setMultiple(true);
          if(value[0] == "weekly"){
            setScheduleData({...scheduleData, recurrence: weekDays})
          }else{
          setScheduleData({
            ...scheduleData,
            recurrence: value?.map((s: any) => {
              if (s) return s[1];
            }),
          });
    }
  };
  }
  const handleInstruction = (value: any) => {
    setScheduleData({
      ...scheduleData,
      instruction: value,
    });
  };
  const getRecurrenceValue = () => {
    if (!multiple) {
      return [["Daily"]];
    }
  };
  const handleEditSubmit = () => {
    dispatch(updatePatientSchedule({...compareFormValues(schedule, scheduleData),id: schedule?.id}))
  };
  return (

    <Form layout="vertical" onFinish={handleEditSubmit} key={scheduleData?.id} id="scheduleUpdate">
      <Row gutter={20} style={{ marginTop: "20px" }}>
        <Col span={4} md={6} lg={5} xl={4}>
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
            initialValue={scheduleData?.biometricName}
            optionValue={biometricTypeOptions}
            onChange={handleBiometricSelect}
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
                initialValue={moment(scheduleData?.fromDate)}
              >
                <DatePicker
                  className="dobPicker"

                  onChange={onStartDatePick}
                  placeholder="DD/MM/YYYY"
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={3} md={6} lg={3}>
          <Row gutter={[0, 5]}>
            <Col span={24}>
              <Form.Item
                name="toDate"
                label="End Date"
                rules={[{ required: true, message: "Please select End Date" }]}
                initialValue={moment(scheduleData?.toDate)}
              >
                <DatePicker
                  className="dobPicker"
                  onChange={onEndDatePick}
                  size="small"
                  placeholder="DD/MM/YYYY"
                  format={"DD/MM/YYYY"}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={3} md={6} lg={3}>
          <Row gutter={[0, 5]}>
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
                initialValue={moment(scheduleData?.startTime , "HH:mm", "ha")}
              >
                <TimePicker
                
                  onChange={handleStartTime}
                  format={"HH:mm"}
                  use12Hours
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={3} md={6} lg={3}>
          <Row gutter={[0, 5]}>
            <Col span={24}>
              <Form.Item
                name="endTime"
                label="End Time"
                rules={[{ required: true, message: "Please select End time" }]}
                initialValue={moment(scheduleData?.endTime, "HH:mm", "ha")}
              >
                <TimePicker
            
                  onChange={handleEndTime}
                  format={"HH:mm"}
                  use12Hours
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={3} md={6} lg={4}>
          <Form.Item
            name="recurrence"
            label="Recurrence"
            className="txtRecurrence"
            rules={[{ required: true, message: "Please select recurrence" }]}
            initialValue={scheduleData?.recurrence}
          >
            <Cascader
              className="custom"
              style={{ width: "100%" }}
              options={recurrenceOptions}
              onChange={handleReccurrenceSelect}
              multiple={multiple}
              value={getRecurrenceValue()}
              changeOnSelect
              maxTagCount="responsive"
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
            initialValue={scheduleData?.instruction}
            optionValue={instructionOptions}
            onChange={handleInstruction}
          />
        </Col>
      </Row>
    </Form>
  );
};
