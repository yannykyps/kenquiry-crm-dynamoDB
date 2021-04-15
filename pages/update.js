import React from "react";
import {
  Layout,
  SEO,
  Title,
  Update
} from "../components";
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
