import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { employeTable, paymentTable } from '../components/TableHeading'
import { useEffect } from 'react'

export default function ViewHeader() {
  return (

  


    <div>
        <div className='flex justify-between items-center p-1'>
            
            <button  className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
            type="button"> cancel
            </button>

            <button  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
            > print
            </button>

        </div>
    </div>



  )
}
