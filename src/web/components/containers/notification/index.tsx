import { Card, Col, DatePicker, Dropdown,Form, Menu, message, Row, Spin } from "antd";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, postReadNotification } from "../../../../redux/actions/notification/notificationAction";
import { AuthStateSelector } from "../../../../redux/reducers/authReducer/authReducer";
import { clearNotifications, NotificationSelector } from "../../../../redux/reducers/notification/notificationReducer";
import { backButton, filter, redo, up } from "../../../images";
import { AppRoutes } from "../../../router/appRoutes";
import { Breadcrumbs } from "../../stateless/common/breadCrumbs";
import Button from "../../stateless/common/button";
import CustomTooltip from "../../stateless/common/toolTip";
import NotificationTable from "../../stateless/notification/notificationTable";
import "./notification.less";
import { Messages } from "../../../constants/messages";

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications, formState } = useSelector(NotificationSelector);
  const { appUser } = useSelector(AuthStateSelector);
  const [tableData, setTableData] = useState<any[]>([]);
  const [params, setParams] = useState<any>({
    startDate: moment(),
    endDate: moment(),
  });
  const [selectedType, setSelectedType] = useState<any>(null)
  const [notified , setNotified]= useState<any[]>([]);
  const [readNotificationList, setReadNotificationList] = useState<any>({readNotificationIds: []})
  const [uniqueNames, setUniqueNames] = useState<any[]>([])
  const notificationBreadCrumbs = [
    {
      text: "DASHBOARD",
      link: AppRoutes.LANDING,
    },   
    {
      text: "NOTIFICATION",
    },
  ];
  
  useEffect(()=>{
    setNotified(notifications.map((data:any)=>{
      return data?.content?.name
    })
    )
    
  }, [notifications])
  useEffect(() => {
    return () => {
      dispatch(clearNotifications());
    };
  }, []);
  let history = useHistory();
  const notify = notified?.filter(onlyUnique)
  function onlyUnique(value: any, index: any, self: any[]) {
    return (self.indexOf(value) === index && value !== null) || "";
  }
  useEffect(() => {
    dispatch(fetchNotifications({
      startDate: params?.startDate ? moment(params?.startDate, "DD-MM-YYYY").format("YYYY-MM-DD") : null,
      endDate: params?.endDate ? moment(params?.endDate, "DD-MM-YYYY").format("YYYY-MM-DD") : null,
      userId: appUser?.id
       }));
  }, [params]);
  useEffect(() => {
    if (notifications) {
      setTableData(notifications);
      setReadNotificationList({
        ["readNotificationIds"]: notifications?.map((not) => {
          return not?.unSentQueueId
        })
      })
    } return (() => {
      if (readNotificationList?.readNotificationIds?.length > 0) {
        dispatch(postReadNotification(readNotificationList))
      }
    })
  }, [notifications]);
  useEffect(() => {
    if (selectedType) {

      setTableData(notifications?.filter((not) => {
        return (not?.content.name == selectedType)
      }))
    } else if(selectedType=="all") {
      setTableData(notifications)
    }
  }, [selectedType])
const startDateSelect = (date:any)=>{
  if(!date.isAfter(params.endDate)){
    setParams({...params, startDate: date,})
  }
  else{
    message.error(Messages.START_DATE_ERROR)
    setParams({...params, startDate: moment(),})
  }
}
const endDateSelect = (date:any)=>{
  if(!date.isBefore(params.startDate)){ 
    setParams({...params, endDate:date })
  }
 else{
   message.error(Messages.END_DATE_ERROR)
   setParams({...params, endDate:moment(), })

 }
    }

  const handleRefresh = () => {
    setParams({})
  }
  const filterMenu = (
    <Menu>
       {notify?.map((data :any)=>{
         return(
      <><Menu.Item key="1" onClick={()=>setSelectedType(data)}>{data}</Menu.Item><Menu.Divider/></>)})}
       <Menu.Divider/>
      <Menu.Item  key="2" onClick={()=>setSelectedType(null)}>All</Menu.Item>
    </Menu>
  );
  return (
    <Spin spinning={formState.loading}>
      <Card className="notificationCard">
        <Row>
          <Col span={24} style={{display:"flex"}}>
          <CustomTooltip placement="left" title={"Back"} color="#ffffff" >
            <div style={{ position: "relative", left: "-2px" }}> <button className="bckBtn" onClick={() => history.goBack()}><img src={backButton} className="bckIcon"></img></button></div>
          </CustomTooltip>
          <div style={{marginLeft:'5px', marginTop:'4px'}}><Breadcrumbs breadcrumbs={notificationBreadCrumbs} /></div>
          </Col>
            <Col span={24}><span className="f-16 txtNoti">NOTIFICATIONS</span>&nbsp;
            <span className="f-16 txtNoti">({notifications?.length})</span></Col>
        </Row>
        <Row gutter={21}>
          <Col md={6} lg={5} xl={4} xxl={2}>

            <Row gutter={[0, 5]}>
              <Col span={24}>
                <span className="" style={{ color: '#fff', visibility: 'hidden' }}>Type</span>
              </Col>
              <Col span={24}>
              <Dropdown overlay={filterMenu} trigger={["click"]} >
                  <Button
                    className="filter btnSize notifibtn"
                    type="secondary"
                    htmlType="search"
                  >
                    <img className="filterIcon" src={filter} />
                    <span className="txtnme">{selectedType ? selectedType : "Type"}</span>
                    <div className="dropImg">
                      <img className="imgSize" src={up} />
                    </div>
                  </Button>
                  </Dropdown>
              </Col>
            </Row>
          </Col>
          <Col md={6} lg={5} xl={4} xxl={3}>
            <Row gutter={[0, 5]}>
              <Col span={24}>
                <Form.Item
                  label="Start Date"
                >
                  <DatePicker
                    className="dobPicker"
                    allowClear = {false}
                    placeholder="Select start date"
                    format={"MM-DD-YYYY"}
                    onChange={startDateSelect}
                    value={params?.startDate? params?.startDate: undefined}
                  />
                </Form.Item>  
              </Col>
            </Row>
          </Col>
          <Col md={6} lg={5} xl={4} xxl={3}>
            <Row gutter={[0, 5]}>
              <Col span={24}>
              <Form.Item
                  label="End Date"
                >
                  <DatePicker
                    className="dobPicker"
                    allowClear= {false}
                    placeholder="Select end date"
                    format={"MM-DD-YYYY"}
                    onChange={endDateSelect}
                    value={params?.endDate?params?.endDate: undefined}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col md={5} lg={3} xl={3} xxl={2} className="btnRedo">
            <Row gutter={[0, 5]}>
              <Col span={24}>
                <span className="" style={{ color: '#fff', visibility: 'hidden' }}>Reset</span>
              </Col>
              <Col span={24}>
                  <Button type="primary" className="notifibtn" onClick={handleRefresh}>
                    {" "}
                    <img src={redo}></img>
                  </Button>
              </Col>
            </Row>

          </Col>
        </Row>
        <Row className="tableNoti">
          <NotificationTable tableData={tableData} />
        </Row>
      </Card>
    </Spin>
  );
};
export default Notification;