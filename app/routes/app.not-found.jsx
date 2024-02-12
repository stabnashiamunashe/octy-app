import { Page, Layout, EmptyState } from "@shopify/polaris";

export default function NotFound() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <EmptyState
            heading="Page Not Found"
            image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
          >
            <p>The page you're looking for could not be found.</p>
          </EmptyState>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
