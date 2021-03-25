import React from 'react'
import Head from 'next/head'

export const siteTitle = 'Kenquiry'

const SEO = ({title, description}) => {
    return (
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <title>{`${title} | ${siteTitle}`}</title>
          <meta
            name="description"
            content={description}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head> 
    )
}

export default SEO
