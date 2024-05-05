import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
        This is th dashboard 
        <Link to="/products" className="underline">
          go to products
        </Link>
    </div>
  );
}
