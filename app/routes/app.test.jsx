import { useLoaderData, Form } from "@remix-run/react";
import { Layout } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import React from "react";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
    mutation {
      productUpdate(input: {id: "gid://shopify/Product/14894849294705", title: "Sweet new product - GraphQL Edition"}) {
        product {
          id
        }
      }
    }`,
  );
  
  const data = await response.json();

  return Response.json(data);
}


export async function action({ request }) {
  const formData = await request.formData();

  console.log("Updated display name:", formData);
  console.log("Updated email:", formData);

  return Response.json({
   ok:true
  });
}

const Test = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <div>This is a test page</div>

      <Layout>
        <ui-title-bar title="Products">
          <button onclick="console.log('Secondary action')">
            Secondary action
          </button>
          <button variant="primary" onclick="console.log('Primary action')">
            Primary action
          </button>
        </ui-title-bar>

        <Form method="post">
          <h1>Settings</h1>

          <input name="displayName" />
          <input name="email"  />

          <button type="submit">Save</button>
        </Form>
      </Layout>
    </div>
  );
};

export default Test;
