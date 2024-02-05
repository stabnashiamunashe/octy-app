import React from "react";
import {
  PolarisVizProvider,
  LineChart,
  StackedAreaChart,
  BarChart,
  FunnelChart,
  SimpleBarChart,
  DonutChart,
} from "@shopify/polaris-viz";

import { Page, Card } from "@shopify/polaris";
import { ClientOnly } from "remix-utils/client-only";
import styles from "@shopify/polaris-viz/build/esm/styles.css";
import { json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";

export const links = () => [{ rel: "stylesheet", href: styles }];

const data = [
  { key: "A", value: 1 },
  { key: "B", value: 2 },
  { key: "C", value: 3 },
  { key: "D", value: 4 },
  { key: "E", value: 5 },
];

export async function loader() {
  // fetch data from an API endpoint using fetch()

  try {
    const response = await fetch(
      "https://three-radios-chew.loca.lt/test/endpoint"
    );
    const data = await response.json();

    // You can perform any additional processing here before returning the data
    return json(data);
  } catch (error) {
    console.error("Error fetching data:", error);

    // If an error occurs, you can return an error response or an empty object
    return json({});
  }
}

const Charts = [
  LineChart,
  StackedAreaChart,
  BarChart,
  FunnelChart,
  SimpleBarChart,
];

const data2 = [
  { name: "Chrome OS", data: [{ key: "January 2024", value: 4 }] } ,
  { name: "Linux", data: [{ key: "January 2024", value: 81 }] },
  { name: "Ubuntu", data: [{ key: "January 2024", value: 5 }] },
  { name: "Mac OS X", data: [{ key: "January 2024", value: 82 }] },
  { name: "Windows", data: [{ key: "January 2024", value: 1044 }] },
  { name: "iOS", data: [{ key: "January 2024", value: 872 }] },
  {
    name: "Other",
    data: [{ key: "January 2024", value: 121 }],
  },
  { name: "Android", data: [{ key: "January 2024", value: 6345 }] },
  { name: "webOS", data: [{ key: "January 2024", value: 1 }] },
  { name: "Kubuntu", data: [{ key: "January 2024", value: 1 }] },
  { name: "BSD", data: [{ key: "January 2024", value: 1 }] },
];

const data3 = [
  {"name": "Linux", "data": [{"key": "January 2024", "value": 81}]}, 
  {"name": "Windows", "data": [{"key": "January 2024", "value": 1058}]}, 
  {"name": "Mac OS X", "data": [{"key": "January 2024", "value": 82}]}, 
  {"name": "Ubuntu", "data": [{"key": "January 2024", "value": 5}]}, 
  {"name": "Chrome OS", "data": [{"key": "January 2024", "value": 4}]}, 
  {"name": "Other", "data": [{"key": "January 2024", "value": 30}]}, 
  {"name": "Android", "data": [{"key": "January 2024", "value": 6364}]}, 
  {"name": "iOS", "data": [{"key": "January 2024", "value": 872}]}, 
  {"name": "webOS", "data": [{"key": "January 2024", "value": 1}]}, 
  {"name": "Kubuntu", "data": [{"key": "January 2024", "value": 1}]}, 
  {"name": "BSD", "data": [{"key": "January 2024", "value": 1}]}
];

function Fallback() {
  return <div>Generating Chart</div>;
}

export default function ChartsViz() {
  return (
    <ClientOnly fallback={<Fallback />}>
      {() => (
        <Page>
          <PolarisVizProvider>
            {Charts.map((Chart, index) => (
              <Card key={index} sectioned title={Chart.name}>
                <Chart
                  theme="Print"
                  data={[
                    {
                      data2,
                      name: "Test",
                    },
                  ]}
                />
              </Card>
            ))}
            <Card sectioned title="Donut Chart">
              <div
                style={{
                  height: 400,
                  width: 550,
                }}
              >
                <DonutChart
                  theme="Light"
                  dimensions="value"
                  data={data2}
                  legendPosition="right"
                  legendFullWidth={true}
                />
              </div>
            </Card>
          </PolarisVizProvider>
        </Page>
      )}
    </ClientOnly>
  );
}
