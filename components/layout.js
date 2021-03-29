import Footer from "./footer"
import Navbar from "./navbar"
import PropTypes from 'prop-types';

export default function Layout ({children}) {
    return (
        <>
        <Navbar />
        {children}
        <Footer />   
        </>
    )
}

Layout.propTypes = {
  children: PropTypes.array.isRequired
}

