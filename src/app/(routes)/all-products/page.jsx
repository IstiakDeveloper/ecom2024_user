"use client"
import React, { useState, useEffect } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import ProductItem from '@/app/_components/ProductItem';

function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products when the component mounts
    const fetchProducts = async () => {
      try {
        const allProducts = await GlobalApi.getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
       <h2 className='bg-primary p-4 text-white font-bold text-3xl text-center'>All Products</h2>
        <div className='mt-8 px-12 mt-2 md:px-16'>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map(
            (product, index) => <ProductItem key={index} product={product} />
          )}
        </div>
        </div>
    </div>
  );
}

export default AllProducts;
