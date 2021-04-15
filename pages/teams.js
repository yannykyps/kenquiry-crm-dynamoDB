import {
    Layout,
    SEO,
    Title,
    Teams
  } from "../components";

export default function TeamsPage () {
    return (
        <Layout>
        <SEO title="teams" />
        <Title title="teams" subTitle="Teams page would be used to manage the workload of the team" />
         <Teams />   
        </Layout>
    )
}

