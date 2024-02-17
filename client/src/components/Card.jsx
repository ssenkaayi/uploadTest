import React from 'react'

function Card() {
  return (
    
    
    <div>

        <div 
            className='bg-card li rounded-xl p-4 
            flex flex-col justify-between h-card-h w-card-w'>

            <div className='flex justify-between items-center mb-4'>

            <div className=''>

                <span >Payment Amount</span>
                <span className='flex flex-col'>$500.00</span>

            </div>

            </div>

            <span>**** **** 3484</span>

        </div>

    </div>
  )
}

export default Card