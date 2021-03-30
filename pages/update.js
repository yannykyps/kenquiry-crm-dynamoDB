import React from "react";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";
import Update from "../components/update";
import {useRouter} from "next/router";

export default function UpdatePage() {
  const router = useRouter();
  const {id} = router.query;

  return (
    <Layout>
      <SEO title="Update Request" />
      <Title title={`Update Request - ${id}`} />
      <Update />
    </Layout>
  );
}