import React from 'react'
import Layout from '../components/layout'
import Report from '../components/report'
import SEO from '../components/SEO'
import Title from '../components/title'

export default function ReportsPage () {
    return (
        <Layout>
            <SEO title="Reports" />
            <Title title="Reports" subTitle="Use reports to anaylse SLAs, KPIs and any bespoke anaylsis. Sample below is a report showing completed requests" />
            <Report />
        </Layout>
    )
}

