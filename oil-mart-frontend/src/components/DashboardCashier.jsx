import React from "react";
import { Link } from "react-router-dom";
// import DashboardStatGrid from "./DashboardStatGrid";
// import ChartSales from "./ChartSales";
import PieChartSupplier from "./PieChartSupplier";
import RecentOrders from "./RecentOrders";
import PopularProducts from "./PopularProducts";
// import CashierTable from "./Tables/CashierTable";
import BarcodeScanner from "./BarcodeScanner";
import Notifications from "./Notifications";

export default function DashboardCashier({userName}) {
    
  return (
    <div className="flex gap-2 flex-col">
      {/* <DashboardStatGrid /> */}
      <BarcodeScanner userName = {userName} />
    </div>
  );
}
