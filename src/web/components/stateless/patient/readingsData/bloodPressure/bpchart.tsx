import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useLayoutEffect, useState } from "react";
export const BPChart = (props:any) => {
  const {chartData, expanded, showLabel} = props
  const [graphData, setGraphData] = useState(chartData)
  const [isdata,setIsdata] = useState(true);
  useEffect(()=>{
    if(!chartData.length) {
      setIsdata(false)
    }else{
      setIsdata(true)
      setGraphData(chartData);
    } 
  },[chartData]);
    useLayoutEffect(()=>{
      if(isdata) {
      graphData?.forEach((item: any)=>{
        if(item.diastolic > item?.diastolicBound?.maxBound || item.diastolic < item?.diastolicBound?.minBound)
        {
        item['getDiastolicFillColor'] = {fill: am5.color("#DC143C")};
        }else{
        item['getDiastolicFillColor'] = {fill: am5.color("#4CAF50")};
        }
        if(item.systolic > item?.systolicBound?.maxBound || item.systolic < item?.systolicBound?.minBound){
          item["getSystolicFillColor"] = {fill: am5.color("#DC143C")}
        }else{
          item['getSystolicFillColor'] = {fill: am5.color("#4CAF50")};
          }
        })
    let root = am5.Root.new(expanded?"chartDivExpanded": "chartDiv");
    let legendRoot = am5.Root.new(expanded?"legendRowExpanded": "legendRow");
    let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          layout: root.verticalLayout,
    
  
        })
      );
      root.setThemes([am5themes_Animated.new(root)]);
      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "day",
          visible: true,
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 30,
            strokeOpacity: 0.5,
            strokeWidth: 0.5,
            maxWidth: 15
        }),
        })
      );
      let xRenderer = xAxis.get("renderer")
      xRenderer.labels.template.setAll({
        fontSize: 10,
        oversizedBehavior: "truncate",
        maxWidth: 100,
        width: expanded? am5.percent(8): am5.percent(10),
        textAlign: "center",
        fill: am5.color("#898989"),
        paddingTop:5
      })
      xRenderer.ticks.template.setAll({
        stroke: am5.color("#898989"),
        strokeWidth: 1,
        visible: true
      });
     
      xAxis.data.setAll(graphData);
      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          min: 0,
          max: showLabel ? 200: undefined,
          extraMax: 0.1,
          visible: true,
          renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.5,
          strokeWidth: 0.5,
          })
        })
      );
      let yAxis2 = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          
          renderer: am5xy.AxisRendererY.new(root, {
            opposite: true,
            fill:  am5.color("#898989"),
            stroke: am5.color("#898989"),
            strokeOpacity: 1,
            strokeWidth: 0.15,
            visible: true
          }),
        })
      );
      let yRenderer = yAxis.get("renderer");
      yRenderer.labels.template.setAll({
        fontSize: 10,
        oversizedBehavior: "none",
        maxWidth: 100,
        textAlign: "center",
       fill: am5.color("#898989"),
       fontWeight: "600"
      })
      yRenderer.ticks.template.setAll({
        stroke: am5.color("#898989"),
        strokeWidth: 1,
        visible: true
      });
     
      var label1 = am5.Label.new(root, {
        rotation: -90,
        text: "Blood Pressure (mmHg)",
        y: am5.p50,
        centerX: am5.p50,
        fill: am5.color("#898989"),
        fontSize: 12,
        
      })

      yAxis.children.unshift(
        label1
      );

        let diastolicDataItem:any = yAxis.makeDataItem({ value: graphData[0]?.diastolicBound?.maxBound,above:true,label: am5xy.AxisLabel.new(root, {
          rotation: -90,
          text: "Blood Pressure (mmHg)",
          y: am5.p50,
          centerX: am5.p50,
          fill: am5.color("#898989"),
          fontSize: 12,
          
          
        }), });


       
        yAxis.createAxisRange(diastolicDataItem);
        diastolicDataItem?.get("grid").setAll({
          forceHidden: !expanded,
          stroke: am5.color("#FF8D17"),
          strokeOpacity: 1,
          strokeDasharray: [10,10],
          fill:am5.color("#FF8D17"),
        });

        let sysytolicDataItem:any = yAxis.makeDataItem({ value: graphData[0]?.systolicBound?.maxBound,above:true });
        
        


        yAxis.createAxisRange(sysytolicDataItem);
        sysytolicDataItem?.get("grid").setAll({
          forceHidden: !expanded,
          stroke: am5.color("#9595f4"),
          strokeOpacity: 1,
          strokeDasharray: [10,10],
          fill:am5.color("#9595f4"),
        });

        diastolicDataItem.set("bullet", am5xy.AxisBullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
          })
        }));
        
      
//       // Create range axis data item
// let rangeDataItem = yAxis.makeDataItem({
//   value: 100
// });

// // Create a range
// let range = yAxis.createAxisRange(rangeDataItem);
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      
     
      
      let series2 = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: "Systolic",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "systolic",
          categoryXField: "day",
          stroke: am5.color("#9595f4"),
          fill:am5.color("#9595f4"), 
        })
      );
      
      series2.strokes.template.setAll({
        strokeWidth: 2,
        templateField: "strokeSettings"
      });
      
      series2.strokes.template.setAll({
        strokeWidth: 3,
      });
      series2.data.setAll(graphData);
      
      series2.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            tooltipText: "{name} : {valueY}",
            templateField: "getSystolicFillColor"
          })
        });
      });
      let series3 = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: "Diastolic",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "diastolic",
          stroke: am5.color("#FF8D17"),
          categoryXField: "day",  
          fill:am5.color("#FF8D17"),
        })
      );  
      series3.strokes.template.setAll({
        strokeWidth: 3,
      });
      series3.data.setAll(graphData);
      series3.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            tooltipText: "{name} : {valueY}",
            templateField: "getDiastolicFillColor"
          })
          
        });
      });
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Pulse(bpm)",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "heartRate",
          categoryXField: "day",
          fill: am5.color("#0AB4B7"),
        })
      );
      
      series1.columns.template.setAll({
        tooltipText: "BPM : {heartRate}",
        tooltipY: 0,
        width: 20,
        templateField: "columnSettings"
      });
      
      series1.data.setAll(graphData);



     
      let legend = legendRoot.container.children.push( 
        am5.Legend.new(legendRoot, {
          width: am5.percent(100),
          centerX: expanded? am5.percent(25): am5.percent(38),
          x: expanded ? am5.percent(25) : am5.percent(60), 
          layout: root.horizontalLayout,
          useDefaultMarker: true,
        })
      );

      legend.valueLabels.template.setAll({
        width: expanded? am5.percent(15): am5.percent(20)
      })
      legend.markers.template.setAll({
        width: 6,
        height: 6
      });
      legend.labels.template.setAll({
        fontSize:expanded? 12: 10,
        width: am5.percent(25),
        maxWidth: 50
      });
      legend.data.setAll([...chart.series.values, sysytolicDataItem, diastolicDataItem])

      chart.appear(1000, 100);
      return () => {
        root.dispose()
        legendRoot.dispose()
      };
    }
    },[graphData])
    return(
      <>
      <div className="chartWrapper">
      {showLabel? <div className="nodataText">No Data Available</div> : null}
         {isdata  ? ( <div id={expanded?"chartDivExpanded": "chartDiv"} className="chartRender" style={{width:"100%", height: "350px", paddingBottom: "10px"}}> 
      </div>): null}
      </div>    


      
      </>
    )
}