
import React, { useEffect, useState } from 'react';  // Added useState

import { Link } from 'react-router-dom'
import AddUserForm from '../Forms/AddUserForm'
import DashboardStatGrid from '../DashboardStatGrid'
import ChartSales from '../ChartSales'
import PieChartSupplier from '../PieChartSupplier'
import RecentOrders from '../RecentOrders'
import PopularProducts from '../PopularProducts'
import UserTable from '../Tables/UserTable'
import axios from 'axios';

export default function Users() {

  return (
    <>
    <div class="flex flex-row">
  {/* <div class="basis-1/4 bg-slate-400">01</div> */}
  <div class="basis-3/4">
    <UserTable />
  </div>
  <div class="basis-1/4 bg-yellow-200">
    <AddUserForm/>
  </div>
</div>
    </>
  )
}
