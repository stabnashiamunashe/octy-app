import React, { useEffect, useState } from "react";
import { Page, Card, Select, Layout, Text } from "@shopify/polaris";
import { ClientOnly } from "remix-utils/client-only";
import styles from "@shopify/polaris-viz/build/esm/styles.css";
import { PolarisVizProvider, DonutChart, BarChart } from "@shopify/polaris-viz";
// import { json } from "@remix-run/node";
// import { useLoaderData, useFetcher } from "@remix-run/react";

export const links = () => [{ rel: "stylesheet", href: styles }];

// export async function loader({ request }) {
//   const url = new URL(request.url);
//   const selected = url.searchParams.get("selected") || "January%202024";

//   try {
//     console.log(`<<<<<<<<<<<<<<<<<<<SELECTED>>>>>>>>>>>>>>>>>>>, ${selected}`);

//     const url = `https://driving-api.azurewebsites.net/os_visitors?target_month=${selected}`;

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const data = await response.json();

//     console.log("###########################################data", data);

//     return json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);

//     return json({});
//   }
// }

function Fallback() {
  return <div>Generating Chart</div>;
}

export default function ChartsViz() {
  const [selected, setSelected] = useState("January%202024");
  const [data, setData] = useState(() => []);

  useEffect(() => {
    loadData(selected);
  }, []);

  async function loadData(selected) {
    const url = `https://driving-api.azurewebsites.net/os_visitors?target_month=${selected}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setData(data);
  }

  // const fetcher = useFetcher();

  async function handleSelect(selectedValue) {
    // console.log(`selected: ${selectedValue}`);
    // fetcher.submit({ selected: selectedValue }, { method: "get" });
    setSelected(selectedValue);

    loadData(selectedValue);
  }

  const options = [
    { label: "This Month", value: "January%202024" },
    { label: "Last Month", value: "December%202023" },
    { label: "November 2023", value: "November%202023" },
  ];

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
                        <DonutChart
                          theme="Light"
                          legendFullWidth
                          data={data && data.length > 0 ? JSON.parse(data) : []}
                          legendPosition="left"
                        />
                        {/* {fetcher.data && fetcher.data.length > 0 ? (
                          <DonutChart
                            theme="Light"
                            legendFullWidth
                            data={JSON.parse(fetcher.data)}
                            legendPosition="left"
                          />
                        ) : (
                          <DonutChart
                            theme="Light"
                            legendFullWidth
                            data={JSON.parse(useLoaderData())}
                            legendPosition="left"
                          />
                        )} */}
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
