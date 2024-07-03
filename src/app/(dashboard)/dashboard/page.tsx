"use client";
import DashboardHomeDesign from "@/components/custom/dashcompoent/DashboardHomeDesign";
import withAdminProtection from "@/components/withAdminProtection";
import React from "react";

const DashboardHome: React.FC = () => {
  return (
    <div>
      <DashboardHomeDesign />
    </div>
  );
};

export default withAdminProtection(DashboardHome);
