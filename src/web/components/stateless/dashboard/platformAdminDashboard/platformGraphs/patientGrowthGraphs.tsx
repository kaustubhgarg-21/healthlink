import { Col, Row } from "antd";
import React, { useEffect, useState, useLayoutEffect } from "react";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Months } from "../../../../../constants/enums";

const PatientGrowthGraphs = ()=>{
    const [isData, setisData] = useState(true)
    const [graphData, setGraphData] = useState<any[]>([]);
    const getMonthByNumber = (number:any)=> {
      return Months[number]
    }  
    useEffect(() => {
      const json = [
        {
            "singleMonth": 4,
            "month": "2022-08-01T00:00:00.000Z",
            "biometricName": "providers",
            "adherencePerc": 522.985008818342145
        },
        {
            "singleMonth": 4,
            "month": "2022-08-01T00:00:00.000Z",
            "biometricName": "patients",
            "adherencePerc": 1000
        },  
        {
            "singleMonth": 4,
            "month": "2022-08-01T00:00:00.000Z",
            "biometricName": "family",
            "adherencePerc": 1000
        },  
        {
            "singleMonth": 5,
            "month": "2022-05-01T00:00:00.000Z",
            "biometricName": "providers",
            "adherencePerc": 522.985008818342145
        },
        {
            "singleMonth": 5,
            "month": "2022-05-01T00:00:00.000Z",
            "biometricName": "patients",
            "adherencePerc": 1000
        }, 
        {
            "singleMonth": 5,
            "month": "2022-05-01T00:00:00.000Z",
            "biometricName": "family",
            "adherencePerc": 1000
        },   
        {
            "singleMonth": 6,
            "month": "2022-04-01T00:00:00.000Z",
            "biometricName": "providers",
            "adherencePerc": 1000
        },
        {
            "singleMonth": 6,
            "month": "2022-05-01T00:00:00.000Z",
            "biometricName": "patients",
            "adherencePerc": 522.985008818342145
        },
        {
            "singleMonth": 6,
            "month": "2022-05-01T00:00:00.000Z",
            "biometricName": "family",
            "adherencePerc": 522.985008818342145
        },
        {
            "singleMonth": 7,
            "month": "2022-07-01T00:00:00.000Z",
            "biometricName": "providers",
            "adherencePerc": 522.985008818342145
        },
        {
            "singleMonth": 7,
            "month": "2022-07-01T00:00:00.000Z",
            "biometricName": "patients",
            "adherencePerc": 1000
        },  
        {
            "singleMonth": 7,
            "month": "2022-07-01T00:00:00.000Z",
            "biometricName": "family",
            "adherencePerc": 1000
        },  
        {
            "singleMonth": 8,
            "month": "2022-08-01T00:00:00.000Z",
            "biometricName": "providers",
            "adherencePerc": 522.985008818342145
        },
        {
            "singleMonth": 8,
            "month": "2022-08-01T00:00:00.000Z",
            "biometricName": "patients",
            "adherencePerc": 1000
        },  
        {
            "singleMonth": 8,
            "month": "2022-08-01T00:00:00.000Z",
            "biometricName": "family",
            "adherencePerc": 1000
        },         
    ];
      let formatted:any= [];
      json?.map((element:any)=>{
        const exist:any = formatted.findIndex((el:any) => el.year === Months[element?.singleMonth -1])
        if(exist >= 0) {
          const key:string = element?.biometricName
          const updatedEl:any = {...formatted[exist]}
          updatedEl[key] = Math.round(element?.adherencePerc * 10)/10
          formatted.splice(exist,1, updatedEl)
        } else {
          const obj:any = {};
          const key:string = element?.biometricName
          obj[key] = Math.round(element?.adherencePerc * 10)/10
          obj['year'] = getMonthByNumber(element?.singleMonth-1)
          formatted.push(obj);
        }
      })
      setGraphData(formatted)
    },[]) 
    useLayoutEffect(() => {
      if(isData){
      let root = am5.Root.new("chartdivpatientgrowth");
      root.setThemes([am5themes_Animated.new(root)]);
      let legendRoot = am5.Root.new(
       "adherenceLegendDivPatientGrowth"
      );        
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          layout: root.verticalLayout,  
        })
      );   
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "year",
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 30
          })
        }));
      xAxis.get("renderer").labels.template.setAll({
        oversizedBehavior: "none",
        maxWidth: 100,
        width: am5.percent(18),
        textAlign: "center",
      });
      xAxis.data.setAll(graphData);
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          min: 0,
          max: 1000,
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );
      yAxis.data.setAll(graphData);         
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Providers",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "providers",
          categoryXField: "year",
          fill: am5.color("#FF8D17")
        })
      ); 
      series1.data.setAll(graphData);  
      let series2 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Patients",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "patients",
          categoryXField: "year",
          fill: am5.color("#9595F4")
        })
      );  
      series2.data.setAll(graphData);  
      let series3 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Family",
          xAxis: xAxis,
          yAxis: yAxis, 
          valueYField: "family",
          fill: am5.color( "#4575B4"),
          categoryXField: "year",
        })
      );
      series3.data.setAll(graphData);  
      var label1 = am5.Label.new(root, {
        rotation: -90,
        text: "Count Thousands",
        y: am5.p50,
        centerX: am5.p50,
        fill: am5.color("#898989"),
        fontSize: 10,  
      })  
      yAxis.children.unshift(
        label1
      );  
      series1.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          locationX: 0.5,
          sprite: am5.Label.new(root, {
            centerX: am5.p50,
            populateText: true,   
          }),
        });
      });
      series1.data.setAll(graphData);  
      series2.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          locationX: 0.5,
          sprite: am5.Label.new(root, {
            centerX: am5.p50,
            populateText: true,    
          }),
        });
      });
      series2.data.setAll(graphData);
    xAxis.labelsContainer.template?.setAll({
        maxWidth: 100,
        width: am5.percent(18),
      })  
      series3.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 0.5,
          sprite: am5.Label.new(root, {
            centerX: am5.p50,
            populateText: true,    
          }),
        });
      });
      series3.data.setAll(graphData);  
      series1.columns.template.setAll({
        tooltipText:"{name} : {valueY}",
        tooltipY: am5.percent(10),
        width: 15,
      });
      series2.columns.template.setAll({
        tooltipText:"{name} : {valueY}",
        tooltipY: am5.percent(5),
        width: 15,
         x: am5.percent(10),
      });
      series3.columns.template.setAll({
        tooltipText:"{name} : {valueY}",
        tooltipY: am5.percent(10),
        width: 15,
      });
      let legend = legendRoot.container.children.push( 
        am5.Legend.new(legendRoot, {
          width: am5.percent(10),
          centerX: am5.percent(10),
          x: am5.percent(45), 
          layout: root.horizontalLayout,
          useDefaultMarker: true,        
        })
      );
      legend.markers.template.setAll({
        width: 6,
        height: 6,        
      });
      legend.labels.template.setAll({
        fontSize: 12,
        width: 10,
      });
      legend.data.setAll(chart.series.values);     
      chart.appear(1000, 100);
      series1.appear();    
     return () => {root.dispose(); legendRoot.dispose();};
    }
    }, [graphData]);
    return(
        <>
        <Row>
        <Col span={24} id="adherenceLegendDivPatientGrowth"  style={{width:"100%", height:"20px"}}></Col>
        <Col span={24}>
            <div className="reports chartWrapper">
        <div id="chartdivpatientgrowth" style={{height: "100%"}}></div>
</div>      
        </Col>
      </Row>
        </>
    )
}
export default PatientGrowthGraphs;