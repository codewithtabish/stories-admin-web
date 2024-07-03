"use client";
import DashboardHomeDesign from "@/components/custom/dashcompoent/DashboardHomeDesign";
import withAdminProtection from "@/components/withAdminProtection";
import React from "react";
import StoryCreateScreen from "./page";

const DashboardCollectionComp: React.FC = () => {
  return (
    <div>
      <StoryCreateScreen />
    </div>
  );
};

export default withAdminProtection(DashboardCollectionComp);
