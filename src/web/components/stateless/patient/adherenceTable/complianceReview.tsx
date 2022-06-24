import { Col, Row } from "antd";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PatientStateSelector } from "../../../../../redux/reducers/patient/patientReducer";
import { Months } from "../../../../constants/enums";
import Chartplaceholder from "../../common/chartplaceholder";

export const ComplianceGraph = (props: any) => {
  const {legendShift}=props;
  const {compliance} = useSelector(PatientStateSelector);
  const [graphData, setGraphData] = useState<any[]>([]);
  const [isData, setisData] = useState(true)

  const getMonthByNumber = (number:any)=> {
    return Months[number]
  }
  const getDummyData = () => {
    var dum: any = [];
    for (var i = 0; i < 6; i++) {
      dum.push({
        ["year"]: getMonthByNumber(i),
      });
    }
    return dum;
  };
  useEffect(() => {
  if(compliance?.length > 0){
    let formatted:any= [];
    compliance?.map((element:any)=>{
      const exist:any = formatted.findIndex((el:any) => el.year === Months[element?.singleMonth -1])
      if(exist >= 0) {
        const key:string = element?.biometricName
        const updatedEl:any = {...formatted[exist]}
        updatedEl[key] = Math.round(element?.compliancePerc * 10)/10|| 0
        formatted.splice(exist,1, updatedEl)
      } else {
        const obj:any = {};
        const key:string = element?.biometricName
        obj[key] = Math.round(element?.compliancePerc * 10)/10|| 0
        obj['year'] = getMonthByNumber(element?.singleMonth-1)
        formatted.push(obj);
      }
    })
    setGraphData(formatted)
  }else{
    setGraphData(getDummyData())
  }
  },[compliance])

  useEffect(()=>{
    if(graphData?.length>0){
      setisData(true)
    }else{
      setisData(false)
    }
  },[graphData])

  useLayoutEffect(() => {
    if(isData){
    let root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);
    let legendRoot = am5.Root.new(
     "adherenceLegendDiv"
    );

   
    // create chart
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        layout: root.verticalLayout,

      })
    );

   

    // add scrollbar
    // chart.set(
    //   "scrollbarX",
    //   am5.Scrollbar.new(root, {
    //     orientation: "horizontal"
    //   })
    // );
    let data = graphData;   
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: am5xy.AxisRendererX.new(root, {}),
       
      })
    );

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        max: 100,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

   
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    // function createSeries(field :any, name : any){
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "BP",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "bloodpressure",
        categoryXField: "year",
        fill: am5.color("rgba(215, 48, 39, 1)"),
      })
    );


    series1.data.setAll(data);

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Glucose",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "glucose",
        categoryXField: "year",
        fill: am5.color("rgba(252, 141, 89, 1)"),
      })
    );

    series2.data.setAll(data);

    let series3 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Temperature",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "temperature",
        fill: am5.color( "rgba(255, 222, 161, 1)"),
        categoryXField: "year",
      })
    );
    series3.data.setAll(data);

    let series4 = chart.series.push(  
      am5xy.ColumnSeries.new(root, {
        name: "Weight",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "weight",
        categoryXField: "year",
        fill: am5.color( "rgba(224, 243, 248, 1)"),
      })
    );

    series4.data.setAll(data);

    let series5 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Spirometer",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "spirometry",
        categoryXField: "year",
        fill: am5.color("rgba(145, 191, 219, 1)"),
      })
    );

    series5.data.setAll(data);

    let series6 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Pulse Ox",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "pulseox",
        categoryXField: "year",
        fill: am5.color( "rgba(69, 117, 180, 1)"),
      })
    );

    series6.data.setAll(data);

    var label1 = am5.Label.new(root, {
      rotation: -90,
      text: "Percentage",
      y: am5.p50,
      centerX: am5.p50,
      fill: am5.color("#898989"),
      fontSize: 12,
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
          text: "{valueY}",
          populateText: true,
  
        }),
      });
    });
    series1.data.setAll(data);

    series2.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        locationX: 0.5,
        sprite: am5.Label.new(root, {
          centerX: am5.p50,
          text: "{valueY}",
          populateText: true,
  
        }),
      });
    });
    series2.data.setAll(data);

    series3.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        locationX: 0.5,
        sprite: am5.Label.new(root, {
          centerX: am5.p50,
          text: "{valueY}",
          populateText: true,
  
        }),
      });
    });

    series3.data.setAll(data);

    series4.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        locationX: 0.5,
        sprite: am5.Label.new(root, {
          centerX: am5.p50,
          text: "{valueY}",
          populateText: true,
        }),
      });
    });
    series4.data.setAll(data);

    series5.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        locationX: 0.5,
        sprite: am5.Label.new(root, {
          centerX: am5.p50,
          text: "{valueY}",
          populateText: true,
        }),
      });
    });
    series5.data.setAll(data);

    series6.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        locationX: 0.5,
        sprite: am5.Label.new(root, {
          centerX: am5.p50,
          text: "{valueY}",
          populateText: true,
        }),
      });
    });
    series6.data.setAll(data);
    series1.columns.template.setAll({
      tooltipText:"{name} : {valueY}",
      tooltipY: am5.percent(10),
      width: 30,
    });
    series2.columns.template.setAll({
      tooltipText:"{name} : {valueY}",
      tooltipY: am5.percent(10),
      width: 30,
    });
    series3.columns.template.setAll({
      tooltipText:"{name} : {valueY}",
      tooltipY: am5.percent(10),
      width: 30,
    });
    series4.columns.template.setAll({
      tooltipText:"{name} : {valueY}",
      tooltipY: am5.percent(10),
      width: 30,
    });
    series5.columns.template.setAll({
      tooltipText:"{name} : {valueY}",
      tooltipY: am5.percent(10),
      width: 30,
    });
    series6.columns.template.setAll({
      tooltipText:"{name} : {valueY}",
      tooltipY: am5.percent(10),
      width: 30,
    });
   

    let yRenderer = yAxis.get("renderer")
    yRenderer.labels.template.setAll({
      fontSize: 10,
      oversizedBehavior: "none",
      maxWidth: 100,
      textAlign: "center",
     fill: am5.color("#898989"),
     fontWeight: "600"
    })
    let xRenderer = xAxis.get("renderer")
      xRenderer.labels.template.setAll({
        fontSize: 10,
        oversizedBehavior: "none",
        maxWidth: 100,
        textAlign: "center",
        fill: am5.color("#898989"),
        fontWeight: "600"
      })
    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = legendRoot.container.children.push( 
      am5.Legend.new(legendRoot, {
        width: am5.percent(100),
        // centerX: am5.percent(45),
        // x: am5.percent(60), 
        x: am5.percent(legendShift-6),
        layout: root.horizontalLayout,
        useDefaultMarker: true,
      
      })
    );
    legend.markers.template.setAll({
      width: 6,
      height: 6,
      
    });
    legend.labels.template.setAll({
      fontSize: 10,
      width: 30,
    });
    legend.data.setAll(chart.series.values);
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    series1.appear();
  
   return () => {root.dispose(); legendRoot.dispose();};
  }
  }, [graphData, isData,legendShift]);

  // createSeries("bloodPressure" , "BloodPressure")
  return (
    <>
      <Row>
        <Col span={24}>
        <div className="reports chartWrapper">
          {isData?
            <div id="chartdiv" style={{height: "100%"}}></div>
            :
            <Chartplaceholder text="No Data Available"/>
          }
          </div>
          
        </Col>
      </Row>
      </>
  );
};
