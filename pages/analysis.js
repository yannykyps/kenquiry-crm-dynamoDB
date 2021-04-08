import Chart from "../components/charts/chart";
import ChartVis from "../components/charts/chartVis";
import BarChart from "../components/charts/barChart";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";

export default function AnalysisPage() {

    return (
        <Layout>
            <SEO title="Analysis" />
            <Title title="Analysis" />
           
            <BarChart />
            
        </Layout>
    )
}