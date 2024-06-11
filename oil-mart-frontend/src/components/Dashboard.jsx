import React, { useState } from 'react';
import DashboardStatGrid from "./DashboardStatGrid";
import ChartSales from "./ChartSales";
import PieChartSupplier from "./PieChartSupplier";
import RecentOrders from "./RecentOrders";
import PopularProducts from "./PopularProducts";
import InventoryReport from "./Reports/InventoryReport";
import Notifications from "./Notifications";
import ProductsTable from "./Forms/ProductsTable";
import ViewReturnTable from "./Tables/ViewReturnTable";
import SalesReport from "./Reports/SalesReport";

export default function Dashboard() {
 const [reportType, setReportType] = useState('daily');

  const toggleReportType = () => {
    setReportType(prevType => (prevType === 'daily' ? 'weekly' : 'daily'));
  };
  return (
    <div className="flex flex-col gap-4">
      {/* <DashboardStatGrid /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          {/* <ChartSales /> */}
          <ProductsTable />
          <ViewReturnTable />
        </div>

        <div>
          <div className="flex justify-end mb-4">
            <button 
              onClick={toggleReportType}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Switch to {reportType === 'daily' ? 'Weekly' : 'Daily'} Report
            </button>
          </div>
          <div className="bg-white rounded shadow-md p-6">
            <SalesReport reportType={reportType} />
          </div>
        </div>
      </div>
      {/* <Notifications /> */}
      {/* <InventoryReport /> */}
    </div>
  );
}
