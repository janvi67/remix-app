import { Page, Layout, Card } from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { authenticate } from "../shopify.server";

export async function loader({request}) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
      query CustomCollectionList {
        collections(first: 50, query: "collection_type:custom") {
          nodes {
            id
            handle
            title
            updatedAt
            descriptionHtml
            publishedOnCurrentPublication
            sortOrder
            templateSuffix
          }
        }
      }`,
  );

  const data = await response.json();
  return data;
}

const Collection = () => {
  const getCollections = useLoaderData();
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
            {getCollections.map((collection)=>{

                return (
                    <Card title="Online store dashboard" sectioned key={collection.id}>
            <p>{collection.title}</p>
          </Card>

                )
            })}
          
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Collection;
