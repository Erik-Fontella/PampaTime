import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="pt-20 flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;