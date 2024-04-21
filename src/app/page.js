import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import AllProducts from "./_components/AllProducts";
import Footer from "./_components/Footer";

export default async function Home() {

  const sliderList=await GlobalApi.getSliders();
  const getCategoryList=await GlobalApi.getCategoryList();
  const getAllProducts=await GlobalApi.getAllProducts();

  return (
    // Slider
    <div className="px-12 mt-2 md:px-16">
      <Slider sliderList={sliderList}/>
      {/* CategoryList */}
      <CategoryList getCategoryList={getCategoryList}/>

      {/* All Products */}
      <AllProducts getAllProducts={getAllProducts}/>


      {/* Banner */}
      <Image src='/banner.jpg' width={1000} height={300} alt="Banner" className=" w-full h-[400px] object-contain mt-7"/>

      {/* Footer */}
      <Footer />

    </div>


  );
}
