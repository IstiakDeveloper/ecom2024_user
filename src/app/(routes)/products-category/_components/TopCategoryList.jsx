import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function TopCategoryList({ getCategoryList, selectedCategory }) {
  return (
    <div className='flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center'>
      {getCategoryList.map((category, index) => (
        <div key={index}>
          <Link href={'/products-category/' + category?.name} className={`flex flex-col items-center gap-2 bg-green-50 p-3 rounded-lg mt-2 group cursor-pointer hover:bg-green-200 w-[150px] min-w-[100px] ${selectedCategory == category.name && 'bg-green-600'}`}>
            <Image src={process.env.NEXT_PUBLIC_BACKEDN_BASE_URL + category?.image}
              width={50}
              height={50}
              alt='icon'
              unoptimized={true}
              className='group-hover:scale-125 transition-all ease-in-out'
            />
            <h2 className={`text-green-800 ${selectedCategory == category.name && 'text-white'}`}>{category.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default TopCategoryList;
