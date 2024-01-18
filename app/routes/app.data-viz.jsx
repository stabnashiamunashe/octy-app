import React from "react";
import { Page, Card } from "@shopify/polaris";
import { ClientOnly } from 'remix-utils/client-only';

import {
  PolarisVizProvider,
  LineChart,
  StackedAreaChart,
  BarChart,
  FunnelChart,
  SimpleBarChart
} from "@shopify/polaris-viz";

const data = [
  { key: "A", value: 1 },
  { key: "B", value: 2 },
  { key: "C", value: 3 },
  { key: "D", value: 4 },
  { key: "E", value: 5 }
];

const Charts = [
  LineChart,
  StackedAreaChart,
  BarChart,
  FunnelChart,
  SimpleBarChart
];

function Fallback() {
  return <div>Generating Chart</div>;
}

export default function ChartsViz() {
  return (
    <ClientOnly fallback={<Fallback />}>
    {() => <Page>
     <PolarisVizProvider>
      {Charts.map((Chart, index) => (
        <Card key={index} sectioned title={Chart.name}>
          <Chart
            theme='Light'
            data={[
              {
                data,
                name: "Test"
              }
            ]}
          />
        </Card>
      ))}
    </PolarisVizProvider>
    </Page>}
    </ClientOnly>
  );
}

