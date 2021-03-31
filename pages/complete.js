import Complete from "../components/complete";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";
import useSWR from "swr";
import {useRouter} from "next/router";
import Splashscreen from "../components/splashscreen";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CompletePage() {
  const router = useRouter();
  const {id, dueBy} = router.query;
  const {data, error} = useSWR(`/api/report?id=${id}&dueBy=${dueBy}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <Splashscreen />;

  return (
    <Layout>
      <SEO title="Completed Request" />
      <Title title={`Completed Request - ${id}`} />
      <Complete
        address={data.address}
        allocated={data.allocated}
        department={data.department}
        dueBy={data.dueBy}
        email={data.email}
        entryDate={data.entryDate}
        fullName={data.fullName}
        job={data.job}
        jobType={data.jobType}
        priority={data.priority}
        response={data.response}
        status={data.status}
        team={data.team}
        telephone={data.telephone}
        comments={data.updates.comments}
        updatedBy={data.updates.updatedBy}
        updatedDate={data.updates.updatedDate}
      />
    </Layout>
  );
}
