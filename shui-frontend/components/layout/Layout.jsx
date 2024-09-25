import React from 'react';
import './layout.css';
import Header from '../header/Header';  
import Footer from '../footer/Footer';  

const Layout = ({ children }) => {
    return (
        <>
            <main className='layoutWrapper'>
                <Header />  {/* Header visas på varje sida */}
                <section>
                    { children }  {/* Dynamiskt innehåll för varje sida */}
                </section>
                <Footer />  {/* Footer visas på varje sida */}
            </main>
        </>
    );
};

export default Layout;
