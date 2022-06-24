import { Calendar } from "antd";
import moment from "moment";
import { MonthCellRenderer } from "./dateRenderer";
moment.updateLocale('en', {
    weekdaysMin : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  });
export const MonthSchedule = (props:any) => {
    const {selectedMonth, data} = props;
    const getSchedule = (date: any) => {
        var sch: any = {}
        data.map((x: any)=>{
            if(date.format("YYYY-MM-DD") === Object.keys(x)[0])
                sch = x
        })
       return sch
    }
    return (
        <Calendar
        className="scheduleMonth"
        dateCellRender= {(date)=><MonthCellRenderer date={date} schedule={getSchedule(date)}/>
        }
        mode="month"
       value={selectedMonth}
    />
    )
}