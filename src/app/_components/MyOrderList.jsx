import Image from 'next/image'
import React from 'react'

function MyOrderList(order) {
  return (
    <div>
        <Image src={ process.env.NEXT_PUBLIC_BACKEDN_BASE_URL + order.image} width={80} height={80} alt='image' unoptimized={true} />
        <h2>{order.product_name}</h2>
    </div>
  )
}

export default MyOrderList