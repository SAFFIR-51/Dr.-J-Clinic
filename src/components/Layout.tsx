import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingMenu from './FloatingMenu';
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <FloatingMenu />
      <main className="pb-[64px] md:pb-0">{children}</main>
      <Footer />
    </>
  );
}
