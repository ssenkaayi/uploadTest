import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { supplierTable } from '../components/TableHeading'
import ReactPaginate from 'react-paginate';


function Suppliers() {

    const [showAddClient,setShowAddClient] = useState(false)
    const [suppliers , setSuppliers] = useState([])
    const [supplier_id, setSupplier_id] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const navigate = useNavigate();
    const [limit,setLimit] = useState(8)
    const [pageCount,setPageCount] = useState(1)
    const currentPage = useRef()


    const handleOnClose = ()=>{
      
      setShowAddClient(false)

    }

    const handleSupplierId = (id)=>{

      console.log(id)

      setSupplier_id(id)
      navigate(`/view_supplier/${id}`)
      // setShowAddClient(true)

    }

    const navigateToTrip = ()=>{
      
      navigate('/trips')

    }

    useEffect(()=>{
    
      // fetchSuppliers()
      currentPage.current = 1
      getPagenatedSuppliers()
    
        
    },[])

    const handleDeteleSupplier = async(_id)=>{

      const button_id = _id
      console.log(button_id)
    
      try{
    
        const res = await fetch(`/api/supplier/delete/${button_id}`,{
          method:"DELETE",
        })
    
        const data = await res.json();
    
        // console.log(data)
    
        if(data.success===false){
          console.log(data.message)
        }
    
        setSuppliers((prev)=>prev.filter((supplier)=>supplier._id!==button_id))
    
      }catch(error){

        console.log(error)
      }


    }

    const handlePageClick = (e)=>{
      // console.log(e)
      currentPage.current = (e.selected+1)
      getPagenatedSuppliers()

    }

    const getPagenatedSuppliers = async()=>{

      const res = await fetch(`/api/supplier/getSupplier?page=${currentPage.current}&limit=${limit}`,{  

        method:'GET',
      
      })

      const data = await res.json();
      // console.log(data)
      setSuppliers(data.result)
      setPageCount(data.pageCount)

    }


  return (

    <div className='bg-white mt-card p-record mt-record rounded-2xl'>

        <div className='flex justify-between'>

         <h3 className='text-regal-violet text-2xl p-2'> Manange Suppliers</h3>

         <button onClick={navigateToTrip} 
          className='flex items-center p-search-box bg-dashbord rounded-xl text-white '>Add Supplier</button>

        </div>

       

        <div className=' w-full mt-record'>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                        {supplierTable.map((item,index)=>{

                            return(

                                
                            <th className='p-4 text-left ' key={index}>{item}</th>

                            )
                        })}

                        <th className='p-4 text-left '>Manage Clients</th>
                    </tr>

                </thead>

                <tbody>
                
                    { suppliers !== null ? suppliers.map((supplier,index)=>{ 

                        return(
                            <tr key={index}>
                            
                              <td className='p-4 text-left'>{supplier.createdAt.split("T", 1)}</td>
                              <td className='p-4 text-left'>{supplier.trip.name}</td>
                              <td className='p-4 text-left'>{supplier.name}</td>
                              {/* <td className='p-4 text-left'>{supplier.client_name}</td> */}
                              <td className='p-4 text-left'>{supplier.weight}</td>
                              <td className='p-4 text-left'>{supplier.number_clients}</td>
                              <td className='p-4 text-left'>{supplier.issued_by}</td>

                              <td className='text-green flex gap-4 items-center p-4'>
                                  {/* <button className='p-2 cursor-pointer ' id='add'  onClick={()=>handleSupplierId(supplier._id)} >Add</button> */}
                                  <button className='p-2 cursor-pointer ' id='view' onClick={()=>handleSupplierId(supplier._id)} >View</button>
                                  {/* <button className='p-2 cursor-pointer ' id='delete' onClick={()=>handleDeteleSupplier(supplier._id)} >Delete</button> */}
                              </td>

                            </tr>

                        )
                    }):<tr> <td className='p-4 text-left'>loading</td> </tr>}

                </tbody>



            </table>

            <ReactPaginate className="flex gap-4"

              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
    

            />

        </div>



    </div>

  )
}

export default Suppliers