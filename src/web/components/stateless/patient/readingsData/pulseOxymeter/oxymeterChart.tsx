import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useLayoutEffect, useState } from "react";

export const OxymeterChart = (props: any) => {
  const { chartData, expanded,showLabel } = props;
  const [graphData, setGraphData] = useState(chartData);
  const [isdata,setIsdata] = useState(false);
  useEffect(()=>{
    if(!chartData?.length) {
      setIsdata(false)
    }else{
      setIsdata(true)
      setGraphData(chartData)
    } 
  },[chartData]);
  useLayoutEffect(() => {
    if(isdata) {
    graphData?.forEach((item: any) => {
      if (
        item.spo2 > item?.spo2Bound?.maxBound ||
        item.spo2 < item?.spo2Bound?.minBound
      ) {
        item["getSpo2Color"] = { fill: am5.color("#4CAF50") };
      } else {
        item["getSpo2Color"] = { fill: am5.color("#DC143C") };
      }
    });
    let root = am5.Root.new(expanded ? "pulseChartDivExpand" : "pulseChartDiv");
    let legendRoot = am5.Root.new(
      expanded ? "pulseLegendRowExpand" : "pulseLegendRow"
    );
    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,
        
      })
    );

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
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let xRenderer = xAxis.get("renderer");
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
        min: 60,
        max:showLabel ? 150: undefined,
        extraMax: 0.1,
        visible: true,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.5,
    strokeWidth: 0.5
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    let yAxis2 = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 60,
        max:showLabel? 200: undefined,
        extraMax: 0.1,
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
      yRenderer.ticks.template.setAll({
        stroke: am5.color("#898989"),
        strokeWidth: 1,
        visible: true
      });
      yRenderer.labels.template.setAll({
        fontSize: 10,
        oversizedBehavior: "none",
        maxWidth: 100,
        textAlign: "center",
       fill: am5.color("#898989"),
       fontWeight: "600"
      })

      let yRenderer2 = yAxis2.get("renderer");
      yRenderer2.ticks.template.setAll({
        stroke: am5.color("#898989"),
        strokeWidth: 1,
        visible: true
      });
      yRenderer2.labels.template.setAll({
        fontSize: 10,
        oversizedBehavior: "none",
        maxWidth: 100,
        textAlign: "center",
       fill: am5.color("#898989"),
       fontWeight: "600"
      })
     

    var label1 = am5.Label.new(root, {
      rotation: -90,
      text: "Pulse Ox ( SpO2% )",
      y: am5.p50,
      centerX: am5.p50,
      fill: am5.color("#898989"),
      fontSize: 12,
     
    })
    var label2 = am5.Label.new(root, {
      rotation: -90,
      text: "Pulse (bpm)",
      y: am5.p50,
      centerX: am5.p50,
      fill: am5.color("#898989"),
      fontSize: 12,
     
    })

    yAxis.children.unshift(
      label1
    );
    yAxis2.children.push(label2);


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let spo2DataItem:any = yAxis.makeDataItem({ value: graphData[0]?.spo2Bound?.maxBound, above:true });
    yAxis.createAxisRange(spo2DataItem);
    spo2DataItem?.get("grid").setAll({
      forceHidden: !expanded,
      stroke:am5.color("#ec9e1a"),
      strokeOpacity: 1,
      strokeDasharray: [10,10],
     
    });
    let pulseDataItem:any = yAxis.makeDataItem({ value: graphData[0]?.pulseBound?.maxBound, above: true });
    yAxis.createAxisRange(pulseDataItem);
    pulseDataItem?.get("grid").setAll({
      forceHidden: !expanded,
      stroke: am5.color("#0AB4B7"),
      strokeOpacity: 1,
      strokeDasharray: [10,10],
      
    });

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Pulse (bpm)",
        xAxis: xAxis,
        yAxis: yAxis2,
        valueYField: "pulse",
        categoryXField: "day",
        fill: am5.color("#0AB4B7"),
      })
    );

    series1.columns.template.setAll({
      tooltipText: "{name} : {valueY}",
      tooltipY: 0,
      width: 20,
    });

    series1.data.setAll(graphData);

    let series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "SpO2%",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "spo2",
        categoryXField: "day",
        stroke:am5.color("#ec9e1a"),
        fill:am5.color("#ec9e1a"),
      })
    );

    

    series2.strokes.template.setAll({
      strokeWidth: 3,
    });
    series2.data.setAll(graphData);

    series2.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill:am5.color("#000099"),
          templateField: "getSpo2Color",
          tooltipText: "{name} : {valueY}",
          width: 30,
        }),
      });
    });
    // Add legend
    let legend = legendRoot.container.children.push(
      am5.Legend.new(legendRoot, {
        width: am5.percent(100),
      
        centerX: expanded? am5.percent(25): am5.percent(30),
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
      height: 6,
    });
    legend.labels.template.setAll({
      fontSize: expanded? 12: 10,
      width: am5.percent(40),
    });

    legend.data.setAll(chart.series.values);
    chart.appear(1000, 100);
    return () => {
      root.dispose();
      legendRoot.dispose();
    };
  }
  }, [graphData, isdata]);
  return (
    <>
     <div className="chartWrapper">
     {showLabel? <div className="nodataText">No Data Available</div> : null}
       {
       isdata ?  (<div
        id={expanded ? "pulseChartDivExpand" : "pulseChartDiv"}
        className="chartRender"
        style={{ width: "107%",height: "350px" }}
      > {" "} </div>): null
      }
      </div>
    </>
  );
};
