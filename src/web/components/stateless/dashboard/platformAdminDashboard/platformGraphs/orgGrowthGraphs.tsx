import { Col, Row } from "antd";
import { useEffect, useState, useLayoutEffect } from "react";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const OrgGrowthGraphs = (props: any) => {
  const { chartData,legendShift } = props;
  const [isData, setisData] = useState(true);
  const [graphData, setGraphData] = useState<any[]>([]);
  useEffect(() => {
    if (chartData?.length) {
      setGraphData(chartData);
    }
  }, [chartData]);
  useLayoutEffect(() => {
    if (isData) {
      let root = am5.Root.new("chartdivorggrowth");
      root.setThemes([am5themes_Animated.new(root)]);
      let legendRoot = am5.Root.new("adherenceLegendDivOrgGrowth");
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
          max: 100,
          renderer: am5xy.AxisRendererY.new(root, {}),
        })
      );
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
       fontWeight: "600"
      })
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Organizations",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "Organisation",
          categoryXField: "year",
          fill: am5.color("#D73027"),
        })
      );
      series1.data.setAll(graphData);
      let series2 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Centers",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "Centre",
          categoryXField: "year",
          fill: am5.color("#FC8D59"),
        })
      );
      series2.data.setAll(graphData);
      let series3 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Departments",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "Department",
          fill: am5.color("#4575B4"),
          categoryXField: "year",
        })
      );
      series3.data.setAll(graphData);
      var label1 = am5.Label.new(root, {
        rotation: -90,
        text: "Count",
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
        tooltipText: "{name} : {valueY}",
        tooltipY: am5.percent(10),
        width: 15,
      });
      series2.columns.template.setAll({
        tooltipText: "{name} : {valueY}",
        tooltipY: am5.percent(5),
        width: 15,
        x: am5.percent(10),
      });
      series3.columns.template.setAll({
        tooltipText: "{name} : {valueY}",
        tooltipY: am5.percent(10),
        width: 15,
      });
      let legend = legendRoot.container.children.push(
        am5.Legend.new(legendRoot, {
          width: am5.percent(100),
          x: am5.percent(legendShift),
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
  }, [graphData,legendShift]);
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="dashboard chartWrapper">
            <div
              id="chartdivorggrowth"
              style={{ height: "100%", width: "105%" }}
            ></div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default OrgGrowthGraphs;