import { Legend } from "@headlessui/react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import PieChartSupplier from "./PieChartSupplier";

function ChartSales() {
  const data = [
    {
      name: "Jan",
      Expense: 4000,
      Income: 2400,
    },
    {
      name: "Feb",
      Expense: 3000,
      Income: 1398,
    },
    {
      name: "Mar",
      Expense: 2000,
      Income: 9800,
    },
    {
      name: "Apr",
      Expense: 2780,
      Income: 3908,
    },
    {
      name: "May",
      Expense: 1890,
      Income: 4800,
    },
    {
      name: "Jun",
      Expense: 2390,
      Income: 3800,
    },
    {
      name: "July",
      Expense: 3490,
      Income: 4300,
    },
    {
      name: "Aug",
      Expense: 2000,
      Income: 9800,
    },
    {
      name: "Sep",
      Expense: 2780,
      Income: 3908,
    },
    {
      name: "Oct",
      Expense: 1890,
      Income: 4800,
    },
    {
      name: "Nov",
      Expense: 2390,
      Income: 3800,
    },
    {
      name: "Dec",
      Expense: 3490,
      Income: 4300,
    },
  ];
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border-gray-200 flex flex-col flex-1 ">
      <strong className="text-gray-700 font-medium ">Transcations</strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width={"100%"} height={'100%'}>
          <BarChart 
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Expense" fill="#8884d8" />
            <Bar dataKey="Income" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
     
    </div>
  );
}

export default ChartSales;
