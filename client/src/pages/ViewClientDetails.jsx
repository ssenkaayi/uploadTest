import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { employeTable, paymentTable } from '../components/TableHeading'
import { useEffect } from 'react'
import ClientHeader from '../Model/ViewHeader'
import MakePayments from '../Model/MakePayments'
import PrintView from '../Model/PrintView'



export default function ViewClientDetails() {

    const handlePrint =()=>{
        window.print()
      }
  return (

    <div className='bg-white mt-card p-20 mt-record rounded-2xl'>
        <MakePayments/>
        <ClientHeader/>

        <div className='flex justify-between items-center p-1'>
            
            <button  className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
            type="button"> cancel
            </button>

            <button onClick={handlePrint} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
            > print
            </button>

        </div>
 
        {/* <PrintView/> */}

    
    
    </div>


  )
}
