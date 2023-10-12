import React from 'react'
import QRCode from "react-qr-code";
import Barcode from 'react-barcode';

function Print({paymentDetails,ref}) {
   
  return (
    <div className='h-screen flex justify-center items-center  '>
        <div>


    <div className='flex w-fit justify-center items-center border-dashed border-t-0 pt-0 border-black border-4 p-4'>
        <div className=''>

            <div className=' bg-gray-700 text-gray-900 font-black text-xl'>
                PREPAID - DO NOT COLLECT CASH
            </div>

            <div className='flex'>

                <div className='border-r-4 border-black'>
                
                    <div className='p-2 border-black border-b-4  h-3/5'>
                        <span>DELEVERY ADDRESS :</span>{paymentDetails?.['Booking']?.to_address}
                    </div>
                    <div className=''>
                        surface
                    </div>
                </div>
                <div className='p-2'>

                <QRCode  value={paymentDetails?.['order']?.order_id} />
                </div>
        
            </div>
            <div className='bg-gray-400  text-black'>
                <div className=' flex justify-between'>
                    <p>
                        <span className='font-extrabold'>courier name:</span> Runway logistics
                    </p>
                    <p>
                        <span className='font-extrabold'>HBD:</span>09-09
                    </p>
                </div>
                <div className='flex justify-between'>
                    <p>
                        <span  className='font-extrabold'>courier code :</span>{paymentDetails?.['order']?.order_id}
                    </p>
                    <p>
                        <span className='font-extrabold'>CPD:</span>21-09
                    </p>

                </div>
            </div>
            <div className=' h-16'>
            <p>
                <span className='font-bold'>Sold By</span>
                {paymentDetails?.['Booking']?.to_address}
            </p>
            </div>

            {/* <div className='bg-purple-600'>
                hi
            </div> */}
            <table className=' border-2 w-full'>
                <tr className='border-2'>
                    <th className='border-2'>
                        Product
                    </th>
                    <th>
                        Qty
                    </th>
                </tr>
                <tr className='border-2'>
                    <td className='border-2' >
                        {paymentDetails?.["Booking"]?.product_name}
                    </td>
                    <td >
                        1
                    </td>
                </tr>
                <tr >
                    <td className='border-2'>
                        total
                    </td>
                    <td>
                        450
                    </td>
                </tr>
              
            </table>
            <div className='border-b-2 border-black'>
                <div className='flex justify-between'>
                    <p className='bg-black text-white w-fit font-bold'>Handover to Runway logistics</p>
                    <p className=' text-black text-xl font-bold'>REG</p>
                </div>
                <p className='text-black'><span className='font-black'>Tracking ID</span>{paymentDetails?.['order']?.order_id}</p>
                <Barcode height={25} displayValue={false} value={paymentDetails?.['order']?.order_id} />
            
            </div>
                <div className='flex justify-between mt-4 border-b-2 border-black '>
                    <p className='text-xl'>**NO PLACTIC PACKING</p>
                    <div>

                    <p className='text-sm'>Ordered Through</p>
                    <p className='float-right'>Runway</p>
                    </div>
            </div> 
        </div >
        <div className='rotate-90 mb-[38rem] w-1 ml-4 '>

        <Barcode height={25} width={1.34} margin={0} displayValue={false} value={paymentDetails?.['order']?.order_id} />
        </div>
    
    </div>
    <div className='flex  justify-between'>
    <div className=''>
        <p><span className='font-black'>Order Id:</span> {paymentDetails?.['order']?.order_id}</p>
        <p><span className='font-black'>Order Date:bhjsdbcbdjbjdb</span></p>
    </div>
    <div className='border-r-2 border-gray-900'>

    </div>
    <div>
        <p><span className='font-black'>Invoice No:</span>kjsdnvkjndvndn</p>
        <p><span className='font-black'>Invoice Date:</span>klmwdvdm</p>
    </div>
    </div>
        </div>
    </div>
  )
}

export default Print
