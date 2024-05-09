import React from "react";
import { IoBagHandle } from "react-icons/io5";

function DashboardStatGrid() {
  return (
    <div className="flex gap-4 w-full">
        {/* Total Sales */}
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Sells</span>
          <div className="flex justify-between items-center ">
            <strong className="text-xl text-gray-700 font-semibold">
              Rs.35000
            </strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>

      {/* Best Selling Product */}
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Best Selling</span>
          <div className="flex justify-between items-center ">
            <strong className="text-xl text-gray-700 font-semibold">
              Toyota 
            </strong>
            <span className="text-sm text-green-500 pl-2">10W 30</span>
          </div>
        </div>
      </BoxWrapper>

      {/* Out of Stock */}
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Out of Stock</span>
          <div className="flex justify-between items-center ">
            <strong className="text-xl text-gray-700 font-semibold">
              Mobil
            </strong>
            <span className="text-sm text-green-500 pl-2">0W 20</span>
          </div>
        </div>
      </BoxWrapper>
      {/* Quick Look */}
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Today's Profit</span>
          <div className="flex justify-between items-center ">
            <strong className="text-xl text-gray-700 font-semibold">
              15000
            </strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}
export default DashboardStatGrid;

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 borgra-200 flex items-center">
      {children}
    </div>
  );
}
