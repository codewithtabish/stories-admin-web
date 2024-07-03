"use client";
import DashboardHomeDesign from "@/components/custom/dashcompoent/DashboardHomeDesign";
import withAdminProtection from "@/components/withAdminProtection";
import React from "react";
import DashboardStories from "./page";

const DashboardStroiesComp: React.FC = () => {
  return (
    <div>
      <DashboardStories />
    </div>
  );
};

export default withAdminProtection(DashboardStroiesComp);
