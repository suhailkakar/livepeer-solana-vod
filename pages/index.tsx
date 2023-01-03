import React from "react";
import { Home, Sidebar } from "../components";
import Pricing from "../components/Pricing";

export default function Index() {
  return (
    <div className="w-screen flex flex-row">
      <Sidebar />
      <Home />
    </div>
  );
}
