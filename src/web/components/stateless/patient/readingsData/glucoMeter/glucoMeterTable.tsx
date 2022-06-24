import { Table } from "antd"
import moment from "moment"
import { useSelector } from "react-redux"
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer"
import { getBoundsForSingleReading, getThresholdsAccToUser } from "../../../../../../utility/utils"
import { ReadingRenderer } from "../readingRenderer"


 export const GlucoMeterTable = (props: any) => {
     const {data, showProvider, providerName} = props;
     const {appUser} = useSelector(AuthStateSelector)
    
     const afterBreakfast = data? data[0]?.afterBreakfast|| [] : [];
     const beforeBreakfast = data? data[0]?.beforeBreakfast|| []  : [];
     const beforeDinner =  data? data[0]?.beforeDinner|| [] : [];
     const tableData = [...afterBreakfast,...beforeBreakfast,...beforeDinner]
     const columns = [
        {
            key: "1",
            title: `Date`,
            dataIndex: "date",
            className: "spiroHead",
            render: (date: any) =>{
                return moment.utc(date).local().format("MMMM DD YYYY HH:mm")
            }
        },
        {
            key: "2",
            title: `Glucose (md/dL)`,
            dataIndex: "glucose",
            className: "spiroHead",
            render : (glucose: any, row: any)=>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                return <ReadingRenderer value={ glucose?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "glucose")}  type={"glucose"}/>
        }
        },
    ]
    if(showProvider){
        columns.splice(1,0,{
            key:"pro",
            title: "Provider",
            dataIndex: "",
            className: "spiroHead",
            render: (date: any) =>{
                return providerName
            }
            })
    }
     return (
        <Table className="readingsTable" scroll={{y: 290 }} tableLayout="fixed" columns={columns} dataSource={tableData} size={"small"} pagination={false}/>
     )
 }