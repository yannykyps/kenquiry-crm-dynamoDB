import Layout from '../components/layout'
import SEO from '../components/SEO'
import Title from '../components/title'
import Teams from '../components/teams'

export default function TeamsPage () {
    return (
        <Layout>
        <SEO title="teams" />
        <Title title="teams" subTitle="Teams page would be used to manage the workload of the team" />
         <Teams />   
        </Layout>
    )
}

