import Complete from "../components/complete";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";

export default function CompletePage() {

  return (
    <Layout>
      <SEO title="Update Request" />
      <Title title="Update Request" />
      <Complete />
    </Layout>
  );
}