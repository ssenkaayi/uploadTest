import React from 'react'

function Records() {

  return (

    <div className='bg-white mt-card p-record mt-record rounded-2xl'>

        <h3 className='text-regal-violet p-2'> Records </h3>

        <div className=' w-full '>

            <table className=' w-full border-collapse' >

                <thead 
                className='bg-regal-violet text-white '>

                    <tr className=''>

                        <th className='p-4 text-left '>Date</th>
                        <th className='p-4 text-left '>Transaction Type</th>
                        <th className='p-4 text-left '>Description</th>
                        <th className='p-4 text-left '>Amount</th>
                        <th className='p-4 text-left '>Category</th>
                        <th className='p-4 text-left '>Status</th>
                        <th className='p-4 text-left '>Action</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>

  )
}

export default Records