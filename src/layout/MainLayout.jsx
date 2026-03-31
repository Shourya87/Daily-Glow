import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        {" "}
        {/* navbar height adjust */}
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
