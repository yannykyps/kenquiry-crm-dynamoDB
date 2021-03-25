import Layout from "../components/layout";
import SEO from "../components/SEO";
import Allocated from "../components/allocated";
import Title from "../components/title";
import {useRouter} from "next/router";

export default function AllocatedPage() {
    const router = useRouter();
  const {name} = router.query;
  return (
    <Layout>
      <SEO title="Allocated" />
      <Title title={`Allocated ${name}`} />
      <Allocated />
    </Layout>
  );
}
