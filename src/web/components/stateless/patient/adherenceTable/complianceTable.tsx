import { Table } from "antd";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { useSelector } from "react-redux";
import { Biometricname, Months } from "../../../../constants/enums";
import { useEffect, useState } from "react";


   

export const ComplianceScheduleTable = (props: any) => {
    const {compliance} = useSelector(PatientStateSelector);
const [tableData, setTableData] = useState([])
const getMonthByNumber = (number:any)=> {
    return Months[number]
  }
    useEffect(()=>{
        const groupby:any = [...new Set(compliance?.map((item) => item['singleMonth']))];
        const result: any = [];
        for (let i = 0; i < groupby.length; i++) {
        let temp:any = {};
        temp['singleMonth'] = groupby[i];
        for (let j = 0; j < compliance?.length; j++) {
               if(compliance[j]['singleMonth'] === groupby[i]){
                    temp[compliance[j]['biometricName']] = compliance[j]['compliancePerc'];
               }
           }
        result.push(temp);
        }
setTableData(result)

    },[compliance])

    const {tableContent} = props;
    const column = [
        {
            title: "Month",
            dataIndex: "singleMonth",
            key: "month",
            width: "14%",
            render:(month:any) =>{
                return Months[month-1]
                
            }
        },
        {
            title: "Overall",
            dataIndex: "overall",
            key: "biometricName",
            width: "12%",
            className:"columnData"
        },
        {
            title: "BP",
            dataIndex: Biometricname.BP,
            key: "bp",
            width: "10%",
            render:  (val:any) => Math.round(val * 100) / 100 || 0
        },
        {
            title: "Glucose",
            dataIndex: Biometricname.GLUCO,
            key: "glucose",
            width: "12%",  
            render:  (val:any) => Math.round(val  * 100) / 100 || 0
        },
        {
            title: "Temperature",
            dataIndex: Biometricname.TEMPRATURE,
            key: "temperature",
            width: "12%",
            render:  (val:any) => Math.round(val * 100) / 100 || 0
        },
        {

            title: "Weight",
            dataIndex: Biometricname.WEIGHT,
            key: "weight",
            width: "12%",
            render:  (val:any) => Math.round(val * 100) / 100 || 0
        },
        {
            title: "Spirometer",
            dataIndex: Biometricname.SPIRO,
            key: "spirometer",
            width: "15%",
            render:  (val:any) => Math.round(val * 100) / 100 || 0 
        },
        {
            title: "Pulse Ox",
            dataIndex:Biometricname.PULSE,
            key: "pulseOx",
            width: "13%",
            render:  (val:any) => Math.round(val * 100) / 100 || 0
            
        }
    ]
    return (
        <Table className="adherenceTable"
          dataSource={tableData}
          tableLayout= "fixed"
          scroll={{y:'calc(60vh - 51px)',x:900}}
          columns={column}  
          pagination={false} />
      )
}
