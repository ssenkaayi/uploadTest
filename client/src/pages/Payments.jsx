import React from 'react'
import AddEmploye from '../Model/AddEmploye'
import { useState } from 'react'
import { employeTable, paymentTable } from '../components/TableHeading'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { useRef } from 'react'


function Payments() {

    const [showAddEmploye,setShowAddEmploye] = useState(false)
    const [payments , setPayments] = useState([])
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const navigate = useNavigate()
    const [limit,setLimit] = useState(9)
    const [pageCount,setPageCount] = useState(1)
    const currentPage = useRef()


    const handleOnClose = ()=>{
      
      setShowAddEmploye(false)

    }


    useEffect(()=>{


      currentPage.current = 1
      fetchEmployes()
    
        
    },[])

    const handlePageClick = (e)=>{
      // console.log(e)
      currentPage.current = (e.selected+1)
      fetchEmployes()
  
    }

    const fetchEmployes = async()=>{
    
      try{
  
        setLoading(true);
        const res = await fetch(`/api/payment/getPayments?page=${currentPage.current}&limit=${limit}`,{
          
            method:'GET',
        
        })

        const data = await res.json();
        // console.log(data)
      
        if(data.succuss===false){
          setError(true)
          setLoading(false)
          return
        }
        
        setError(false)
        setLoading(false)
        setPageCount(data.pageCount)
        setPayments(data.result)
        // setEmployes((prev)=>prev.filter((data)))
    
      }
  
      catch(error){
        setError(error.message)
        setLoading(false)
  
    }
  }

    const handleDeteleEmploye = async(id)=>{

      const button_id = id
      // console.log(button_id)
    
      try{
    
        const res = await fetch(`/api/employe/deleteEmploye/${button_id}`,{
          method:"DELETE",
        })
    
        const data = await res.json();
    
        console.log(data)
    
        if(data.success===false){
          console.log(data.message)
        }
    
        setEmployes((prev)=>prev.filter((employes)=>employes._id!==button_id))
    
      }catch(error){
        console.log(error)
      }


    }

    const navigateToClient =()=>{

      navigate('/')

    }

    //bg-white mt-card p-record mt-record rounded-2xl


  return (

    <div  className='bg-white mt-card p-record mt-record rounded-2xl'>

        <AddEmploye onClose={handleOnClose} visible={showAddEmploye}/>   

        <div className='flex justify-between'>

          <h3 className='text-regal-violet text-2xl p-2'> Manange Payments </h3>

          <button 

            className='flex items-center p-search-box bg-dashbord rounded-xl text-white' onClick={navigateToClient}>Add Payment
          </button>

        </div>

       

        <div className=' w-full mt-record'>

            <table className=' w-full border-collapse' >

                <thead  className='bg-regal-violet text-white'>

                    <tr>

                      {paymentTable.map((item,index)=>{

                          return(

                              
                          <th className='p-4 text-left ' key={index}>{item}</th>

                          )
                      })}

                        <th className='p-4 text-left '>Action</th>
                    </tr>

                </thead>

                <tbody>
                
                    { payments !== null ?payments.map((payment,index)=>{ 

                        return(
                            <tr key={index}>
                            
                            <td className='p-4 text-left'>{payment.createdAt.split("T", 1)}</td>
                            <td className='p-4 text-left'>{payment.reciept_number}</td>
                            <td className='p-4 text-left'>{payment.client.name}</td>
                            <td className='p-4 text-left'>{payment.kg_rate}</td>
                            <td className='p-4 text-left'>{payment.dollar_rate}</td>
                            <td className='p-4 text-left'>{payment.amount_ugx}</td>
                            <td className='p-4 text-left'>{payment.amount_dollars}</td>
                            <td className='p-4 text-left'>{payment.total_amount}</td>
                            <td className='p-4 text-left'>{payment.balance}</td>
                            <td className='p-4 text-left'>{payment.issued_by}</td>

                            <td className='text-green flex gap-4 items-center p-4'>
                                <span className='p-2 cursor-pointer '>Edit</span>
                                <span className='p-2 cursor-pointer '>View</span>
                                <button className='p-2 cursor-pointer 'id='delete' onClick={()=>handleDeteleEmploye(employe._id)}>Delete</button>
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

export default Payments