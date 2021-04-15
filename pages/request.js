import {
  Layout,
  SEO,
  Title,
  Request
} from "../components";

export default function RequestPage() {
  return (
    <Layout>
      <SEO title="New Request" />
      <Title title="New Request" />
      <Request />
    </Layout>
  );
}
