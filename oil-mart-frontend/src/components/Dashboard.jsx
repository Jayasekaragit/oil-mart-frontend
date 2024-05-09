import React from "react";
import { Link } from "react-router-dom";
import DashboardStatGrid from "./DashboardStatGrid";
import ChartSales from "./ChartSales";

export default function Dashboard() {
  return (
    <div className="flex gap-4 flex-col">
       <DashboardStatGrid/>
       <ChartSales/>
    </div>
  );
}
