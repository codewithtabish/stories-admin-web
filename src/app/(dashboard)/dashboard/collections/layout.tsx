"use client";
import DashboardHomeDesign from "@/components/custom/dashcompoent/DashboardHomeDesign";
import withAdminProtection from "@/components/withAdminProtection";
import React from "react";
import DashBoardCollectionsComponent from "./page";

const DashboardCollectionComp: React.FC = () => {
  return (
    <div>
      <DashBoardCollectionsComponent />
    </div>
  );
};

export default withAdminProtection(DashboardCollectionComp);
