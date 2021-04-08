import Chart from "../components/charts/chart";
import ChartVis from "../components/charts/chartVis";
import BarChart from "../components/charts/barChart";
import Layout from "../components/layout";
import SEO from "../components/SEO";
import Title from "../components/title";
import PieChart from "../components/charts/pieChart";

export default function AnalysisPage() {

    return (
        <Layout>
            <SEO title="Analysis" />
            <Title title="Analysis" subTitle="Analyse all requests visually with interactive charts and graphs. When there is more data to analyse, you can create different types of visuals." />
           
           <div className="grid grid-cols-1 md:grid-cols-2 md:justify-items-center my-8 gap-y-8">
           <BarChart />
            <PieChart />
            </div>
          
            
            
        </Layout>
    )
}