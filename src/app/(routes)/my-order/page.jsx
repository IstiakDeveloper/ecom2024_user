"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import moment from 'moment';
import MyOrderList from '@/app/_components/MyOrderList';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';



function MyOrder() {
  const token = sessionStorage.getItem('token');
  const router = useRouter();
  const user = JSON.parse(sessionStorage.getItem("customer"));
  const [orderList, setOrderList] = useState([]);

  useEffect(()=>{
    if(!token){
      router.replace('/');
    }
    getOrderData();
  }, [])

  const getOrderData=async()=>{
    const orderList_ = await GlobalApi.getOrderData(user.id, token);
    console.log(orderList_);
    setOrderList(orderList_)
  }





  return (
    <div>
      <h2 className='bg-primary p-4 text-white font-bold text-3xl text-center'>My Orders</h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className='text-3xl font-bold text-primary'>Order History</h2>
        <div className='w-full custom-clps'>
          {orderList.map((item, index)=>(
          <Collapsible key={index}>
            <CollapsibleTrigger>
              <div className='grid grid:2 md:grid-cols-4 border p-2 bg-slate-100 w-full my-2'>
              <div>
                <h2 className=' md:text-start'>{index + 1}</h2>
              </div>
                <div>
                  <h2 className=' md:text-start'><span className='font-bold mr-2'>Order Date:</span>{moment(item.createdAt).format('DD-MMM-Y')}</h2>
                </div>
                <div>
                  <h2 className=' md:text-start'><span className='font-bold mr-2'>Total Amount:</span> {item.totalAmount}</h2>
                </div>
                <div>
                  <h2 className=' md:text-end'><span className='font-bold mr-2'>Status:</span>Pending</h2>
                </div>
               
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
                {item.orderItemList.map((order, index_)=>(
                  <div className=''>
                  <div className='grid grid-cols-5 my-1 items-center'>
                      <Image src={ process.env.NEXT_PUBLIC_BACKEDN_BASE_URL + order.image} width={80} height={80} alt='image' unoptimized={true} className='bg-gray-100 rounded-md border' />
                      <div className='col-span-2'>
                        <h2>{order.product_name}</h2>
                        <h2>Item Price: {order.amount}</h2>
                      </div>

                        <h2>Quantity: {order.quantity}</h2>
                        <h2>Item Price: {order.amount}</h2>

                  </div>
                  <hr></hr>
                  </div>
                ))}
                
            </CollapsibleContent>
          </Collapsible>
          ))}
        </div>

      </div>
    </div>
  )
}

export default MyOrder