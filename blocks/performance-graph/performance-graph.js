/* eslint-disable */

import chartsData from "./data.js";
import * as am5 from "../../scripts/index.js";
import * as am5xy from "../../scripts/xy.js";
import * as am5themes_Animated from "../../scripts/Animated.js";
import { div, h2, a, p, h4, span } from "../../scripts/dom-helpers.js";

export default function decorate(block) {


  const col1 = block.children[0].querySelector("h4");
  const col2 = block.children[0].querySelector("p");

  const fundNote = h4(col1.textContent.trim());
  const fundCAGR = p(col2.textContent.trim());

  const filterBar = document.createElement("div");
  filterBar.className = "chart-filter-bar";

  const filters = ["1M", "3M", "6M", "1Y", "3Y", "5Y", "All"];
  let activeFilter = "3Y";

  // ✅ Store chart root reference for disposal
  let root = null;

  filters.forEach((label) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = "filter-btn";
    if (label === activeFilter) btn.classList.add("active");
    btn.addEventListener("click", () => {
      activeFilter = label;
      [...filterBar.children].forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      showGraph(label); // Call graph with current filter
    });
    filterBar.appendChild(btn);
  });

  const topBar = div(
    { class: "fund-note-container" },
    h4({ class: "fund-note" }, fundNote)
  );
  const middleBar = div(
    { class: "fund-main" },
    div({ class: "fund-filters" }, filterBar),
    div(
      { class: "fund-cagr" },
      div({ class: "graph-cagr" }, fundCAGR),
      div({ class: "fund-cagr-container" },
        span({ class: "filter-selected" }, "3Y"),
        span({ class: "cagr-value" }, "25.44%")
      )
    )
  );

  block.innerHTML = "";
  block.prepend(topBar, middleBar);

  // Graph container
  const graphDiv = document.createElement("div");
  graphDiv.id = "chartdiv";
  //   graphDiv.style.width = "100%";
  //   graphDiv.style.height = "500px";
  block.append(graphDiv);

  const useLiveAPI = true;

  async function showGraph(filter) {
    try {
      let parsedChartData;

      if (useLiveAPI) {
        // const requestData = {
        //   api_name: "PerformanceGraphNew",
        //   cmt_schcode: "24097",
        //   graphType: "Lumpsum",
        //   invamount: "10000",
        //   isCompare: "",
        //   isin: "INF247L01445",
        //   schcode: "FM",
        // };
        const requestData = {
          "api_name": "PerformanceGraphNew",
          "cmt_schcode": "26136",
          "graphType": "Lumpsum",
          "invamount": "10000",
          "isCompare": "",
          "isin": "INF247L01502",
          "period": "Y",
          "schcode": "CP"
        }

        parsedChartData = await myAPI(
          "POST",
          "https://www.motilaloswalmf.com/mutualfund/api/v1/PerformanceGraphNew",
          requestData
        );
      } else {
        parsedChartData = chartsData;
      }

      // const key = Object.keys(parsedChartData)[0];
      // const chartArray = parsedChartData[key];
      if (useLiveAPI) {
        var key = Object.keys(parsedChartData.data.response)[0];
        var chartArray = parsedChartData.data.response[key]
      } else {
        var key = Object.keys(parsedChartData)[0];
        var chartArray = parsedChartData[key];
      }

      // Dummy filter logic (actual API or backend should filter this)
      const filteredData = filterChartData(chartArray, filter);

      const chartData = filteredData.map((item) => ({
        date: new Date(item.navdate).getTime(),
        value1: parseFloat(item.marketValue_Scheme),
        value2: parseFloat(item.marketValue_BM1),
      }));

      renderChart(chartData);
    } catch (error) {
      console.error("Error loading chart data:", error);
    }
  }

  function filterChartData(data, filter) {
    if (!data || data.length === 0) return [];

    // Sort data by date to ensure proper filtering
    const sortedData = data.sort(
      (a, b) => new Date(a.navdate) - new Date(b.navdate)
    );

    if (filter === "All") {
      return sortedData;
    }

    // Get the latest date from the data
    const latestDate = new Date(sortedData[sortedData.length - 1].navdate);

    const daysMap = {
      "1M": 30,
      "3M": 90,
      "6M": 180,
      "1Y": 365,
      "3Y": 1095,
      "5Y": 1825,
    };

    const days = daysMap[filter];
    if (!days) return sortedData;

    // Calculate the cutoff date from the latest data point
    const cutoffDate = new Date(
      latestDate.getTime() - days * 24 * 60 * 60 * 1000
    );

    // Filter data from cutoff date onwards
    const filteredData = sortedData.filter(
      (item) => new Date(item.navdate) >= cutoffDate
    );

    // If no data matches the filter (like your sample data is too recent), return all data
    // This prevents empty charts when testing with limited date ranges
    return filteredData.length > 0 ? filteredData : sortedData;
  }

  function renderChart(chartData) {
    if (root) {
      root.dispose();
      root = null;
    }

    window.am5.ready(() => {
      root = window.am5.Root.new("chartdiv");

      root.setThemes([window.am5themes_Animated.new(root)]);

      const chart = root.container.children.push(
        window.am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingBottom: 80,
        })
      );

      chart.get("colors").set("step", 3);

      const cursor = chart.set("cursor", window.am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      const xAxis = chart.xAxes.push(
        window.am5xy.DateAxis.new(root, {
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: window.am5xy.AxisRendererX.new(root, {
            minorGridEnabled: true,
          }),
        })
      );

      xAxis.get("renderer").labels.template.setAll({
        fill: window.am5.color(0x212121),
        fontFamily: "Poppins",
        fontSize: 14,
        fontWeight: 400,
        paddingTop: 8,
      });

      const yAxis = chart.yAxes.push(
        window.am5xy.ValueAxis.new(root, {
          renderer: window.am5xy.AxisRendererY.new(root, {}),
        })
      );

      // Hide all grids
      xAxis.get("renderer").grid.template.set("visible", false);
      yAxis.get("renderer").grid.template.set("visible", false);

      // Show only bottom X axis baseline
      xAxis.get("renderer").setAll({
        strokeOpacity: 1,
        stroke: window.am5.color(0xCCCCCC)
      });

      // Show only left Y axis baseline
      yAxis.get("renderer").setAll({
        strokeOpacity: 1,
        stroke: window.am5.color(0xCCCCCC)
      });

      // Shared tooltip
      const sharedTooltip = window.am5.Tooltip.new(root, {
        getFillFromSprite: false,
        autoTextColor: false,
      });
      sharedTooltip.get("background").setAll({
        fill: window.am5.color(0x2f2fa2),
        fillOpacity: 1,
        strokeOpacity: 0,
        cornerRadius: 6,
      });
      sharedTooltip.label.setAll({
        fill: window.am5.color(0xffffff),
        fontFamily: "Poppins",
        fontSize: 14,
        fontWeight: 400,
      });

      // Series 1
      const series1 = chart.series.push(
        window.am5xy.LineSeries.new(root, {
          name: "Motilal Oswal Large and Midcap fund",
          xAxis,
          yAxis,
          valueYField: "value1",
          valueXField: "date",
          tensionX: 0.8,
          tooltip: sharedTooltip,
          paddingTop: 40
        })
      );

      series1.strokes.template.setAll({
        strokeWidth: 2,
        stroke: window.am5.color(0x4a68f6),
      });
      series1.fills.template.setAll({
        visible: true,
        fillOpacity: 0.2,
        fillGradient: window.am5.LinearGradient.new(root, {
          stops: [
            { color: window.am5.color(0x4a68f6), opacity: 0.3 },
            { color: window.am5.color(0xffffff), opacity: 0 },
          ],
          rotation: 90,
        }),
      });

      // Series 2
      const series2 = chart.series.push(
        window.am5xy.LineSeries.new(root, {
          name: "Nifty 100 TRI",
          xAxis,
          yAxis,
          valueYField: "value2",
          valueXField: "date",
          tensionX: 0.8,
          tooltip: sharedTooltip,
        })
      );

      series2.strokes.template.setAll({
        strokeWidth: 2,
        stroke: window.am5.color(0xf5a623),
      });
      series2.fills.template.setAll({
        visible: true,
        fillOpacity: 0.2,
        fillGradient: window.am5.LinearGradient.new(root, {
          stops: [
            { color: window.am5.color(0xf5a623), opacity: 0.3 },
            { color: window.am5.color(0xffffff), opacity: 0 },
          ],
          rotation: 90,
        }),
      });

      // Series 1 - Blue
      series1.setAll({
        stroke: window.am5.color(0x7a88fd),
        fill: window.am5.LinearGradient.new(root, {
          stops: [
            { color: window.am5.color(0x7a88fd), opacity: 1 },
            { color: window.am5.color(0x7a88fd), opacity: 0 }
          ],
          rotation: 90
        })
      });

      // Series 2 - Orange
      series2.setAll({
        stroke: window.am5.color(0xff9811),
        fill: window.am5.LinearGradient.new(root, {
          stops: [
            { color: window.am5.color(0xff9811), opacity: 1 },
            { color: window.am5.color(0xff9811), opacity: 0 }
          ],
          rotation: 90
        })
      });



      // Combine tooltip text for both series (REPLACEMENT)
      sharedTooltip.label.adapters.add("text", (text, target) => {
        try {
          const axisPos = xAxis.toAxisPosition(cursor.getPrivate("positionX"));
          const dataItem1 = xAxis.getSeriesItem(series1, axisPos);
          const dataItem2 = xAxis.getSeriesItem(series2, axisPos);

          const dateVal =
            (dataItem1 && dataItem1.get("valueX")) ||
            (dataItem2 && dataItem2.get("valueX"));

          const formattedDate = dateVal
            ? root.dateFormatter.format(new Date(dateVal), "d MMM yyyy")
            : "";

          let result = formattedDate ? `Nav on [bold]${formattedDate}[/]\n\n` : "";

          // Series 1 bullet in actual stroke color
          if (dataItem1) {
            const color1 = series1.get("stroke").toCSSHex();
            const val1 = dataItem1.get("valueY");
            result += `[#${color1.replace("#", "")}]●[/] [bold]${root.numberFormatter.format(val1, "#,###.00")}[/]\n`;
          }

          // Series 2 bullet in actual stroke color
          if (dataItem2) {
            const color2 = series2.get("stroke").toCSSHex();
            const val2 = dataItem2.get("valueY");
            result += `[#${color2.replace("#", "")}]●[/] [bold]${root.numberFormatter.format(val2, "#,###.00")}[/]`;
          }

          return result || text;
        } catch (err) {
          return text;
        }
      });




      root.dateFormatter.setAll({
        dateFormat: "yyyy-MM-dd",
        dateFields: ["valueX"],
      });

      series1.data.setAll(chartData);
      series2.data.setAll(chartData);

      const legend = chart.children.push(
        window.am5.Legend.new(root, {
          centerX: window.am5.p50,
          x: window.am5.p50,
          centerY: window.am5.p100,
          y: window.am5.percent(110),
          layout: root.horizontalLayout,
          marginTop: 30,
        })
      );
      legend.data.setAll(chart.series.values);

      series1.appear(1000);
      series2.appear(1000);
      chart.appear(1000, 100);
    });
  }

  function myAPI(method, url, data = null) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      if (data) xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const json = JSON.parse(xhr.responseText);
              resolve(json);
            } catch (err) {
              resolve(xhr.responseText);
            }
          } else {
            reject(new Error(`Request failed: ${xhr.status}`));
          }
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(data ? JSON.stringify(data) : null);
    });
  }

  // Initial load
  showGraph(activeFilter);
}
