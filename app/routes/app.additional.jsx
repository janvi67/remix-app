import { Page, Layout,Card } from "@shopify/polaris";
import React from "react";

export default function LayoutExample() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card title="Online store dashboard" sectioned>
            <p>View a summary of your online store’s performance.</p>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
