import React from "react";
import ProductItem from "./ProductItem";

function AllProducts({ getAllProducts }) {
  return (
    <div className="mt-10">
      <h2 className="text-green-600 font-bold text-2xl">
        Our Popular Products
      </h2>
      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {getAllProducts.map(
          (product, index) => index < 8 && <ProductItem product={product} />
        )}
      </div>
    </div>
  );
}

export default AllProducts;
