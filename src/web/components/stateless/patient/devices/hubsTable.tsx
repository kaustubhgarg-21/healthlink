import {Table} from "antd"
import moment from "moment"

const columns = [
    {
        key: "0",
        title: "Company",
        dataIndex: "companyName",
        width:"16.66%",
    },
    {
        key: "1",
        title: "HUB ID",
        dataIndex: "id",
        width:"14.66%",
    },
    {
        key: "2",
        title: "Assigned Date",
        dataIndex: "assignedDate",
        width:"17%",
        render : (date: any)=>{
            return date? (moment(date).format("DD MMM YYYY")) : ""
        }
    },
    {
        key: "3",
        title: "Unassigned Date",
        dataIndex: "unassignedDate",
        width:"20.66%",
        render : (date: any)=>{
            return date? (moment(date).format("DD MMM YYYY")) : ""
        }
    },
    {
        key: "4",
        title: "Status",
        dataIndex: "isActive",
        width:"14.66%",
        render: (active: boolean) => {
            return (<span >
              {active==true?"Active":"Inactive"}
                    
    
            </span>)
          }
    },
    {
        key: "5",
        title: "Last activity Date",
        dataIndex: "lastActivityDate",
        width:"16.66%",
        render : (date: any)=>{
            return date? (moment(date).format("DD MMM YYYY")) :  ""
        }
    },
]
export const HubsTable = (props:any) => {
    const {data} = props;
 return (
    <Table 
        tableLayout="fixed"
        className="centreTable"
        columns={columns}
        dataSource={data}
        pagination={false}
    />
 )
}