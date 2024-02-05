import React, { useEffect, useState } from "react";
import { Page, Card, Select, Layout, Text } from "@shopify/polaris";
import { ClientOnly } from "remix-utils/client-only";
import styles from "@shopify/polaris-viz/build/esm/styles.css";
import { PolarisVizProvider, DonutChart, BarChart } from "@shopify/polaris-viz";

export const links = () => [{ rel: "stylesheet", href: styles }];

function Fallback() {
  return <div>Generating Chart</div>;
}

export default function ChartsViz() {
  const [selected, setSelected] = useState("");
  const [data, setData] = useState(() => []);
  const [options, setOptions] = useState();

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
    const url = `https://driving-api.azurewebsites.net/os_visitors?target_month=${selected}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log(`responseData: ${JSON.stringify(responseData)}`);
    console.log(`responseData.data: ${JSON.stringify(responseData.data)}`);
    console.log(`type of data : ${typeof responseData.data}`);
    console.log(
      `responseData.options: ${JSON.stringify(responseData.options)}`
    );
    console.log(`type of options : ${typeof responseData.options}`);

    setData(responseData.data);
    setOptions(responseData.options);
  }

  async function handleSelect(selectedValue) {
    setSelected(selectedValue);
    loadData(selectedValue);
  }

  console.log(
    ` ******************data: ${data} , options: ${options} ******************** ,type of Data: ${typeof data} , type of options ${typeof options}`
  );
  const testdata = [
    { key: "A", value: 1 },
    { key: "B", value: 2 },
    { key: "C", value: 3 },
    { key: "D", value: 4 },
    { key: "E", value: 5 },
  ];

  return (
    <Page title="Data Charts">
      <PolarisVizProvider>
        <Layout>
          <Layout.Section>
            <Card>
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
                      <Text variant="headingXl" as="h4">
                        Visitors by Operating System
                      </Text>
                      <div
                        style={{
                          height: 400,
                          width: 600,
                        }}
                      >
                        {data && data.length > 0 && (
                          <DonutChart
                            theme="Light"
                            legendFullWidth
                            data={data}
                            legendPosition="left"
                          />
                        )}
                      </div>
                    </Card>
                  );
                }}
              </ClientOnly>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card>
              <ClientOnly fallback={<Fallback />}>
                {() => (
                  <Card sectioned>
                    <BarChart
                      sectioned
                      title={"BarChart"}
                      theme="Light"
                      data={[
                        {
                          data: testdata,
                          name: "Test",
                        },
                      ]}
                    />
                  </Card>
                )}
              </ClientOnly>
            </Card>
          </Layout.Section>
        </Layout>
      </PolarisVizProvider>
    </Page>
  );
}
