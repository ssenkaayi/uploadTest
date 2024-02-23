import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import AddClient from '../Model/AddClient'
import { useNavigate } from 'react-router-dom';
import { supplierTable } from '../components/TableHeading'


function Suppliers() {

    const [showAddClient,setShowAddClient] = useState(false)
    const [suppliers , setSuppliers] = useState(null)
    const [supplier_id, setSupplier_id] = useState(null)
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)
    const navigate = useNavigate();


    const handleOnClose = ()=>{
      
      setShowAddClient(false)

    }

    const handleSupplierId = (e)=>{

      setSupplier_id(e.target.id)
      setShowAddClient(true)
    }

    const navigateToTrip = ()=>{
      
      navigate('/dashbord/trips')

    }


    useEffect(()=>{

        const fetchSuppliers = async()=>{
    
          try{
      
            setLoading(true);
            const res = await fetch('/api/supplier/getSupplier/',{  

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
           
            setSuppliers(data)
            console.log(suppliers)
            // setEmployes((prev)=>prev.filter((data)))
        
          }
      
          catch(error){
            setError(error.message)
            setLoading(false)
      
        }
      }
    
        fetchSuppliers()
    
        
    },[])

    const handleDeteleLuggage = async(e)=>{

      const button_id = e.target.id
      // console.log(button_id)
    
      try{
    
        const res = await fetch(`/api/lu/delete/${button_id}`,{
          method:"DELETE",
        })
    
        const data = await res.json();
    
        // console.log(data)
    
        if(data.success===false){
          console.log(data.message)
        }
    
        setLuggages((prev)=>prev.filter((luggage)=>luggage._id!==button_id))
    
      }catch(error){

        console.log(error)
      }


    }

 


  return (

    <div className='bg-white mt-card p-record mt-record rounded-2xl'>

        <AddClient onClose={handleOnClose} visible={showAddClient} supplier_id={supplier_id}/>   

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

                        <th className='p-4 text-left '>Action</th>
                    </tr>

                </thead>

                <tbody>
                
                    { suppliers !== null ? suppliers.map((supplier)=>{ 

                        return(
                            <tr key={supplier._id}>
                            
                            <td className='p-4 text-left'>{supplier.createdAt.split("T", 1)}</td>
                            <td className='p-4 text-left'>{supplier.trip_name}</td>
                            <td className='p-4 text-left'>{supplier.name}</td>
                            <td className='p-4 text-left'>{supplier.client_name}</td>
                            <td className='p-4 text-left'>{supplier.weight}</td>
                            <td className='p-4 text-left'>{supplier.number_clients}</td>
                            <td className='p-4 text-left'>{supplier.issued_by}</td>

                            <div className='text-green flex gap-4 items-center p-4'>
                                <button className='p-2 cursor-pointer 'id={supplier._id} onClick={handleSupplierId} >Add</button>
                                <span className='p-2 cursor-pointer '>View</span>
                                <button className='p-2 cursor-pointer 'id={supplier._id} onClick={handleDeteleLuggage} >Delete</button>
                            </div>

                            </tr>

                        )
                    }):""}

                </tbody>

            </table>

        </div>



    </div>

  )
}

export default Suppliers