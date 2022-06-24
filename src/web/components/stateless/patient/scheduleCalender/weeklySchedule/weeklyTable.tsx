import {Table} from "antd"
import { TimeRenderer } from "../dailySchedule/timeColumnRenderer"
import { WeeklyReadingsRenderer } from "./readingsRenderer"
import moment from "moment";


export const WeeklyScheduleTable = (props:any) => {
    const {days, tableData} = props
    let currentdate=moment().toDate()
    let currentday= moment(currentdate).format('DD-MM-YYYY');
    var columns: any = [
        {
            key: "time",
            title: "est",
            dataIndex: "time",
            width: "10%",
            className: "timeRenderer",
            render: (time: any)=>{
                return <TimeRenderer time={time}/>
            }
        },

        
    ]
    columns =columns.concat(days?.map((d:any)=>{
    return (
        {
            key: "day",
            title: moment(d, "DD-MM-YYYY").format("ddd DD"),
            dataIndex: d,
            className: `${currentday== d?"CurrtDaybgcolor":"daybgColor"}`,
            render: (data: any[], row: any)=>{  
                var z = data?.find((sch:any)=>{return  (sch?.start == row?.time)})
                return (
                  <div
                    style={{
                      background: data?.some((d: any) => {
                        return (
                          (z?.start <= row?.time || d?.start <= row?.time) &&
                          row?.time <= d?.end
                        );
                      })
                        ? "#F4F4F4"
                        : "transparent",
                      height: "100%",
                    
                      borderTop: data?.some((d: any) => {
                        return (
                          (z?.start <= row?.time || d?.start <= row?.time) &&
                          row?.time <= d?.end
                        );
                      })
                        ? "transparent"
                        : "1px solid rgba(137, 137, 137, 0.3)", 
                      borderLeft:"1px solid rgba(137, 137, 137, 0.3)",
                      borderRight:"1px solid rgba(137, 137, 137, 0.3)", 
                      padding: "12px",
                    }}
                  >
                 <WeeklyReadingsRenderer readings={z?.readings} row={row} day={d} sch={z}/>
                 </div>
                )
            }
        }
    )
        }))
    return(
        <Table 
            className="scheduleViewWeek"
            pagination={false}
            columns={columns}
            dataSource={tableData}
            scroll={{y:'calc(80vh - 22vh)'}}
        />
    )
}