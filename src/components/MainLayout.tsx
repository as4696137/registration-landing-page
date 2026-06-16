import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { PageTransitionProvider } from "./PageTransition";

const MainLayout = () => {
  return (
    <PageTransitionProvider>
      <Navbar />
      <Outlet />
      <Footer />
    </PageTransitionProvider>
  );
};

export default MainLayout;
