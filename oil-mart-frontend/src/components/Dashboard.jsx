import React from "react";
import { Link } from "react-router-dom";
import DashboardStatGrid from "./DashboardStatGrid";
import ChartSales from "./ChartSales";
import PieChartSupplier from "./PieChartSupplier";
import RecentOrders from "./RecentOrders";
import PopularProducts from "./PopularProducts";

export default function Dashboard() {
  return (
    <div className="flex gap-4 flex-col">
      <DashboardStatGrid />
      <div className="flex flex-row gap-4 w-full">
        <ChartSales></ChartSales>
        <PieChartSupplier />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <RecentOrders/>
        <PopularProducts/>
      </div>
    </div>
  );
}
