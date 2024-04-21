import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import AllProducts from '@/app/_components/AllProducts';

async function ProductCategory({params}) {
    const decodedCategoryName = decodeURIComponent(params.categoryName);
    const getAllProducts=await GlobalApi.getProductsByCategory(params.categoryName);
    const getCategoryList=await GlobalApi.getCategoryList();
  return (
    <div> 
        <h2 className='bg-primary p-4 text-white font-bold text-3xl text-center'>{decodedCategoryName}</h2>
        <TopCategoryList getCategoryList={getCategoryList}
            selectedCategory={decodedCategoryName}
        />
        <div className="p-5 md:p-10">
            <AllProducts getAllProducts={getAllProducts}/>
        </div>
    </div>
  )
}

export default ProductCategory