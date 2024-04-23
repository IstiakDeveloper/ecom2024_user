import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryList({ getCategoryList }) {
  return (
    <div className="mt-5">
      <h2 className="text-green-600 font-bold text-2xl">Shop by category</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5">
        {getCategoryList.map((category, index) => (
          <Link key={index}
            href={"/products-category/" + category?.name}
            className="flex flex-col items-center gap-2 bg-green-50 p-3 rounded-lg mt-2 group cursor-pointer hover:bg-green-200"
          >
            <Image
              src={process.env.NEXT_PUBLIC_BACKEDN_BASE_URL + category?.image}
              width={50}
              height={50}
              alt="icon"
              unoptimized={true}
              className="group-hover:scale-125 transition-all ease-in-out"
            />
            <h2 className="text-green-800">{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
