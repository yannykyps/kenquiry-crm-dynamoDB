import Dashboard from '../components/dashboard'
import Layout from '../components/layout'
import SEO from '../components/SEO'
import Title from '../components/title'

export default function Home() {

  return (
    <Layout>
    <SEO title="Dashboard" description="Kenquiry CRM dashboard"/>
    <Title title="dashboard" subTitle="Dashboard used to monitor all active requests for your team" />
      <Dashboard />
    </Layout>
  )
}
