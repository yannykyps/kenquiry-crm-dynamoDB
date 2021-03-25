import Layout from "../components/layout";
import Request from "../components/request";
import SEO from "../components/SEO";
import Title from "../components/title";

export default function RequestPage() {
  return (
    <Layout>
      <SEO title="New Request" />
      <Title title="New Request" />
      <Request />
    </Layout>
  );
}
