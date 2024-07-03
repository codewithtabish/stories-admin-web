"use client";
import DashboardHomeDesign from "@/components/custom/dashcompoent/DashboardHomeDesign";
import withAdminProtection from "@/components/withAdminProtection";
import React from "react";
import DashBoardUsersCompoent from "./page";

const DashboardUserCompoentComp: React.FC = () => {
  return (
    <div>
      <DashBoardUsersCompoent />
    </div>
  );
};

export default withAdminProtection(DashboardUserCompoentComp);
