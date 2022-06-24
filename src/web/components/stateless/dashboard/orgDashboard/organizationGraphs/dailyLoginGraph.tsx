import { Col, Row } from "antd";
import { useEffect, useState, useLayoutEffect } from "react";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { UserRoles } from "../../../../../constants/enums";
const DailyLoginGraph = (props: any) => {
  const { chartData,legendShiftDaily, showLabel} = props;
  const [isData, setisData] = useState(true);
  const [graphData, setGraphData] = useState<any[]>([]);
  useEffect(() => {
    if (chartData?.length) {
      setGraphData(chartData);
    }
  }, [chartData]);
  useLayoutEffect(() => {
    if (isData) {
      let root = am5.Root.new("chartdiv");
      root.setThemes([am5themes_Animated.new(root)]);
      let legendRoot = am5.Root.new("adherenceLegendDiv");
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
            minGridDistance: 30,
            fill:  am5.color("#898989"),
            stroke: am5.color("#898989"),
            strokeOpacity: 1,
            strokeWidth: 0.15,
            visible: true
          }),
        })
      );
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
          extraMax:0.1,
          baseValue:0,
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );
      yAxis.data.setAll(graphData);     
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
      let yRenderer2 = yAxis2.get("renderer")      
      yRenderer2.labels.template.setAll({
        fontSize: 10,
        oversizedBehavior: "none",
        maxWidth: 100,
        textAlign: "center",
        fill: am5.color("#898989"),
        fontWeight: "600"
      })
      yAxis2.data.setAll(graphData);
      let xRenderer = xAxis.get("renderer")
      xRenderer.labels.template.setAll({
        fontSize: 10,
        oversizedBehavior: "none",
        maxWidth: 100,
        textAlign: "center",
        fill: am5.color("#898989"),
        fontWeight: "600",
        visible: true
      })
      let yRenderer = yAxis.get("renderer")
      yRenderer.labels.template.setAll({
        fontSize: 10,
        oversizedBehavior: "none",
        maxWidth: 100,
        textAlign: "center",
       fill: am5.color("#898989"),
       fontWeight: "600",
       visible: true,
      })
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Providers",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: UserRoles.PROVIDER,
          categoryXField: "year",
          fill: am5.color("#4575B4"),
        })
      );
      series1.data.setAll(graphData);
      let series2 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Patients",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: UserRoles.PATIENT,
          categoryXField: "year",
          fill: am5.color("#91BFDB"),
        })
      );
      series2.data.setAll(graphData);
      var label1 = am5.Label.new(root, {
        rotation: -90,
        text: "Login rate",
        y: am5.p50,
        centerX: am5.p50,
        fill: am5.color("#898989"),
        fontSize: 10,
      });
      yAxis.children.unshift(label1);
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
      });
      series1.columns.template.setAll({
        tooltipText: "{name} : {valueY}",
        tooltipY: am5.percent(10),
        width: 30,
      });
      series2.columns.template.setAll({
        tooltipText: "{name} : {valueY}",
        tooltipY: am5.percent(5),
        width: 30,
        x: am5.percent(100),
      });
      let legend = legendRoot.container.children.push(
        am5.Legend.new(legendRoot, {
          width: am5.percent(100),
          x: am5.percent(legendShiftDaily),
          layout: root.horizontalLayout,
          useDefaultMarker: true,
        })
      );
      legend.valueLabels.template.setAll({
        width: am5.percent(20),
      });
      legend.markers.template.setAll({
        width: 6,
        height: 6,
      });
      legend.labels.template.setAll({
        fontSize: 10,
      });
      legend.data.setAll(chart.series.values);
      chart.appear(1000, 100);
      series1.appear();
      return () => {
        root.dispose();
        legendRoot.dispose();
      };
    }
  }, [graphData,legendShiftDaily]);
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="dashboard chartWrapper">
          {showLabel? <div className="nodataText">No Data Available</div> : null}
            <div id="chartdiv" style={{ height: "100%", width: "105%" }}></div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default DailyLoginGraph;