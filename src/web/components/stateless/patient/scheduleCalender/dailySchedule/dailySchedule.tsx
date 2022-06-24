import {Table} from "antd"
import "./dailySchedule.less"
import { ReadingsRenderer } from "./readingColumnRenderer"
import { TimeRenderer } from "./timeColumnRenderer"

export const DailyScheduleTable = (props:any) => {
    const {day, tableData} = props
    var columns = [
        {
            key: "time",
            title: "EST",
            dataIndex: "time",
            width: "7%",
            className: "timeRenderer",
            render: (time: string)=>{
                return <TimeRenderer time={time}/>
            }
        },
        {
            key: "day",
            title: day,
            width: "90%",
            className: "readCol",
            dataIndex: "data",
            render: (data: any[], row: any)=>{  
                var z = data?.find((d:any)=>{return  (d?.start == row?.time)})
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
                      border: data?.some((d: any) => {
                        return (
                          (z?.start <= row?.time || d?.start <= row?.time) &&
                          row?.time <= d?.end
                        );
                      })
                        ? "transparent"
                        : "1px solid rgba(137, 137, 137, 0.3)",
                    }}
                  >
                    <ReadingsRenderer readings={z?.readings} row={row} day={day} sch={z}/>
                  </div>
                );
            }

        },
        
    ]

    return(
        <Table 
            className="scheduleViewDay"
            pagination={false}
            columns={columns}
            dataSource={tableData}
            scroll={{y:'calc(80vh - 22vh)'}}
        />
    )
}