import React, { useEffect, useState, useCallback } from "react";
import { Page, Card, Select, Layout, Text, BlockStack } from "@shopify/polaris";
import { ClientOnly } from "remix-utils/client-only";
import styles from "@shopify/polaris-viz/build/esm/styles.css";
import {
  PolarisVizProvider,
  DonutChart,
  FunnelChart,
  LineChart,
  BarChart,
  SimpleBarChart,
} from "@shopify/polaris-viz";
import DateRangePicker from "./components/datepicker-button";
import DateListPicker from "./components/monthpicker";

export const links = () => [{ rel: "stylesheet", href: styles }];

function Fallback() {
  return <div>Generating Chart</div>;
}

export default function ChartsViz() {
  const [selected, setSelected] = useState("");
  const [data, setData] = useState(() => []);
  const [options, setOptions] = useState();
  const [funnelData, setFunnelData] = useState([
    {
      data: [
        {
          key: "search_submitted",
          value: 1496,
        },
        {
          key: "product_viewed",
          value: 6960,
        },
        {
          key: "checkout_started",
          value: 76,
        },
        {
          key: "charged",
          value: 70,
        },
      ],
      name: "Conversion",
    },
  ]);
  const [LineChartData, setLineChartData] = useState([
    {
      name: "Oct 01, 2023 - Feb 08, 2024",
      data: [
        { value: 9, key: "Oct 01, 2023" },
        { value: 3, key: "Oct 02, 2023" },
        { value: 8, key: "Oct 03, 2023" },
        { value: 4, key: "Oct 04, 2023" },
        { value: 6, key: "Oct 05, 2023" },
        { value: 2, key: "Oct 06, 2023" },
        { value: 8, key: "Oct 07, 2023" },
        { value: 57, key: "Oct 08, 2023" },
        { value: 33, key: "Oct 09, 2023" },
        { value: 4, key: "Oct 10, 2023" },
        { value: 4, key: "Oct 11, 2023" },
        { value: 1, key: "Oct 12, 2023" },
        { value: 1110, key: "Oct 13, 2023" },
        { value: 3496, key: "Oct 14, 2023" },
        { value: 2126, key: "Oct 15, 2023" },
        { value: 3020, key: "Oct 16, 2023" },
        { value: 2016, key: "Oct 17, 2023" },
        { value: 1226, key: "Oct 18, 2023" },
        { value: 945, key: "Oct 19, 2023" },
        { value: 883, key: "Oct 20, 2023" },
        { value: 1139, key: "Oct 21, 2023" },
        { value: 1129, key: "Oct 22, 2023" },
        { value: 1199, key: "Oct 23, 2023" },
        { value: 1457, key: "Oct 24, 2023" },
        { value: 1221, key: "Oct 25, 2023" },
        { value: 2153, key: "Oct 26, 2023" },
        { value: 3095, key: "Oct 27, 2023" },
        { value: 2452, key: "Oct 28, 2023" },
        { value: 1580, key: "Oct 29, 2023" },
        { value: 2, key: "Oct 30, 2023" },
        { value: 8, key: "Oct 31, 2023" },
        { value: 10, key: "Nov 01, 2023" },
        { value: 7, key: "Nov 02, 2023" },
        { value: 7, key: "Nov 03, 2023" },
        { value: 5, key: "Nov 04, 2023" },
        { value: 5, key: "Nov 05, 2023" },
        { value: 2629, key: "Nov 06, 2023" },
        { value: 6256, key: "Nov 07, 2023" },
        { value: 4372, key: "Nov 08, 2023" },
        { value: 3720, key: "Nov 09, 2023" },
        { value: 1087, key: "Nov 10, 2023" },
        { value: 3554, key: "Nov 11, 2023" },
        { value: 2877, key: "Nov 12, 2023" },
        { value: 3526, key: "Nov 13, 2023" },
        { value: 3992, key: "Nov 14, 2023" },
        { value: 4307, key: "Nov 15, 2023" },
        { value: 4461, key: "Nov 16, 2023" },
        { value: 6844, key: "Nov 17, 2023" },
        { value: 5908, key: "Nov 18, 2023" },
        { value: 5721, key: "Nov 19, 2023" },
        { value: 4397, key: "Nov 20, 2023" },
        { value: 4316, key: "Nov 21, 2023" },
        { value: 5052, key: "Nov 22, 2023" },
        { value: 6679, key: "Nov 23, 2023" },
        { value: 5878, key: "Nov 24, 2023" },
        { value: 4931, key: "Nov 25, 2023" },
        { value: 4984, key: "Nov 26, 2023" },
        { value: 4996, key: "Nov 27, 2023" },
        { value: 6079, key: "Nov 28, 2023" },
        { value: 6097, key: "Nov 29, 2023" },
        { value: 6204, key: "Nov 30, 2023" },
        { value: 6637, key: "Dec 01, 2023" },
        { value: 5038, key: "Dec 02, 2023" },
        { value: 4493, key: "Dec 03, 2023" },
        { value: 1972, key: "Dec 04, 2023" },
        { value: 1423, key: "Dec 05, 2023" },
        { value: 4103, key: "Dec 06, 2023" },
        { value: 4424, key: "Dec 07, 2023" },
        { value: 4756, key: "Dec 08, 2023" },
        { value: 9091, key: "Dec 09, 2023" },
        { value: 7732, key: "Dec 10, 2023" },
        { value: 5585, key: "Dec 11, 2023" },
        { value: 4894, key: "Dec 12, 2023" },
        { value: 5463, key: "Dec 13, 2023" },
        { value: 5150, key: "Dec 14, 2023" },
        { value: 3991, key: "Dec 15, 2023" },
        { value: 3810, key: "Dec 16, 2023" },
        { value: 4844, key: "Dec 17, 2023" },
        { value: 7548, key: "Dec 18, 2023" },
        { value: 6892, key: "Dec 19, 2023" },
        { value: 6203, key: "Dec 20, 2023" },
        { value: 5727, key: "Dec 21, 2023" },
        { value: 8801, key: "Dec 22, 2023" },
        { value: 4264, key: "Dec 23, 2023" },
        { value: 3124, key: "Dec 24, 2023" },
        { value: 2863, key: "Dec 25, 2023" },
        { value: 4881, key: "Dec 26, 2023" },
        { value: 5425, key: "Dec 27, 2023" },
        { value: 6338, key: "Dec 28, 2023" },
        { value: 5439, key: "Dec 29, 2023" },
        { value: 4700, key: "Dec 30, 2023" },
        { value: 3244, key: "Dec 31, 2023" },
        { value: 2698, key: "Jan 01, 2024" },
        { value: 4575, key: "Jan 02, 2024" },
        { value: 3527, key: "Jan 03, 2024" },
        { value: 2991, key: "Jan 04, 2024" },
        { value: 5361, key: "Jan 05, 2024" },
        { value: 4743, key: "Jan 06, 2024" },
        { value: 4729, key: "Jan 07, 2024" },
        { value: 3163, key: "Jan 08, 2024" },
        { value: 2560, key: "Jan 09, 2024" },
        { value: 2119, key: "Jan 10, 2024" },
        { value: 1977, key: "Jan 11, 2024" },
        { value: 1977, key: "Jan 12, 2024" },
        { value: 1570, key: "Jan 13, 2024" },
        { value: 1993, key: "Jan 14, 2024" },
        { value: 1711, key: "Jan 15, 2024" },
        { value: 1327, key: "Jan 16, 2024" },
        { value: 1421, key: "Jan 17, 2024" },
        { value: 1442, key: "Jan 18, 2024" },
        { value: 1361, key: "Jan 19, 2024" },
        { value: 1216, key: "Jan 20, 2024" },
        { value: 1180, key: "Jan 21, 2024" },
        { value: 1100, key: "Jan 22, 2024" },
        { value: 1204, key: "Jan 23, 2024" },
        { value: 1174, key: "Jan 24, 2024" },
        { value: 1129, key: "Jan 25, 2024" },
        { value: 1078, key: "Jan 26, 2024" },
        { value: 1123, key: "Jan 27, 2024" },
        { value: 1126, key: "Jan 28, 2024" },
        { value: 1200, key: "Jan 29, 2024" },
        { value: 1227, key: "Jan 30, 2024" },
        { value: 1118, key: "Jan 31, 2024" },
        { value: 1236, key: "Feb 01, 2024" },
        { value: 1166, key: "Feb 02, 2024" },
        { value: 1065, key: "Feb 03, 2024" },
        { value: 1234, key: "Feb 04, 2024" },
        { value: 1221, key: "Feb 05, 2024" },
        { value: 1301, key: "Feb 06, 2024" },
        { value: 1188, key: "Feb 07, 2024" },
      ],
    },
  ]);

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    setSelected(`${year}-${month}`);
  }, []);

  useEffect(() => {
    if (selected) {
      loadData(selected);
    }
  }, [selected]);

  async function loadData(selected) {
    const url = `https://driving-api.azurewebsites.net/operating_system/month?target_month=${selected}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    setData(responseData.data);
    setOptions(responseData.options);
  }

  async function handleSelect(selectedValue) {
    setSelected(selectedValue);
    loadData(selectedValue);
  }

  async function fetchLineData(startDate, endDate) {
    const url = `https://driving-api.azurewebsites.net/events?start_date=${startDate}&end_date=${endDate}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setLineChartData(data);
  }

  async function fetchFunnelData(startDate, endDate) {
    const url = `https://driving-api.azurewebsites.net/events_funnel?start_date=${startDate}&end_date=${endDate}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setFunnelData(data);
  }

  function handleDateChange(dateRange) {
    const startDate = formatDate(dateRange.since);
    const endDate = formatDate(dateRange.until);
    fetchLineData(startDate, endDate);
  }

  function handleFunnelDateChange(dateRange) {
    const startDate = formatDate(dateRange.since);
    const endDate = formatDate(dateRange.until);
    fetchFunnelData(startDate, endDate);
  }

  function formatDate(dateString) {
    var originalDate = new Date(dateString);

    var year = originalDate.getFullYear();
    var month = ("0" + (originalDate.getMonth() + 1)).slice(-2);
    var day = ("0" + originalDate.getDate()).slice(-2);
    var formattedDateString = year + "-" + month + "-" + day;

    return formattedDateString;
  }

  const LineChartAnnotations = [
    {
      startKey: "Feb 01, 2024",
      label: "Start of Valentine's Marketing Campaign",
      axis: "x",
      content: {
        content:
          "We ran a Valentine's Day Marketing Campaign starting from this day!",
      },
    },
    {
      startKey: "Feb 18, 2024",
      label: "End of Valentines Marketing Campaign",
      axis: "x",
    },
  ];

  const eventsData = [
    {
      name: "Marketing Campaign",
      data: [
        {
          value: 2163,
          key: "Dec 01, 2023",
        },
        {
          value: 2131,
          key: "Dec 02, 2023",
        },
        {
          value: 1812,
          key: "Dec 03, 2023",
        },
        {
          value: 892,
          key: "Dec 04, 2023",
        },
        {
          value: 653,
          key: "Dec 05, 2023",
        },
        {
          value: 1285,
          key: "Dec 06, 2023",
        },
        {
          value: 1416,
          key: "Dec 07, 2023",
        },
        {
          value: 1538,
          key: "Dec 08, 2023",
        },
        {
          value: 1953,
          key: "Dec 09, 2023",
        },
        {
          value: 1409,
          key: "Dec 10, 2023",
        },
        {
          value: 1506,
          key: "Dec 11, 2023",
        },
        {
          value: 1441,
          key: "Dec 12, 2023",
        },
        {
          value: 1681,
          key: "Dec 13, 2023",
        },
        {
          value: 1581,
          key: "Dec 14, 2023",
        },
        {
          value: 1193,
          key: "Dec 15, 2023",
        },
        {
          value: 1281,
          key: "Dec 16, 2023",
        },
        {
          value: 2043,
          key: "Dec 17, 2023",
        },
        {
          value: 2688,
          key: "Dec 18, 2023",
        },
        {
          value: 2556,
          key: "Dec 19, 2023",
        },
        {
          value: 2154,
          key: "Dec 20, 2023",
        },
        {
          value: 1801,
          key: "Dec 21, 2023",
        },
        {
          value: 3302,
          key: "Dec 22, 2023",
        },
        {
          value: 1250,
          key: "Dec 23, 2023",
        },
        {
          value: 1041,
          key: "Dec 24, 2023",
        },
        {
          value: 943,
          key: "Dec 25, 2023",
        },
        {
          value: 1298,
          key: "Dec 26, 2023",
        },
        {
          value: 1222,
          key: "Dec 27, 2023",
        },
        {
          value: 1743,
          key: "Dec 28, 2023",
        },
        {
          value: 1757,
          key: "Dec 29, 2023",
        },
        {
          value: 1532,
          key: "Dec 30, 2023",
        },
        {
          value: 964,
          key: "Dec 31, 2023",
        },
        {
          value: 963,
          key: "Jan 01, 2024",
        },
        {
          value: 1355,
          key: "Jan 02, 2024",
        },
        {
          value: 856,
          key: "Jan 03, 2024",
        },
        {
          value: 1049,
          key: "Jan 04, 2024",
        },
        {
          value: 1652,
          key: "Jan 05, 2024",
        },
        {
          value: 1893,
          key: "Jan 06, 2024",
        },
        {
          value: 1925,
          key: "Jan 07, 2024",
        },
        {
          value: 1085,
          key: "Jan 08, 2024",
        },
        {
          value: 785,
          key: "Jan 09, 2024",
        },
        {
          value: 602,
          key: "Jan 10, 2024",
        },
        {
          value: 431,
          key: "Jan 11, 2024",
        },
        {
          value: 574,
          key: "Jan 12, 2024",
        },
        {
          value: 491,
          key: "Jan 13, 2024",
        },
        {
          value: 650,
          key: "Jan 14, 2024",
        },
        {
          value: 497,
          key: "Jan 15, 2024",
        },
        {
          value: 354,
          key: "Jan 16, 2024",
        },
        {
          value: 355,
          key: "Jan 17, 2024",
        },
        {
          value: 321,
          key: "Jan 18, 2024",
        },
        {
          value: 393,
          key: "Jan 19, 2024",
        },
        {
          value: 277,
          key: "Jan 20, 2024",
        },
        {
          value: 438,
          key: "Jan 21, 2024",
        },
        {
          value: 167,
          key: "Jan 22, 2024",
        },
        {
          value: 281,
          key: "Jan 23, 2024",
        },
        {
          value: 248,
          key: "Jan 24, 2024",
        },
        {
          value: 322,
          key: "Jan 25, 2024",
        },
        {
          value: 192,
          key: "Jan 26, 2024",
        },
        {
          value: 274,
          key: "Jan 27, 2024",
        },
        {
          value: 231,
          key: "Jan 28, 2024",
        },
        {
          value: 65,
          key: "Jan 29, 2024",
        },
        {
          value: 197,
          key: "Jan 30, 2024",
        },
        {
          value: 182,
          key: "Jan 31, 2024",
        },
        {
          value: 173,
          key: "Feb 01, 2024",
        },
        {
          value: 207,
          key: "Feb 02, 2024",
        },
        {
          value: 253,
          key: "Feb 03, 2024",
        },
        {
          value: 350,
          key: "Feb 04, 2024",
        },
        {
          value: 364,
          key: "Feb 05, 2024",
        },
        {
          value: 471,
          key: "Feb 06, 2024",
        },
        {
          value: 456,
          key: "Feb 07, 2024",
        },
      ],
    },
    {
      name: "Organic Events",
      data: [
        {
          value: 4474,
          key: "Dec 01, 2023",
        },
        {
          value: 2907,
          key: "Dec 02, 2023",
        },
        {
          value: 2681,
          key: "Dec 03, 2023",
        },
        {
          value: 1080,
          key: "Dec 04, 2023",
        },
        {
          value: 770,
          key: "Dec 05, 2023",
        },
        {
          value: 2818,
          key: "Dec 06, 2023",
        },
        {
          value: 3008,
          key: "Dec 07, 2023",
        },
        {
          value: 3218,
          key: "Dec 08, 2023",
        },
        {
          value: 7138,
          key: "Dec 09, 2023",
        },
        {
          value: 6323,
          key: "Dec 10, 2023",
        },
        {
          value: 4079,
          key: "Dec 11, 2023",
        },
        {
          value: 3453,
          key: "Dec 12, 2023",
        },
        {
          value: 3782,
          key: "Dec 13, 2023",
        },
        {
          value: 3569,
          key: "Dec 14, 2023",
        },
        {
          value: 2798,
          key: "Dec 15, 2023",
        },
        {
          value: 2529,
          key: "Dec 16, 2023",
        },
        {
          value: 2801,
          key: "Dec 17, 2023",
        },
        {
          value: 4860,
          key: "Dec 18, 2023",
        },
        {
          value: 4336,
          key: "Dec 19, 2023",
        },
        {
          value: 4049,
          key: "Dec 20, 2023",
        },
        {
          value: 3926,
          key: "Dec 21, 2023",
        },
        {
          value: 5499,
          key: "Dec 22, 2023",
        },
        {
          value: 3014,
          key: "Dec 23, 2023",
        },
        {
          value: 2083,
          key: "Dec 24, 2023",
        },
        {
          value: 1920,
          key: "Dec 25, 2023",
        },
        {
          value: 3583,
          key: "Dec 26, 2023",
        },
        {
          value: 4203,
          key: "Dec 27, 2023",
        },
        {
          value: 4595,
          key: "Dec 28, 2023",
        },
        {
          value: 3682,
          key: "Dec 29, 2023",
        },
        {
          value: 3168,
          key: "Dec 30, 2023",
        },
        {
          value: 2280,
          key: "Dec 31, 2023",
        },
        {
          value: 1735,
          key: "Jan 01, 2024",
        },
        {
          value: 3220,
          key: "Jan 02, 2024",
        },
        {
          value: 2671,
          key: "Jan 03, 2024",
        },
        {
          value: 1942,
          key: "Jan 04, 2024",
        },
        {
          value: 3709,
          key: "Jan 05, 2024",
        },
        {
          value: 2850,
          key: "Jan 06, 2024",
        },
        {
          value: 2804,
          key: "Jan 07, 2024",
        },
        {
          value: 2078,
          key: "Jan 08, 2024",
        },
        {
          value: 1775,
          key: "Jan 09, 2024",
        },
        {
          value: 1517,
          key: "Jan 10, 2024",
        },
        {
          value: 1546,
          key: "Jan 11, 2024",
        },
        {
          value: 1403,
          key: "Jan 12, 2024",
        },
        {
          value: 1079,
          key: "Jan 13, 2024",
        },
        {
          value: 1343,
          key: "Jan 14, 2024",
        },
        {
          value: 1214,
          key: "Jan 15, 2024",
        },
        {
          value: 973,
          key: "Jan 16, 2024",
        },
        {
          value: 1066,
          key: "Jan 17, 2024",
        },
        {
          value: 1121,
          key: "Jan 18, 2024",
        },
        {
          value: 968,
          key: "Jan 19, 2024",
        },
        {
          value: 939,
          key: "Jan 20, 2024",
        },
        {
          value: 742,
          key: "Jan 21, 2024",
        },
        {
          value: 933,
          key: "Jan 22, 2024",
        },
        {
          value: 923,
          key: "Jan 23, 2024",
        },
        {
          value: 926,
          key: "Jan 24, 2024",
        },
        {
          value: 807,
          key: "Jan 25, 2024",
        },
        {
          value: 886,
          key: "Jan 26, 2024",
        },
        {
          value: 849,
          key: "Jan 27, 2024",
        },
        {
          value: 895,
          key: "Jan 28, 2024",
        },
        {
          value: 1135,
          key: "Jan 29, 2024",
        },
        {
          value: 1030,
          key: "Jan 30, 2024",
        },
        {
          value: 936,
          key: "Jan 31, 2024",
        },
        {
          value: 1063,
          key: "Feb 01, 2024",
        },
        {
          value: 959,
          key: "Feb 02, 2024",
        },
        {
          value: 812,
          key: "Feb 03, 2024",
        },
        {
          value: 884,
          key: "Feb 04, 2024",
        },
        {
          value: 857,
          key: "Feb 05, 2024",
        },
        {
          value: 830,
          key: "Feb 06, 2024",
        },
        {
          value: 732,
          key: "Feb 07, 2024",
        },
      ],
    },
  ];

  const eventsOsData = [
    {
      name: "Windows",
      data: [
        {
          value: 484,
          key: "Jan 01, 2024",
        },
        {
          value: 2370,
          key: "Jan 02, 2024",
        },
        {
          value: 1988,
          key: "Jan 03, 2024",
        },
        {
          value: 1652,
          key: "Jan 04, 2024",
        },
        {
          value: 2906,
          key: "Jan 05, 2024",
        },
        {
          value: 1752,
          key: "Jan 06, 2024",
        },
        {
          value: 1420,
          key: "Jan 07, 2024",
        },
        {
          value: 1770,
          key: "Jan 08, 2024",
        },
        {
          value: 1290,
          key: "Jan 09, 2024",
        },
        {
          value: 1456,
          key: "Jan 10, 2024",
        },
        {
          value: 1534,
          key: "Jan 11, 2024",
        },
        {
          value: 1106,
          key: "Jan 12, 2024",
        },
        {
          value: 436,
          key: "Jan 13, 2024",
        },
        {
          value: 416,
          key: "Jan 14, 2024",
        },
        {
          value: 1104,
          key: "Jan 15, 2024",
        },
        {
          value: 976,
          key: "Jan 16, 2024",
        },
        {
          value: 886,
          key: "Jan 17, 2024",
        },
        {
          value: 864,
          key: "Jan 18, 2024",
        },
        {
          value: 626,
          key: "Jan 19, 2024",
        },
        {
          value: 642,
          key: "Jan 20, 2024",
        },
        {
          value: 446,
          key: "Jan 21, 2024",
        },
        {
          value: 826,
          key: "Jan 22, 2024",
        },
        {
          value: 952,
          key: "Jan 23, 2024",
        },
        {
          value: 976,
          key: "Jan 24, 2024",
        },
        {
          value: 782,
          key: "Jan 25, 2024",
        },
        {
          value: 852,
          key: "Jan 26, 2024",
        },
        {
          value: 592,
          key: "Jan 27, 2024",
        },
        {
          value: 556,
          key: "Jan 28, 2024",
        },
        {
          value: 950,
          key: "Jan 29, 2024",
        },
        {
          value: 1104,
          key: "Jan 30, 2024",
        },
        {
          value: 998,
          key: "Jan 31, 2024",
        },
        {
          value: 870,
          key: "Feb 01, 2024",
        },
        {
          value: 1016,
          key: "Feb 02, 2024",
        },
        {
          value: 748,
          key: "Feb 03, 2024",
        },
        {
          value: 690,
          key: "Feb 04, 2024",
        },
        {
          value: 1000,
          key: "Feb 05, 2024",
        },
        {
          value: 910,
          key: "Feb 06, 2024",
        },
        {
          value: 942,
          key: "Feb 07, 2024",
        },
        {
          value: 1118,
          key: "Feb 08, 2024",
        },
      ],
    },
    {
      name: "Android",
      data: [
        {
          value: 4392,
          key: "Jan 01, 2024",
        },
        {
          value: 5972,
          key: "Jan 02, 2024",
        },
        {
          value: 4436,
          key: "Jan 03, 2024",
        },
        {
          value: 3740,
          key: "Jan 04, 2024",
        },
        {
          value: 6638,
          key: "Jan 05, 2024",
        },
        {
          value: 6754,
          key: "Jan 06, 2024",
        },
        {
          value: 6820,
          key: "Jan 07, 2024",
        },
        {
          value: 3862,
          key: "Jan 08, 2024",
        },
        {
          value: 3368,
          key: "Jan 09, 2024",
        },
        {
          value: 2366,
          key: "Jan 10, 2024",
        },
        {
          value: 1990,
          key: "Jan 11, 2024",
        },
        {
          value: 2570,
          key: "Jan 12, 2024",
        },
        {
          value: 2386,
          key: "Jan 13, 2024",
        },
        {
          value: 3014,
          key: "Jan 14, 2024",
        },
        {
          value: 1956,
          key: "Jan 15, 2024",
        },
        {
          value: 1404,
          key: "Jan 16, 2024",
        },
        {
          value: 1742,
          key: "Jan 17, 2024",
        },
        {
          value: 1732,
          key: "Jan 18, 2024",
        },
        {
          value: 1540,
          key: "Jan 19, 2024",
        },
        {
          value: 1550,
          key: "Jan 20, 2024",
        },
        {
          value: 1626,
          key: "Jan 21, 2024",
        },
        {
          value: 1218,
          key: "Jan 22, 2024",
        },
        {
          value: 1326,
          key: "Jan 23, 2024",
        },
        {
          value: 1094,
          key: "Jan 24, 2024",
        },
        {
          value: 1340,
          key: "Jan 25, 2024",
        },
        {
          value: 1236,
          key: "Jan 26, 2024",
        },
        {
          value: 1350,
          key: "Jan 27, 2024",
        },
        {
          value: 1476,
          key: "Jan 28, 2024",
        },
        {
          value: 1258,
          key: "Jan 29, 2024",
        },
        {
          value: 1168,
          key: "Jan 30, 2024",
        },
        {
          value: 1116,
          key: "Jan 31, 2024",
        },
        {
          value: 1370,
          key: "Feb 01, 2024",
        },
        {
          value: 1170,
          key: "Feb 02, 2024",
        },
        {
          value: 1264,
          key: "Feb 03, 2024",
        },
        {
          value: 1676,
          key: "Feb 04, 2024",
        },
        {
          value: 1360,
          key: "Feb 05, 2024",
        },
        {
          value: 1584,
          key: "Feb 06, 2024",
        },
        {
          value: 1290,
          key: "Feb 07, 2024",
        },
        {
          value: 1078,
          key: "Feb 08, 2024",
        },
      ],
    },
    {
      name: "iOS",
      data: [
        {
          value: 374,
          key: "Jan 01, 2024",
        },
        {
          value: 690,
          key: "Jan 02, 2024",
        },
        {
          value: 472,
          key: "Jan 03, 2024",
        },
        {
          value: 358,
          key: "Jan 04, 2024",
        },
        {
          value: 858,
          key: "Jan 05, 2024",
        },
        {
          value: 720,
          key: "Jan 06, 2024",
        },
        {
          value: 1044,
          key: "Jan 07, 2024",
        },
        {
          value: 378,
          key: "Jan 08, 2024",
        },
        {
          value: 272,
          key: "Jan 09, 2024",
        },
        {
          value: 288,
          key: "Jan 10, 2024",
        },
        {
          value: 164,
          key: "Jan 11, 2024",
        },
        {
          value: 200,
          key: "Jan 12, 2024",
        },
        {
          value: 166,
          key: "Jan 13, 2024",
        },
        {
          value: 266,
          key: "Jan 14, 2024",
        },
        {
          value: 112,
          key: "Jan 15, 2024",
        },
        {
          value: 112,
          key: "Jan 16, 2024",
        },
        {
          value: 100,
          key: "Jan 17, 2024",
        },
        {
          value: 60,
          key: "Jan 18, 2024",
        },
        {
          value: 204,
          key: "Jan 19, 2024",
        },
        {
          value: 70,
          key: "Jan 20, 2024",
        },
        {
          value: 204,
          key: "Jan 21, 2024",
        },
        {
          value: 122,
          key: "Jan 22, 2024",
        },
        {
          value: 48,
          key: "Jan 23, 2024",
        },
        {
          value: 168,
          key: "Jan 24, 2024",
        },
        {
          value: 82,
          key: "Jan 25, 2024",
        },
        {
          value: 18,
          key: "Jan 26, 2024",
        },
        {
          value: 104,
          key: "Jan 27, 2024",
        },
        {
          value: 156,
          key: "Jan 28, 2024",
        },
        {
          value: 64,
          key: "Jan 29, 2024",
        },
        {
          value: 66,
          key: "Jan 30, 2024",
        },
        {
          value: 70,
          key: "Jan 31, 2024",
        },
        {
          value: 114,
          key: "Feb 01, 2024",
        },
        {
          value: 80,
          key: "Feb 02, 2024",
        },
        {
          value: 96,
          key: "Feb 03, 2024",
        },
        {
          value: 80,
          key: "Feb 04, 2024",
        },
        {
          value: 62,
          key: "Feb 05, 2024",
        },
        {
          value: 56,
          key: "Feb 06, 2024",
        },
        {
          value: 82,
          key: "Feb 07, 2024",
        },
        {
          value: 88,
          key: "Feb 08, 2024",
        },
      ],
    },
    {
      name: "Mac OS X",
      data: [
        {
          value: 68,
          key: "Jan 01, 2024",
        },
        {
          value: 74,
          key: "Jan 02, 2024",
        },
        {
          value: 54,
          key: "Jan 03, 2024",
        },
        {
          value: 38,
          key: "Jan 04, 2024",
        },
        {
          value: 148,
          key: "Jan 05, 2024",
        },
        {
          value: 42,
          key: "Jan 06, 2024",
        },
        {
          value: 20,
          key: "Jan 07, 2024",
        },
        {
          value: 24,
          key: "Jan 08, 2024",
        },
        {
          value: 48,
          key: "Jan 09, 2024",
        },
        {
          value: 22,
          key: "Jan 10, 2024",
        },
        {
          value: 26,
          key: "Jan 11, 2024",
        },
        {
          value: 34,
          key: "Jan 12, 2024",
        },
        {
          value: 34,
          key: "Jan 13, 2024",
        },
        {
          value: 98,
          key: "Jan 14, 2024",
        },
        {
          value: 102,
          key: "Jan 15, 2024",
        },
        {
          value: 38,
          key: "Jan 16, 2024",
        },
        {
          value: 14,
          key: "Jan 18, 2024",
        },
        {
          value: 64,
          key: "Jan 19, 2024",
        },
        {
          value: 32,
          key: "Jan 21, 2024",
        },
        {
          value: 8,
          key: "Jan 22, 2024",
        },
        {
          value: 46,
          key: "Jan 23, 2024",
        },
        {
          value: 38,
          key: "Jan 24, 2024",
        },
        {
          value: 6,
          key: "Jan 25, 2024",
        },
        {
          value: 26,
          key: "Jan 26, 2024",
        },
        {
          value: 44,
          key: "Jan 27, 2024",
        },
        {
          value: 20,
          key: "Jan 28, 2024",
        },
        {
          value: 2,
          key: "Jan 29, 2024",
        },
        {
          value: 12,
          key: "Jan 31, 2024",
        },
        {
          value: 6,
          key: "Feb 02, 2024",
        },
        {
          value: 2,
          key: "Feb 03, 2024",
        },
        {
          value: 20,
          key: "Feb 05, 2024",
        },
        {
          value: 24,
          key: "Feb 06, 2024",
        },
        {
          value: 26,
          key: "Feb 07, 2024",
        },
        {
          value: 52,
          key: "Feb 08, 2024",
        },
      ],
    },
    {
      name: "Linux",
      data: [
        {
          value: 26,
          key: "Jan 01, 2024",
        },
        {
          value: 42,
          key: "Jan 02, 2024",
        },
        {
          value: 78,
          key: "Jan 03, 2024",
        },
        {
          value: 8,
          key: "Jan 04, 2024",
        },
        {
          value: 74,
          key: "Jan 05, 2024",
        },
        {
          value: 158,
          key: "Jan 06, 2024",
        },
        {
          value: 18,
          key: "Jan 07, 2024",
        },
        {
          value: 72,
          key: "Jan 08, 2024",
        },
        {
          value: 134,
          key: "Jan 09, 2024",
        },
        {
          value: 186,
          key: "Jan 11, 2024",
        },
        {
          value: 20,
          key: "Jan 12, 2024",
        },
        {
          value: 12,
          key: "Jan 13, 2024",
        },
        {
          value: 30,
          key: "Jan 14, 2024",
        },
        {
          value: 2,
          key: "Jan 15, 2024",
        },
        {
          value: 4,
          key: "Jan 16, 2024",
        },
        {
          value: 8,
          key: "Jan 17, 2024",
        },
        {
          value: 64,
          key: "Jan 18, 2024",
        },
        {
          value: 32,
          key: "Jan 19, 2024",
        },
        {
          value: 64,
          key: "Jan 20, 2024",
        },
        {
          value: 34,
          key: "Jan 21, 2024",
        },
        {
          value: 14,
          key: "Jan 22, 2024",
        },
        {
          value: 28,
          key: "Jan 23, 2024",
        },
        {
          value: 46,
          key: "Jan 24, 2024",
        },
        {
          value: 22,
          key: "Jan 25, 2024",
        },
        {
          value: 4,
          key: "Jan 26, 2024",
        },
        {
          value: 118,
          key: "Jan 27, 2024",
        },
        {
          value: 42,
          key: "Jan 28, 2024",
        },
        {
          value: 100,
          key: "Jan 29, 2024",
        },
        {
          value: 54,
          key: "Jan 30, 2024",
        },
        {
          value: 18,
          key: "Jan 31, 2024",
        },
        {
          value: 118,
          key: "Feb 01, 2024",
        },
        {
          value: 38,
          key: "Feb 02, 2024",
        },
        {
          value: 20,
          key: "Feb 03, 2024",
        },
        {
          value: 26,
          key: "Feb 06, 2024",
        },
        {
          value: 36,
          key: "Feb 07, 2024",
        },
        {
          value: 70,
          key: "Feb 08, 2024",
        },
      ],
    },
    {
      name: "Chrome OS",
      data: [
        {
          value: 8,
          key: "Jan 04, 2024",
        },
        {
          value: 10,
          key: "Jan 14, 2024",
        },
        {
          value: 2,
          key: "Jan 18, 2024",
        },
        {
          value: 4,
          key: "Jan 30, 2024",
        },
        {
          value: 4,
          key: "Feb 08, 2024",
        },
      ],
    },
  ];

  const newVisitorsData = [
    {
      name: "New Visitors Over Time",
      data: [
        { key: "Sep 01, 2023", value: 2 },
        { key: "Sep 02, 2023", value: 8 },
        { key: "Sep 03, 2023", value: 4 },
        { key: "Sep 04, 2023", value: 8 },
        { key: "Sep 05, 2023", value: 4 },
        { key: "Sep 06, 2023", value: 3 },
        { key: "Sep 07, 2023", value: 3 },
        { key: "Sep 08, 2023", value: 1 },
        { key: "Sep 09, 2023", value: 1 },
        { key: "Sep 10, 2023", value: 1 },
        { key: "Sep 11, 2023", value: 4 },
        { key: "Sep 12, 2023", value: 4 },
        { key: "Sep 13, 2023", value: 2 },
        { key: "Sep 14, 2023", value: 3 },
        { key: "Sep 15, 2023", value: 2 },
        { key: "Sep 16, 2023", value: 2 },
        { key: "Sep 17, 2023", value: 1 },
        { key: "Sep 18, 2023", value: 1 },
        { key: "Sep 19, 2023", value: 2 },
        { key: "Sep 20, 2023", value: 1 },
        { key: "Sep 21, 2023", value: 2 },
        { key: "Sep 25, 2023", value: 2 },
        { key: "Sep 26, 2023", value: 1 },
        { key: "Sep 28, 2023", value: 2 },
        { key: "Sep 29, 2023", value: 1 },
        { key: "Oct 01, 2023", value: 2 },
        { key: "Oct 06, 2023", value: 1 },
        { key: "Oct 07, 2023", value: 1 },
        { key: "Oct 08, 2023", value: 2 },
        { key: "Oct 09, 2023", value: 1 },
        { key: "Oct 10, 2023", value: 1 },
        { key: "Oct 14, 2023", value: 2 },
        { key: "Oct 15, 2023", value: 2 },
        { key: "Oct 18, 2023", value: 1 },
        { key: "Oct 19, 2023", value: 1 },
        { key: "Oct 24, 2023", value: 1 },
        { key: "Oct 25, 2023", value: 1 },
        { key: "Oct 26, 2023", value: 2 },
        { key: "Oct 29, 2023", value: 1 },
        { key: "Oct 31, 2023", value: 1 },
        { key: "Nov 03, 2023", value: 1 },
        { key: "Nov 06, 2023", value: 28 },
        { key: "Nov 07, 2023", value: 12 },
        { key: "Nov 08, 2023", value: 7 },
        { key: "Nov 09, 2023", value: 5 },
        { key: "Nov 10, 2023", value: 163 },
        { key: "Nov 11, 2023", value: 513 },
        { key: "Nov 12, 2023", value: 406 },
        { key: "Nov 13, 2023", value: 465 },
        { key: "Nov 14, 2023", value: 578 },
        { key: "Nov 15, 2023", value: 547 },
        { key: "Nov 16, 2023", value: 578 },
        { key: "Nov 17, 2023", value: 901 },
        { key: "Nov 18, 2023", value: 976 },
        { key: "Nov 19, 2023", value: 897 },
        { key: "Nov 20, 2023", value: 564 },
        { key: "Nov 21, 2023", value: 522 },
        { key: "Nov 22, 2023", value: 579 },
        { key: "Nov 23, 2023", value: 692 },
        { key: "Nov 24, 2023", value: 584 },
        { key: "Nov 25, 2023", value: 560 },
        { key: "Nov 26, 2023", value: 510 },
        { key: "Nov 27, 2023", value: 501 },
        { key: "Nov 28, 2023", value: 568 },
        { key: "Nov 29, 2023", value: 677 },
        { key: "Nov 30, 2023", value: 653 },
        { key: "Dec 01, 2023", value: 659 },
        { key: "Dec 02, 2023", value: 549 },
        { key: "Dec 03, 2023", value: 454 },
        { key: "Dec 04, 2023", value: 202 },
        { key: "Dec 05, 2023", value: 148 },
        { key: "Dec 06, 2023", value: 386 },
        { key: "Dec 07, 2023", value: 430 },
        { key: "Dec 08, 2023", value: 446 },
        { key: "Dec 09, 2023", value: 2203 },
        { key: "Dec 10, 2023", value: 1909 },
        { key: "Dec 11, 2023", value: 584 },
        { key: "Dec 12, 2023", value: 527 },
        { key: "Dec 13, 2023", value: 467 },
        { key: "Dec 14, 2023", value: 436 },
        { key: "Dec 15, 2023", value: 404 },
        { key: "Dec 16, 2023", value: 332 },
        { key: "Dec 17, 2023", value: 500 },
        { key: "Dec 18, 2023", value: 589 },
        { key: "Dec 19, 2023", value: 578 },
        { key: "Dec 20, 2023", value: 563 },
        { key: "Dec 21, 2023", value: 579 },
        { key: "Dec 22, 2023", value: 724 },
        { key: "Dec 23, 2023", value: 466 },
        { key: "Dec 24, 2023", value: 356 },
        { key: "Dec 25, 2023", value: 300 },
        { key: "Dec 26, 2023", value: 398 },
        { key: "Dec 27, 2023", value: 419 },
        { key: "Dec 28, 2023", value: 527 },
        { key: "Dec 29, 2023", value: 443 },
        { key: "Dec 30, 2023", value: 424 },
        { key: "Dec 31, 2023", value: 327 },
        { key: "Jan 01, 2024", value: 309 },
        { key: "Jan 02, 2024", value: 446 },
        { key: "Jan 03, 2024", value: 296 },
        { key: "Jan 04, 2024", value: 230 },
        { key: "Jan 05, 2024", value: 528 },
        { key: "Jan 06, 2024", value: 544 },
        { key: "Jan 07, 2024", value: 524 },
        { key: "Jan 08, 2024", value: 256 },
        { key: "Jan 09, 2024", value: 211 },
        { key: "Jan 10, 2024", value: 190 },
        { key: "Jan 11, 2024", value: 163 },
        { key: "Jan 12, 2024", value: 183 },
        { key: "Jan 13, 2024", value: 172 },
        { key: "Jan 14, 2024", value: 312 },
        { key: "Jan 15, 2024", value: 141 },
        { key: "Jan 16, 2024", value: 59 },
        { key: "Jan 17, 2024", value: 101 },
        { key: "Jan 18, 2024", value: 135 },
        { key: "Jan 19, 2024", value: 86 },
        { key: "Jan 20, 2024", value: 90 },
        { key: "Jan 21, 2024", value: 102 },
        { key: "Jan 22, 2024", value: 74 },
        { key: "Jan 23, 2024", value: 56 },
        { key: "Jan 24, 2024", value: 75 },
        { key: "Jan 25, 2024", value: 74 },
        { key: "Jan 26, 2024", value: 74 },
        { key: "Jan 27, 2024", value: 93 },
        { key: "Jan 28, 2024", value: 77 },
        { key: "Jan 29, 2024", value: 73 },
        { key: "Jan 30, 2024", value: 77 },
        { key: "Jan 31, 2024", value: 111 },
        { key: "Feb 01, 2024", value: 75 },
        { key: "Feb 02, 2024", value: 70 },
        { key: "Feb 03, 2024", value: 90 },
        { key: "Feb 04, 2024", value: 78 },
        { key: "Feb 05, 2024", value: 89 },
        { key: "Feb 06, 2024", value: 109 },
        { key: "Feb 07, 2024", value: 81 },
        { key: "Feb 08, 2024", value: 77 },
        { key: "Feb 09, 2024", value: 76 },
      ],
    },
  ];

  const simpleBarChartData = [
    {
      name: "BCFM 2019",
      data: [
        {
          key: "Womens Leggings",
          value: 3,
        },
        {
          key: "Mens Bottoms",
          value: 0,
        },
        {
          key: "Mens Shorts",
          value: 4,
        },
        {
          key: "Socks",
          value: 8,
        },
        {
          key: "Hats",
          value: 48,
        },
        {
          key: "Ties",
          value: 1,
        },
      ],
      metadata: {
        trends: {
          0: {
            value: "10%",
          },
        },
      },
    },
  ];

  return (
    <Page>
      <style jsx>{`
        @media (min-width: 30.625em) {
          .Polaris-Page {
            padding: 0 var(--p-space-600);
          }
        }
      `}</style>
      <PolarisVizProvider
        themes={{
          Default: {
            arc: {
              cornerRadius: 5,
              thickness: 18,
            },
          },
        }}
      >
        <Layout>
          <Layout.Section>
            <BlockStack gap="400">
              <Text variant="headingXl" as="h4" padding="50">
                Conversion Funnel
              </Text>
              <DateRangePicker onChange={handleFunnelDateChange} />
              <Card>
                <ClientOnly fallback={<Fallback />}>
                  {() => (
                    <Card sectioned>
                      <FunnelChart
                        sectioned
                        title={"FunnelChart"}
                        theme="Light"
                        data={funnelData}
                      />
                    </Card>
                  )}
                </ClientOnly>
              </Card>
            </BlockStack>
          </Layout.Section>
          <Layout.Section>
            <BlockStack gap="400">
              <Text variant="headingXl" as="h4" padding="50">
                Events Over Time
              </Text>
              <DateRangePicker onChange={handleDateChange} />
              <Card>
                <ClientOnly fallback={<Fallback />}>
                  {() => (
                    <Card sectioned>
                      <LineChart
                        sectioned
                        annotations={LineChartAnnotations}
                        title={"LineChart"}
                        theme="Light"
                        data={LineChartData}
                      />
                    </Card>
                  )}
                </ClientOnly>
              </Card>
            </BlockStack>
          </Layout.Section>
          <Layout.Section>
            <BlockStack gap="400">
              <Text variant="headingXl" as="h4" padding="50">
                Events By Browsers
              </Text>
              <DateRangePicker />
              <Card>
                <ClientOnly fallback={<Fallback />}>
                  {() => (
                    <Card sectioned>
                      <BarChart
                        sectioned
                        title={"BarChart"}
                        theme="Light"
                        data={LineChartData}
                      />
                    </Card>
                  )}
                </ClientOnly>
              </Card>
            </BlockStack>
          </Layout.Section>
          <Layout.Section>
            <BlockStack gap="400">
              <Text variant="headingXl" as="h4" padding="50">
                Events Over Time per OS
              </Text>
              <DateRangePicker />
              <Card>
                <ClientOnly fallback={<Fallback />}>
                  {() => (
                    <Card sectioned>
                      <LineChart
                        sectioned
                        title={"LineChart"}
                        theme="Light"
                        data={eventsOsData}
                      />
                    </Card>
                  )}
                </ClientOnly>
              </Card>
            </BlockStack>
          </Layout.Section>
          <Layout.Section>
            <BlockStack gap="400">
              <Text variant="headingXl" as="h4" padding="50">
                Organic vs Marketing Campaign Traffic
              </Text>
              <DateRangePicker />
              <Card>
                <ClientOnly fallback={<Fallback />}>
                  {() => (
                    <Card sectioned>
                      <LineChart
                        sectioned
                        annotations={LineChartAnnotations}
                        title={"LineChart"}
                        theme="Light"
                        data={eventsData}
                      />
                    </Card>
                  )}
                </ClientOnly>
              </Card>
            </BlockStack>
          </Layout.Section>
          <Layout.Section>
            <BlockStack gap="400">
              <Text variant="headingXl" as="h4" padding="50">
                Simple Bar Chart
              </Text>
              <DateRangePicker />
              <Card>
                <ClientOnly fallback={<Fallback />}>
                  {() => (
                    <Card sectioned>
                      <SimpleBarChart
                        sectioned
                        title={"SimpleBarChart"}
                        theme="Light"
                        data={simpleBarChartData}
                      />
                    </Card>
                  )}
                </ClientOnly>
              </Card>
            </BlockStack>
          </Layout.Section>
          <Layout.Section>
            <BlockStack gap="400">
              <Text variant="headingXl" as="h4" padding="50">
                New Visitors Over Time
              </Text>
              <DateRangePicker onChange={handleDateChange} />
              <Card>
                <ClientOnly fallback={<Fallback />}>
                  {() => (
                    <Card sectioned>
                      <LineChart
                        sectioned
                        annotations={LineChartAnnotations}
                        title={"LineChart"}
                        theme="Light"
                        data={newVisitorsData}
                      />
                    </Card>
                  )}
                </ClientOnly>
              </Card>
            </BlockStack>
          </Layout.Section>
          <Layout.Section>
            <BlockStack gap="400">
              <Text variant="headingXl" as="h4" padding="50">
                Visitors by Operating System
              </Text>
              <DateListPicker
                options={options}
                onChange={handleSelect}
                value={selected}
              />
              <Card padding="400">
                <BlockStack gap="400">
                  <Select
                    className="select-month"
                    label="Month"
                    options={options}
                    onChange={handleSelect}
                    value={selected}
                  />
                  <ClientOnly fallback={<Fallback />}>
                    {() => {
                      return (
                        <Card sectioned title={"DonutChart"}>
                          <div className="donut-chart-container">
                            {data && data.length > 0 && (
                              <DonutChart
                                theme="Light"
                                data={data}
                                legendPosition="bottom"
                                // showLegendValues={true}
                                legendFullWidth={true}
                                // state={loading ? "loading" : "success"}
                              />
                            )}
                          </div>
                        </Card>
                      );
                    }}
                  </ClientOnly>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
          <Layout.Section>
            <BlockStack gap="400">
              <Text variant="headingXl" as="h4" padding="50">
                Visitors by Operating System
              </Text>
              <DateRangePicker />
              <Card padding="400">
                <BlockStack gap="400">
                  <Select
                    className="select-month"
                    label="Month"
                    options={options}
                    onChange={handleSelect}
                    value={selected}
                  />
                  <ClientOnly fallback={<Fallback />}>
                    {() => {
                      return (
                        <Card sectioned title={"DonutChart"}>
                          <div
                            style={{
                              height: 400,
                              // width: 550,
                            }}
                          >
                            <DonutChart
                              comparisonMetric={{
                                accessibilityLabel: "trending up 6%",
                                metric: "6%",
                                trend: "positive",
                              }}
                              data={data}
                              theme="Light"
                              legendPosition="bottom"
                              legendFullWidth={true}
                            />
                          </div>
                        </Card>
                      );
                    }}
                  </ClientOnly>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </PolarisVizProvider>
    </Page>
  );
}
