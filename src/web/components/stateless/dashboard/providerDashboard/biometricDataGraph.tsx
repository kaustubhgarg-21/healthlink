import { useEffect, useLayoutEffect, useState } from "react";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5 from "@amcharts/amcharts5";
import { Col, Row } from "antd";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { Months } from "../../../../constants/enums";

const BiometricDataGraphs = (props: any) => {
  const { chartData,legendShiftBiometric,showLabel } = props;
  const [isData, setisData] = useState(true);
  const [graphData, setGraphData] = useState<any[]>([]);
  const getMonthByNumber = (number: any) => {
    return Months[number];
  };
  useEffect(() => {
    if (chartData?.length) {
      setGraphData(chartData);
    }
  }, [chartData]);
  useLayoutEffect(() => {
    if (isData) {
      let root = am5.Root.new("chartdivbiometric");
      root.setThemes([am5themes_Animated.new(root)]);
      let legendRoot = am5.Root.new("adherenceLegendDivBiometric");

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
          max: showLabel? 1000 : undefined,
          renderer: am5xy.AxisRendererY.new(root, {
          }),
        })
      );
      yAxis.data.setAll(graphData);
      let yAxis2 = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          min: 0,
          max: showLabel? 1000 : undefined,
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
      let xRenderer = xAxis.get("renderer")
      xRenderer.labels.template.setAll({
        fontSize: 10,
        oversizedBehavior: "none",
        maxWidth: 100,
        textAlign: "center",
        fill: am5.color("#898989"),
        fontWeight: "600"
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
      let series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Patients",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "patientCount",
          categoryXField: "year",
          fill: am5.color("#D73027"),
        })
      );
      series1.data.setAll(graphData);
      let series2 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "HubID",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "hubCount",
          categoryXField: "year",
          fill: am5.color("#ED7D31"),
        })
      );
      series2.data.setAll(graphData);
      let series3 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Invalid Readings",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "invalidReadingCount",
          fill: am5.color("#4575B4"),
          categoryXField: "year",
        })
      );
      series3.data.setAll(graphData);
      let series4 = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: "Readings",
          xAxis: xAxis,
          yAxis: yAxis2,
          valueYField: "readingCount",
          categoryXField: "year",
          fill: am5.color("#000099"),
          stroke: am5.color("#000099"),
        })
      );
      series4.strokes.template.setAll({
        strokeWidth: 3,
        templateField: "strokeSettings",
      });
      series4.strokes.template.setAll({
        strokeWidth: 3,
      });
      series4.data.setAll(graphData);
      let series5 = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: "HIE Recs",
          xAxis: xAxis,
          yAxis: yAxis2,
          valueYField: "HIERecsCount",
          categoryXField: "year",
          fill: am5.color("#9595F4"),
          stroke: am5.color("#9595F4"),
        })
      );
      series5.strokes.template.setAll({
        strokeWidth: 3,
        templateField: "strokeSettings",
      });
      series5.strokes.template.setAll({
        strokeWidth: 3,
      });
      series5.data.setAll(graphData);
      var label1 = am5.Label.new(root, {
        rotation: -90,
        text: "Count",
        y: am5.p50,
        centerX: am5.p50,
        fill: am5.color("#898989"),
        fontSize: 10,
      });
      var label2 = am5.Label.new(root, {
        rotation: -90,
        text: "Count",
        y: am5.p50,
        centerX: am5.p50,       
        fill: am5.color("#898989"),
        fontSize: 10,
        position:"relative"        
      });
      yAxis.children.unshift(label1);
      yAxis2.children.push(label2);
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
      series4.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 5,
            stroke: am5.color("#000099"),
            fill: am5.color("#000099"),
            tooltipText: "{name} : {valueY}",
            templateField: "getDiastolicFillColor",
          }),
        });
      });
      series4.data.setAll(graphData);
      series5.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          locationX: 0.5,
          sprite: am5.Circle.new(root, {
            radius: 5,
            stroke: am5.color("#DC143C"),
            fill: am5.color("#DC143C"),
            tooltipText: "{name} : {valueY}",
            templateField: "getDiastolicFillColor",
          }),
        });
      });
      series5.data.setAll(graphData);
      series1.columns.template.setAll({
        tooltipText: "{name} : {valueY}",
        tooltipY: am5.percent(10),
        width: 30,
      });
      series2.columns.template.setAll({
        tooltipText: "{name} : {valueY}",
        tooltipY: am5.percent(5),
        width: 30,
        x: am5.percent(10),
      });
      series3.columns.template.setAll({
        tooltipText: "{name} : {valueY}",
        tooltipY: am5.percent(10),
        width: 30,
      });
      series4.strokes.template.setAll({
        tooltipText: "{name} : {valueY}",
        tooltipY: am5.percent(10),
        width: 30,
      });
      series5.strokes.template.setAll({
        tooltipText: "{name} : {valueY}",
        tooltipY: am5.percent(10),
        width: 30,
      });
      let legend = legendRoot.container.children.push(
        am5.Legend.new(legendRoot, {
          width: am5.percent(100),
          x: am5.percent(legendShiftBiometric),
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
        width: am5.percent(25),
        maxWidth: 50,
      });
      legend.data.setAll(chart.series.values);
      chart.appear(1000, 100);
      series1.appear();
      return () => {
        root.dispose();
        legendRoot.dispose();
      };
    }
  }, [graphData, legendShiftBiometric]);
  return (
    <>
      <Row>
        <Col span={24}>
          <div className="dashboard chartWrapper">
         {showLabel? <div className="nodataText">No Data Available</div> : null}
            <div
              id="chartdivbiometric"
              style={{ height: "100%", width: "105%" }}
            ></div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default BiometricDataGraphs;