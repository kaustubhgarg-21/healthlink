import { Table } from "antd"
import moment from "moment"
import { useSelector } from "react-redux"
import { AuthStateSelector } from "../../../../../../redux/reducers/authReducer/authReducer"
import { getBoundsForSingleReading, getThresholdsAccToUser } from "../../../../../../utility/utils"
import { ReadingRenderer } from "../readingRenderer"

 export const WeightTable = (props: any) => {
     const {data, showProvider, getActiveBound, providerName} = props;
     const {appUser} = useSelector(AuthStateSelector)
     const columns = [
        {
            key: "1",
            title: `Date`,
            dataIndex: "date",
            width: "30%",
            className: "spiroHead",
            render: (date: any) =>{
                return moment.utc(date).local().format("MMMM DD YYYY HH:mm")
            }
        },
        {
            key: "2",
            title: `Weight`,
            dataIndex: "weight",
            width:"25%",
            className: "spiroHead",
            render : (weight: any, row: any)=>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
               return <ReadingRenderer value={ weight?.value} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), "weight")}  type={"weight"}/>
            }
        },
        {
            key: "3",
            title: `Change`,
        
            dataIndex: "weightChange",
            className: "spiroHead",
            render : (weightChange: any, row: any)=>{
                const Bounds = row?.Bounds?   row?.Bounds: {}
                var change = row[getActiveBound(row)]
                if(weightChange!=null || weightChange !=undefined){
                    return <ReadingRenderer value={weightChange} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), getActiveBound(row))}  type={"weight"}/> 
                }else{
                    return <ReadingRenderer value={change} threshold={getBoundsForSingleReading(getThresholdsAccToUser(Bounds, appUser), getActiveBound(row))}  type={"weight"}/>
                }    
             }
        },   
    ]
    if(showProvider){
        columns.splice(1,0,{
            key:"pro",
            title: "Provider",
            dataIndex: "",
            className: "spiroHead",
            width: "20",
            render: (date: any) =>{
                return providerName
            }
            })
    }
     return (
        <Table scroll={{y: 290 }}  className="readingsTable" tableLayout="fixed" columns={columns} dataSource={data} size={"small"} pagination={false}/>
     )
 }