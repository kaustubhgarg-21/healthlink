import { Table } from "antd";
import moment from "moment";
import "./auditLog.less";



  export const AuditData = (props:any)=>{
      const {eventTable} = props
    const columns = [
        { 
          title: 'Date',
          dataIndex: 'timestamp',
          className: "tableHeading",
          key: 'date',
          width: "11%",
          render: (date:any)=>moment(date).format("DD MMM YYYY")

        
        },
        {
          title: 'Time',
          dataIndex: 'timestamp',
          key: 'time',  
          width: "9%",
          render: (time:any)=>moment.utc(time).format("hh:mm A")
        },
        { 
            title: 'User', 
        dataIndex: 'userName', 
        key: 'user', 
        width: "11%"
    },
        {
             title: 'Category', 
             dataIndex: 'category',
              key: 'category', 
              width: "12%"
            },
        { 
            title: 'Before Value', 
            dataIndex: 'beforeData', 
            key: 'before value', 
            width: "19.5%",
            render: (meta: any)=>{
              return meta? <div className="jsonDataCell">{JSON.stringify(meta? meta:"N/A").replace(/[\])}[{(""]/g, "").split(",").map((d, index)=>{
                return<div key= {index}><span >{d}</span><br/></div>
              })}
              </div>
              : <div>N/A</div>
            }
        },
    {
          title: 'After Value', 
          dataIndex: 'afterData',
           key: 'after value',
           width: "19.5%",
           className: "",
           render: (meta: any)=>{
            return meta? <div className="jsonDataCell">{JSON.stringify(meta? meta:"N/A").replace(/[\])}[{(""]/g, "").split(",").map((d, index)=>{
              return <div key= {index}><span >{d}</span><br/></div>
            })}
            </div>
            : <div>N/A</div>
          }
        },
        {
            title: 'IP Address', 
            dataIndex: 'ipAddress',
             key: 'ip address',
             width: "12%"
         
          },
          {
            title: 'Description', 
            dataIndex: 'description',
             key: 'description',
            width:"14%"
          },
      ];
      return(
          <Table
          className="auditTable"
          dataSource={eventTable}
          key= "auditTable"
          columns={columns}
          expandable={{ showExpandColumn: false }}
          pagination={false}
          tableLayout="fixed"
          scroll={{y:600,x:"900px"}} />
      )
  }
