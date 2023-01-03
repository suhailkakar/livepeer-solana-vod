import React from "react";
import { Sidebar } from "../../components";
import Pricing from "../../components/Pricing";
import ProfileComponent from "../../components/Profile";
export default function Profile() {
  return (
    <div className="w-screen flex flex-row">
      <Sidebar />
      <ProfileComponent />
    </div>
  );
}
