import Layout from '../components/layout'
import SEO from '../components/SEO'
import Title from '../components/title'
import Teams from '../components/teams'

export default function TeamsPage () {
    return (
        <Layout>
        <SEO title="teams" />
        <Title title="teams" />
         <Teams />   
        </Layout>
    )
}

