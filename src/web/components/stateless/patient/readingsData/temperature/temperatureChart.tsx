import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useLayoutEffect, useState } from "react";

export const TemperatureChart = (props: any) => {
  const { chartData, expanded,showLabel } = props;
  const [graphData, setGraphData] = useState(chartData);
  const [isdata,setIsdata] = useState(false);
  useEffect(()=>{
    if(!chartData.length) {
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
        item.temperature > item?.temperatureBound?.maxBound ||
        item.temperature < item?.temperatureBound?.minBound
      ) {
        item["getTemperatureFill"] = { fill: am5.color("#DC143C") };
      } else {
        item["getTemperatureFill"] = { fill: am5.color("#4CAF50") };
      }
    });
    let root = am5.Root.new(
      expanded ? "temperatureChartDivExpand" : "temperatureChartDiv"
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
            minGridDistance: 22,
            strokeOpacity: 0.5,
            strokeWidth: 0.5
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
        min: 0,
    max:showLabel ? 110: undefined,
    extraMax: 0.1,
    visible: true,
    renderer: am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.5,
strokeWidth: 0.5
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
    var label1 = am5.Label.new(root, {
      rotation: -90,
      text: "Temperature",
      fill: am5.color("#898989"),
      fontSize: 12,
      y: am5.p50,
      centerX: am5.p50,
     
    })
    let yRenderer = yAxis.get("renderer");
      yRenderer.ticks.template.setAll({
        stroke: am5.color("#898989"),
        strokeWidth: 1,
        visible: true,
      });
    yRenderer.labels.template.setAll({
      fontSize: 10,
      oversizedBehavior: "none",
      maxWidth: 100,
      textAlign: "center",
     fill: am5.color("#898989"),
     fontWeight: "600"
    })
    yAxis.children.unshift(
      label1
    );
    let tempDataItem:any = yAxis.makeDataItem({ value: graphData[0]?.temperatureBound?.maxBound,above:true  });
    yAxis.createAxisRange(tempDataItem);
    tempDataItem?.get("grid").setAll({
      forceHidden: !expanded,
      stroke: am5.color("#DC143C"),
      strokeOpacity: 1,
      strokeDasharray: [10,10],
      fill:am5.color("#DC143C"),
    });
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Temperature",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "temperature",
        categoryXField: "day",

      })
    );
    series1.data.setAll(graphData);
    series1.columns.template.setAll({
      tooltipY: am5.percent(10),
      width: expanded ? 15 :25,
      templateField: "getTemperatureFill",
      tooltipText: "{name} : {valueY}",
    });
   
    chart.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }
  }, [graphData, isdata]);
  return (
    <>
    <div className="chartWrapper temperatureChart">
    {showLabel? <div className="nodataText">No Data Available</div> : null}
      {isdata ? (  <div
        id={expanded ? "temperatureChartDivExpand" : "temperatureChartDiv"}
        className="chartRender"
        style={{ width: "100%", height: "350px" }}
      >
        {" "}
      </div>):true}
    
      </div>
    </>
  );
};
