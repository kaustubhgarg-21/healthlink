import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useLayoutEffect, useState } from "react";

export const GlucoMeterChart = (props: any) => {
  const { chartData, expanded,showLabel } = props;
  const [graphData, setGraphData] = useState(chartData);
  const [isdata,setIsdata] = useState(false);
  const [legendShift, setLegendShift] = useState(25)
  const [expandedlegendShift, setexpandedLegendShift] = useState(25)

  
  useEffect(()=>{
    if(window.innerWidth>= 1920){
      setLegendShift(35)
      setexpandedLegendShift(25)
    }else if(window.innerWidth>1600 && window.innerWidth<1920 ){
      setLegendShift(20)
      setexpandedLegendShift(20)
    }
    else if(window.innerWidth<1600 && window.innerWidth>1440 ){
      setLegendShift(25)
      setexpandedLegendShift(25)
    }
    else if(window.innerWidth<1440 && window.innerWidth>1200 ){
      setLegendShift(10)
      setexpandedLegendShift(10)
    }
     else if(window.innerWidth<1200 && window.innerWidth>998 ){
      setLegendShift(18)
      setexpandedLegendShift(1)
    }
    else if(window.innerWidth<998){
      setLegendShift(25)
      setexpandedLegendShift(30)
    }
  },[window.innerWidth])

  window.onresize = ()=>{
    if(window.innerWidth>= 1920){
      setLegendShift(30)
      setexpandedLegendShift(25)
    }else if(window.innerWidth>1600 && window.innerWidth<1920 ){
      setLegendShift(20)
      setexpandedLegendShift(20)
    }else if(window.innerWidth<1600 && window.innerWidth>1440 ){
      setLegendShift(25)
      setexpandedLegendShift(25)
    }else if(window.innerWidth<1440 && window.innerWidth>1200 ){
      setLegendShift(10)
      setexpandedLegendShift(10)
    }else if(window.innerWidth<1200 && window.innerWidth>998 ){
      setLegendShift(18)
      setexpandedLegendShift(1)
    }else if(window.innerWidth<998){
      setLegendShift(25)
      setexpandedLegendShift(30)
    }
  }
  useEffect(()=>{
    if(!(
      chartData?.length
      )) { 
      setIsdata(false)
    }else{
      setIsdata(true)
      setGraphData(chartData)
    } 
  },[chartData]);
  useLayoutEffect(() => {
    if(isdata){
      graphData?.forEach((item: any)=>{
        if(item.beforeBreakfast > item?.glucoseBound?.maxBound || item.beforeBreakfast < item?.glucoseBound?.minBound)
        {
        item['getBeforeBreakFastColor'] = {fill: am5.color("#DC143C")};
        }else{
        item['getBeforeBreakFastColor'] = {fill: am5.color("#4CAF50")};
        }
        if(item.afterBreakFast > item?.glucoseBound?.maxBound || item.afterBreakFast < item?.glucoseBound?.minBound){
          item["getAfterBreakfastColor"] = {fill: am5.color("#DC143C")}
        }else{
          item['getAfterBreakfastColor'] = {fill: am5.color("#4CAF50")};
          }
          if(item.beforeDinner > item?.glucoseBound?.maxBound || item.beforeDinner < item?.glucoseBound?.minBound){
            item["getBeforeDinnerColor"] = {fill: am5.color("#DC143C")}
          }else{
            item['getBeforeDinnerColor'] = {fill: am5.color("#4CAF50")};
            }
        })
        
    let root = am5.Root.new(expanded ? "glucoChartDivExpand" : "glucoChartDiv");
    let legendRoot = am5.Root.new(
      expanded ? "glucolegendRowExpand" : "glucolegendRow"
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
          minGridDistance:25,
          strokeOpacity: 0.5,
          strokeWidth: 0.5,
      }),
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
        max: showLabel ? 200: undefined,
        extraMax: 0.1,
        visible: true,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.5,
    strokeWidth: 0.5
        })
      })
    );
    let yRenderer = yAxis.get("renderer");
    yRenderer.ticks.template.setAll({
      stroke: am5.color("#898989"),
      strokeWidth: 1,
      visible: true
    });
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
    yRenderer.labels.template.setAll({
      fontSize: 10,
      oversizedBehavior: "none",
      maxWidth: 100,
      textAlign: "center",
     fill: am5.color("#898989"),
     fontWeight: "600"
    })
    let glucoDataItem:any = yAxis.makeDataItem({ value: graphData[0]?.glucoseBound?.maxBound,above:true  });
    yAxis.createAxisRange(glucoDataItem);
    glucoDataItem?.get("grid").setAll({
      forceHidden: !expanded,
      stroke: am5.color("#FF8D17"),
      strokeOpacity: 1,
      strokeDasharray: [10,10],
      fill:am5.color("#FF8D17"),
    });

    var label1 = am5.Label.new(root, {
      rotation: -90,
      text: "Glucose (mg/DL)",
      y: am5.p50,
      centerX: am5.p50,
      fill: am5.color("#898989"),
      fontSize: 12,
      
    })

    yAxis.children.unshift(
      label1
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    let series1 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Before Breakfast",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "beforeBreakfast",
        categoryXField: "day",
        stroke: am5.color("#0AB4B7"),
        fill: am5.color("#0AB4B7"),
      })
    );

    series1.strokes.template.setAll({
      strokeWidth: 2,
      templateField: "strokeSettings",
    });

    series1.strokes.template.setAll({
      strokeWidth: 3,
    });
    series1.data.setAll(graphData);

    series1.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          templateField: "getBeforeBreakFastColor",
          tooltipText: "{name} : {valueY}",
          visible: true
        }),
      });
    });

    let series2 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "After Breakfast",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "afterBreakfast",
        categoryXField: "day",
        stroke: am5.color("#9595F4"),
        fill: am5.color("#9595F4"),
      })
    );

    series2.strokes.template.setAll({
      strokeWidth: 2,
      templateField: "strokeSettings",
    });

    series2.strokes.template.setAll({
      strokeWidth: 3,
    });
    series2.data.setAll(graphData);

    series2.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          templateField: "getAfterBreakfastColor",
          tooltipText: "{name} : {valueY}",
        }),
      });
    });

    let series3 = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: "Before Dinner",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "beforeDinner",
        categoryXField: "day",
        stroke: am5.color("#FF8D17"),
        fill: am5.color("#FF8D17"),
      })
    );

    series3.strokes.template.setAll({
      strokeWidth: 2,
      templateField: "strokeSettings",
    });

    series3.strokes.template.setAll({
      strokeWidth: 3,
    });
    series3.data.setAll(graphData);

    series3.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          templateField: "getBeforeDinnerColor",
          tooltipText: "{name} : {valueY}",
        }),
      });
    });



   

    // Add legend
    let legend = legendRoot.container.children.push(
      am5.Legend.new(legendRoot, {
        width: am5.percent(100),    
        x: expanded? am5.percent(expandedlegendShift-6):am5.percent(legendShift - 6),
       
        layout: root.horizontalLayout,
    
        useDefaultMarker: true,
        
      })
     
    );
    legend.valueLabels.template.setAll({
      width: expanded? am5.percent(15): am5.percent(9)
    })
   
    legend.markers.template.setAll({
      width: 6,
      height: 6,
    });
    legend.labels.template.setAll({
      fontSize: expanded? 12: 10,
        oversizedBehavior: "truncate"
        
    });

    legend.data.setAll(chart.series.values);
    chart.appear(1000, 100);
    return () => {
      root.dispose();
      legendRoot.dispose();
    };
  }
  }, [graphData, isdata,expandedlegendShift,legendShift]);
  return (
    <>
    <div className="chartWrapper">
    {showLabel? <div className="nodataText">No Data Available</div> : null}
        {isdata ? (<div
        id={expanded ? "glucoChartDivExpand" : "glucoChartDiv"}
        className="chartRender"
        style={{ width: "100%", height: "350px" }}
      >
        {" "}
      </div>):null}
      </div>
    </>
  );
};
