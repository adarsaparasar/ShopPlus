import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import  { Toaster } from 'react-hot-toast';


function Layout({ children, title, description, keywords, author }) {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
      <Toaster />
        {children}
      </main>
      <Footer />
    </>
  );
}

Layout.defaultProps = {
  title: "Ecommerce app - shop now",
  description: "MERN stack project",
  keywords: "MERN, React, Node, MongoDB",
  author: "Adarsa",
};

export default Layout;
