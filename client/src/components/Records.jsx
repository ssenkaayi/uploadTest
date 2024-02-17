import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'

function Records() {

    // const [showAddEmploye,setShowAddEmploye] = useState(false)

    // const handleOnClose = ()=>setShowAddEmploye(false)



  return (

    <div className='bg-white mt-card p-record mt-record rounded-2xl'>

        {/* <AddEmploye onClose={handleOnClose} visible={showAddEmploye}/>    */}

        <div className='flex justify-between'>

         <h3 className='text-regal-violet text-2xl p-2'> Manange Employees </h3>

         <button onClick={()=>setShowAddEmploye(true)} 
          className='flex items-center p-search-box bg-dashbord rounded-xl text-white '>Add Employe</button>

        </div>

       

        <div className=' w-full mt-record'>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                        <th className='p-4 text-left '>Date</th>
                        <th className='p-4 text-left '>Transaction Type</th>
                        <th className='p-4 text-left '>Description</th>
                        <th className='p-4 text-left '>Amount</th>
                        <th className='p-4 text-left '>Category</th>
                        <th className='p-4 text-left '>Status</th>
                        <th className='p-4 text-left '>Action</th>
                    </tr>

                </thead>

                <tbody>
                        <tr>
                            <td className='p-4 text-left'>2023-05-01</td>
                            <td className='p-4 text-left'>kgs</td>
                            <td className='p-4 text-left'>phones</td>
                            <td className='p-4 text-left'>2000000</td>
                            <td className='p-4 text-left'>Maris</td>
                            <td className='p-4 text-left'>paid</td>
                            <td className='text-green  items-center p-4'>Edit</td>
                        </tr>

                        <tr>
                            <td className='p-4 text-left'>2023-05-01</td>
                            <td className='p-4 text-left'>kgs</td>
                            <td className='p-4 text-left'>phones</td>
                            <td className='p-4 text-left'>2000000</td>
                            <td className='p-4 text-left'>Maris</td>
                            <td className='p-4 text-left'>paid</td>
                            <td className='text-green  items-center p-4'>Edit</td>
                        </tr>

                        <tr>
                            <td className='p-4 text-left'>2023-05-01</td>
                            <td className='p-4 text-left'>kgs</td>
                            <td className='p-4 text-left'>phones</td>
                            <td className='p-4 text-left'>2000000</td>
                            <td className='p-4 text-left'>Maris</td>
                            <td className='p-4 text-left'>paid</td>
                            <td className=' items-center p-4'>Edit</td>
                        </tr>

    
                </tbody>

            </table>

        </div>



    </div>

  )
}

export default Records