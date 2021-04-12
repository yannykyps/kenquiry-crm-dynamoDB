import BarChart from "../components/charts/barChart";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";
import PieChart from "../components/charts/pieChart";
import useSWR from "swr";
import Splashscreen from "../components/splashscreen";
import Gauge from "../components/charts/gauge";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AnalysisPage() {
  const {data, error} = useSWR("/api/request", fetcher);

  console.log(data);

  return (
    <Layout>
      <SEO title="Analysis" />
      <Title
        title="Analysis"
        subTitle="Analyse all requests visually with interactive charts and graphs. When there is more data to analyse, you can create different types of visuals."
      />
      {error && <div>Failed to load</div>}
      {!data ? (
        <div>
          <Splashscreen />
        </div>
      ) : (
        <div className="my-8">
          <Gauge
            value={Math.round(
              (data.Items.filter((item) => item.dueBy < Date.now()).length /
                data.Count) *
                100
            )}
            label="% Breached"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 md:justify-items-center my-8 gap-y-8">
            <BarChart data={data} />
            <PieChart data={data} />
          </div>
        </div>
      )}
    </Layout>
  );
}
