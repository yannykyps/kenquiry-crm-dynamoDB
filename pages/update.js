import React from "react";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";
import Update from "../components/update";

export default function UpdatePage() {

  return (
    <Layout>
      <SEO title="Update Request" />
      <Title title="Update Request" />
      <Update />
    </Layout>
  );
}