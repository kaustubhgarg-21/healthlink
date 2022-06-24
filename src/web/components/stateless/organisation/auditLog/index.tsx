import { Card, Form, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchAuditLogs } from "../../../../../redux/actions/auditLog/auditLogAction";
import { AuditLogStateSelector } from "../../../../../redux/reducers/auditLog/auditLogReducer";
import { OrganizationStateSelector } from "../../../../../redux/reducers/organization/organizationReducer";
import { auditCSVheaders } from "../../../../constants/constants";
import { CompWrapper } from "../../common/contentWrapper";
import { AuditData } from "./auditData";
import { clearAudits } from "../../../../../redux/reducers/auditLog/auditLogReducer";
import "./auditLog.less";



const AuditLogs = (props:any)=>{
  const {tableRow, params, exportClick} = props
  const [tableData, setTableData] = useState<any[] | []>([])
  const {auditLog, formState}= useSelector(AuditLogStateSelector)
  const {  selectedOrganization } = useSelector(OrganizationStateSelector)
   const dispatch = useDispatch()
   const titleDate =
   "Organisation:" +
   selectedOrganization?.orgName + " , " + "  " +
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

useEffect(()=>{
  dispatch(fetchAuditLogs({
    organisation: selectedOrganization?.id,
    startDate: moment(params?.startDate).format("YYYY-MM-DD"),
      endDate: moment(params?.endDate).format("YYYY-MM-DD"),

  }))
    },[params])

    useEffect(() => {
      return () => {
        dispatch(clearAudits());
      };
    }, []);
 
    return(   
      <Spin spinning = {formState.loading}>
        <CompWrapper observeOn="innerHeader">
      <Form id="auditExport" onFinish={()=>exportClick(tableData, auditCSVheaders, titleDate, "AuditData")}/>
      <div className="auditCard">
        <Card className="auditCard-conatiner">
<AuditData tableRow={tableRow} eventTable={tableData}/>
</Card>
        </div>
        </CompWrapper>
        </Spin>
    )
}
export default AuditLogs;