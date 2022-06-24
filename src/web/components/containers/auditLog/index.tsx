import { Card, Col, DatePicker, message, Row, Spin } from "antd";
import moment from "moment";
import "./auditLog.less"
import { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { fetchAuditLogs } from "../../../../redux/actions/auditLog/auditLogAction";
import { AuditLogStateSelector, clearAudits } from "../../../../redux/reducers/auditLog/auditLogReducer";
import { AppRoutes } from "../../../router/appRoutes";
import { Breadcrumbs } from "../../stateless/common/breadCrumbs";
import { AuditData } from "../../stateless/organisation/auditLog/auditData";
import Button from "../../stateless/common/button";
import { CommonIcons } from "../../../constants/enums";
import { CompWrapper } from "../../stateless/common/contentWrapper";
import { getExportCsvFile } from "../../../../utility/utils";
import { AuthStateSelector } from "../../../../redux/reducers/authReducer/authReducer";
import { auditCSVheaders } from "../../../constants/constants";
import { Messages } from "../../../constants/messages";
const AuditLog = ()=>{
  const [tableData, setTableData] = useState<any[] | []>([])
  const {auditLog, formState}= useSelector(AuditLogStateSelector)
   const dispatch = useDispatch()
   const {appUser} = useSelector(AuthStateSelector)
  const [params , setParams] = useState<any>({
    startDate: moment().subtract(1,"week"),
    endDate: moment(),
  })
  const titleDate =
    "Organisation:" +
    appUser?.orgName + " , " + "  " +
    "From:" +
    moment(params?.startDate).format("DD MMMM YYYY,HH:mm") + " , " + "  " +
    "To:" +
    moment(params?.endDate).format("DD MMMM YYYY,HH:mm") + " , " + "  " +
    "Exported at:" +
    moment().format("DD MM YYYY");  
  useEffect(() => {
    var temp = auditLog?.map((logs) => {
        return (
            {
     id: logs?.id,
    userId: logs?.userId,
    orgId: logs?.orgId,
    eventId: logs.eventId,
    category: logs?.category,
    description: logs.description,
    auditName: logs?.auditName,
    isAudit: logs?.isAudit,
    severity: logs?.severity,
    source: logs?.source,
    data: logs?.data,
    metadata: logs?.metadata,
    beforeData: logs?.beforeData,
    afterData: logs?.afterData,
    ipAddress: logs?.ipAddress,
   timestamp: logs?.timestamp,
   userName: logs?.userName              
            })
    })
    setTableData(temp)
}, [auditLog])
const handleDateChange = (date:any, dateString: any)=>{
  if(!date.isAfter(params.endDate)){
    setParams({...params, startDate: date,})
  }
  else{
    message.error(Messages.START_DATE_ERROR)
  }
}  
  const handleDate = (date:any, dateString: any)=>{
    if(!date.isBefore(params.startDate)){ 
      setParams({...params, endDate:date })
    }
   else{
     message.error(Messages.END_DATE_ERROR)
   }
      }
  const onReset = () => {
    setParams({})
  }
useEffect(()=>{
  dispatch(fetchAuditLogs({
    organisation: appUser?.orgId,
    startDate: params?.startDate ? moment(params?.startDate, "DD-MM-YYYY").format("YYYY-MM-DD") : null,
    endDate: params?.endDate ? moment(params?.endDate, "DD-MM-YYYY").format("YYYY-MM-DD") : null,
  }))
    },[params])

    useEffect(() => {
      return () => {
        dispatch(clearAudits());
      };
    }, []); 
    const nextTab = [
        {
          text: "Audit Logs",
          link: AppRoutes.AUDITLOG,
        },
        {
          text: "Audit Logs"
        },
      ];
      const onExportCSV = () => {
        getExportCsvFile(tableData, auditCSVheaders, titleDate, "AuditData")
      }
    return(
        <Spin spinning = {formState.loading}>
        <div>
        <Row gutter={[20,10]}className="innerHeader expand">
            <Col md={24} lg={22} xl={10}>
        <Breadcrumbs breadcrumbs={nextTab} />
        <span className="platformUsers f-20">Audit logs</span>
        </Col>
        <Col md={0} lg={7} xl={0} xxl={0}></Col>
        <Col  md={6} lg={4} xl={3} xxl={3}>       
            {/* <Form.Item > */}
                        <DatePicker
                          className="dobPickerOrg auditDob"
                          name= "start date"
                          format={"DD-MM-YYYY"}
                          placeholder="start date"
                          onChange={handleDateChange}
                          value={params?.startDate? params?.startDate: undefined}
                          />
                        

                      {/* </Form.Item> */}
         </Col>
         <Col  md={6} lg={4} xl={3} xxl={3}>       
            {/* <Form.Item > */}
                        <DatePicker
                          className="dobPicker auditDob"
                          name= "end date"
                          format={"DD-MM-YYYY"}
                          placeholder="end date"
                          onChange={handleDate}
                          value={params?.endDate?params?.endDate: undefined}
                          />                    
                      {/* </Form.Item> */}
         </Col>
         <Col md={4} lg={3} xl={3} xxl={2}>
         <Button
            type="primary"
            className="resetBtn iconColor"
            onClick={onReset}
          >
            <span className="material-icons-outlined">{CommonIcons.reset}</span>
            RESET
          </Button>
         </Col>
         <Col md={8} lg={6} xl={5} xxl={6}>
         <Button
            type="primary"
            className="upload"            
            onClick={onExportCSV}
          >            
            <span className="material-icons-outlined">{CommonIcons.upload}</span>
            EXPORT AS  XLS
          </Button>
         </Col>
        </Row>
        <CompWrapper observeOn="innerHeader">
        <Card className="auditCardContainer">
        <AuditData  eventTable={tableData}  />
        </Card>
        </CompWrapper>
        </div>
        </Spin>
    )
}
export default AuditLog;