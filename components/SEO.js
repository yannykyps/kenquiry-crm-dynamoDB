import React from 'react'
import Head from 'next/head'
import PropTypes from "prop-types";

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
          <link rel="preload" href="/api/request" as="fetch" crossOrigin="anonymous"></link>
        </Head> 
    )
}



export default SEO

SEO.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string.isRequired
}

